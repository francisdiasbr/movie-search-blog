import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'de' | 'it';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  getContentLanguage: (availableLanguages: Language[]) => Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_CYCLE: Language[] = ['pt', 'en', 'it', 'de'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem('language') as Language) || 'pt'
  );

  const toggleLanguage = () => {
    const currentIndex = LANGUAGE_CYCLE.indexOf(language);
    const nextIndex = (currentIndex + 1) % LANGUAGE_CYCLE.length;
    const newLanguage = LANGUAGE_CYCLE[nextIndex];
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const getContentLanguage = (availableLanguages: Language[]): Language => {
    if (availableLanguages.includes(language)) {
      return language;
    }
    return 'en';
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, getContentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 