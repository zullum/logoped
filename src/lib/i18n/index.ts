import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';

const LANGUAGE_STORAGE_KEY = '@logoped:language';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Get stored language or use device locale
const getInitialLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage) return storedLanguage;

    const locales = getLocales();
    const deviceLocale = locales[0]?.languageCode || 'en';
    return Object.keys(resources).includes(deviceLocale) ? deviceLocale : 'en';
  } catch (error) {
    return 'en';
  }
};

export const initI18n = async () => {
  const language = await getInitialLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
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
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  await i18n.changeLanguage(language);
};

export default i18n;
