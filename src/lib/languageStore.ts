import { create } from 'zustand';
import { Language } from './i18n';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  initializeFromUrl: () => void;
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
  };
});
