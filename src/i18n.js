import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translations.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      // Add other languages here
    },
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
