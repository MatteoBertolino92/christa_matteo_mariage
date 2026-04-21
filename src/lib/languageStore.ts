import { create } from 'zustand';
import { Language } from './i18n';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => {
  // Get initial language from localStorage or default to French
  const savedLanguage = typeof window !== 'undefined' 
    ? (localStorage.getItem('language') as Language) || 'fr'
    : 'fr';

  return {
    language: savedLanguage,
    setLanguage: (language: Language) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
      }
      set({ language });
    },
  };
});
