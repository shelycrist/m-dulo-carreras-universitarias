import english from '../locales/en/translation.json';
import spanish from '../locales/es/translation.json';
import portuguese from '../locales/pt/translation.json';

const fallbackLng = ['es'];

export const initOptions = {
  fallbackLng,
  defaultNS: 'translation',
  debug: false,

  resources: {
    es: {
      translation: spanish,
    },
    pt: {
      translation: portuguese,
    },
    en: {
      translation: english,
    },
  },
  react: {
    useSuspense: false,
  },
};
