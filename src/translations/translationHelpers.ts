import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export const translate = memoize(
  (key: any, config?: any) => i18n.t(key, config),
  (key: any, config?: any) => (config ? key + JSON.stringify(config) : key),
);
