import { create } from 'zustand';
import { Language } from './i18n';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  initializeFromUrl: () => void;
  initializeFromGeolocation: () => Promise<void>;
}

// Helper function to extract language from URL
export const getLanguageFromUrl = (): Language => {
  if (typeof window === 'undefined') return 'fr';
  
  const pathname = window.location.pathname;
  const match = pathname.match(/^\/(en|it|fr)/);
  
  if (match && (match[1] === 'en' || match[1] === 'it' || match[1] === 'fr')) {
    return match[1] as Language;
  }
  
  return 'fr';
};

// Helper function to detect language based on user's country
export const detectLanguageFromCountry = (countryCode: string | null): Language => {
  if (countryCode === 'IT') {
    return 'it';
  }
  // Default to French for all other locations
  return 'fr';
};

// Helper function to get user's country from geolocation API
export const getUserCountry = async (): Promise<string | null> => {
  try {
    // Using ip-api.com (free tier, no API key required)
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Geolocation API failed');
    const data = await response.json();
    return data.country_code || null;
  } catch (error) {
    console.warn('Geolocation detection failed:', error);
    return null;
  }
};

export const useLanguageStore = create<LanguageStore>((set) => {
  // Get initial language from URL or localStorage or default to French
  const urlLanguage = typeof window !== 'undefined' ? getLanguageFromUrl() : 'fr';
  const savedLanguage = typeof window !== 'undefined' 
    ? (localStorage.getItem('language') as Language) || urlLanguage
    : 'fr';

  return {
    language: savedLanguage,
    setLanguage: (language: Language) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
        // Update URL to reflect language change
        const currentPath = window.location.pathname;
        const pathWithoutLang = currentPath.replace(/^\/(en|it|fr)/, '');
        const newPath = `/${language}${pathWithoutLang || ''}`;
        window.history.pushState({}, '', newPath);
      }
      set({ language });
    },
    initializeFromUrl: () => {
      const urlLanguage = getLanguageFromUrl();
      set({ language: urlLanguage });
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', urlLanguage);
      }
    },
    initializeFromGeolocation: async () => {
      // Only run on client side
      if (typeof window === 'undefined') return;

      // Check if user already has a saved language preference
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage) {
        set({ language: savedLanguage });
        return;
      }

      // Check if URL has a language specified
      const urlLanguage = getLanguageFromUrl();
      if (urlLanguage !== 'fr' || window.location.pathname.match(/^\/(en|it|fr)/)) {
        set({ language: urlLanguage });
        localStorage.setItem('language', urlLanguage);
        return;
      }

      // Detect language based on geolocation
      try {
        const countryCode = await getUserCountry();
        const detectedLanguage = detectLanguageFromCountry(countryCode);
        set({ language: detectedLanguage });
        localStorage.setItem('language', detectedLanguage);
      } catch (error) {
        console.warn('Failed to initialize language from geolocation:', error);
        // Fallback to French
        set({ language: 'fr' });
        localStorage.setItem('language', 'fr');
      }
    },
  };
});
