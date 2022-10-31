import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('../translations/en.json'),
  fr: () => require('../translations/fr.json'),
};

const translate: any = memoize(
  (key: i18n.Scope, config: i18n.TranslateOptions | undefined) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (selectedLanguage?: string) => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };

  const { languageTag, isRTL } = selectedLanguage
    ? { languageTag: selectedLanguage, isRTL: false }
    : RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

export const getPreferredLocale = (): string => {
  const locales = RNLocalize.getLocales();
  return locales[0].languageCode;
};

export * from './translationHelpers';
