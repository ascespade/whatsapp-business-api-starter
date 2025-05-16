const i18nextCore = require('i18next');
const FSBackend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
const { PrismaClient: PrismaI18nClient } = require('@prisma/client');
const prismaI18n = new PrismaI18nClient();

const dbBackend = {
  type: 'backend',
  async read(language, namespace, callback) {
    try {
      const translations = await prismaI18n.translation.findMany({ where: { language } });
      const resources = {};
      translations.forEach(({ key, value }) => {
        resources[key] = value;
      });
      callback(null, resources);
    } catch (error) {
      callback(error, false);
    }
  },
};

i18nextCore
  .use(i18nextMiddleware.LanguageDetector)
  .use(FSBackend)
  .init({
    backend: dbBackend,
    fallbackLng: 'ar',
    preload: ['ar', 'en'],
    ns: ['translation'],
    defaultNS: 'translation',
    detection: {
      order: ['header', 'querystring'],
      lookupHeader: 'x-lang',
    },
    interpolation: {
      escapeValue: false,
    },
  });

module.exports = { i18next: i18nextCore, middleware: i18nextMiddleware };