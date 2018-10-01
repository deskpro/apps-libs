import i18next from 'i18next';
import I18nClient from './I18nClient';
import defaultPhrasePacks from './defaultPhrasePacks';

export const createI18n = () => {
  const i18nextInstance = i18next.createInstance({
    lng: 'en-US',
    fallbackLng: ['en-US', 'en'],
    debug: false,
    initImmediate: true,
    defaultNS: 'main',
    fallbackNS: ['common']
  }).init();

  const client = new I18nClient(i18nextInstance);
  client.addPhrasePacks(defaultPhrasePacks);

  return client;
}
