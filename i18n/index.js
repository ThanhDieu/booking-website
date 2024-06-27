var en = require('./translations.en.json');
var de = require('./translations.de.json');
var it = require('./translations.it.json');
var da = require('./translations.da.json');
var nl = require('./translations.nl.json');

const i18n = {
  locales: {
    en,
    de,
    it,
    da,
    nl,
  },
  defaultLocale: localStorage.getItem("deafault_locale") || 'de',
};

module.exports = i18n;
