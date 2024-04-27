import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { initOptions } from '@/config/i18next.config';

i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);

export { i18n };
