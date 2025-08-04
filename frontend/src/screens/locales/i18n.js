import { I18n } from 'i18n-js';
import ar from './ar.json';
import en from './en.json';

const i18n = new I18n({
  en,
  ar,
});

i18n.locale = 'en';
i18n.enableFallback = true;

export default i18n;
