import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

export const initI18n = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // Default to English for now
      fallbackLng: 'en',
      compatibilityJSON: 'v4',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

export const changeLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
};

export default i18n;
