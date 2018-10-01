import { format as dateFormat, formatDistance as dateFormatDistance, formatDistanceStrict as dateFormatDistanceStrict } from "date-fns/esm";
import dateLocales from "date-fns/locale";

export default class I18nClient {
  constructor(i18next) {
    this.i18next = i18next;
  }

  /**
   * @param {String|String[]} keys One or more keys. If multiple, then each subsequent key is used as a fallback if the preceding one was not found.
   * @param {*} vars An object representing variables to interpolate in the phrase. The special variable {{count}} will be used to determine plurals.
   * @return {String}
   */
  t(keys, vars) {
    return this.i18next.t(keys, vars);
  }

  /**
   * Alias of t().
   *
   * @param {String|String[]} keys One or more keys. If multiple, then each subsequent key is used as a fallback if the preceding one was not found.
   * @param {*} vars An object representing variables to interpolate in the phrase. The special variable {{count}} will be used to determine plurals.
   * @return {String}
   */
  translate(keys, vars) {
    return this.i18next.t(keys, vars);
  }

  /**
   * Get a translate function where every key supply is auto-namespaced.
   *
   * @param {String} ns      The ns to use. Use null if you only want to use langId.
   * @param {String} langId  The langId to use. Use null if you want to use the current lang.
   * @return {Function}
   */
  namespacedTranslate(ns, langId = null) {
    return this.i18next(langId, ns);
  }

  /**
   * Given a date, format it to the current lang date.
   *
   * @param {Date} date
   * @param {String} format
   * @return {String}
   */
  formatDate(date, format) {
    return dateFormat(date, format, { locale: this._getCurrentDateLocale() });
  }

  /**
   * Given two dates, format it in a readable distance like "about 23 hours ago".
   *
   * @param {Date|String|Number} date
   * @param {Date|String|Number} baseDate
   * @param {Object} options
   * @return {String}
   */
  formatDateDistance(date, baseDate, options = {}) {
    return dateFormatDistance(date, baseDate, Object.assign({}, options, { locale: this._getCurrentDateLocale() }));
  }

  /**
   * Given two dates, format it in a readable distance like "23 hours".
   *
   * @param {Date|String|Number} date
   * @param {Date|String|Number} baseDate
   * @param {Object} options
   * @return {String}
   */
  formatDateDistanceStrict(date, baseDate, options = {}) {
    return dateFormatDistanceStrict(date, baseDate, Object.assign({}, options, { locale: this._getCurrentDateLocale() }));
  }

  _getCurrentDateLocale() {
    return this.i18next.languages.find(langId => this._getDateLocale(langId)) || dateLocales.enUS;
  }

  _getDateLocale(langId) {
    // en_US -> enUS
    const key = langId.replace(/[_-]/, '');

    if (dateLocales[key]) {
      return dateLocales[key];
    }

    return null;
  }

  /**
   * Format a number.
   *
   * @param {number} number
   * @param {Object} options
   * @return {String}
   */
  formatNumber(number, options) {
    if (!Intl || !Intl.NumberFormat) {
      return number+"";
    }

    try {
      return Intl.NumberFormat(this.i18next.languages, options).format(number);
    } catch (e) {
      console.warn(e);
      return number+"";
    }
  }

  /**
   * Changes the current language.
   *
   * @param langId
   */
  changeLanguage(langId) {
    this.i18next.changeLanguage(langId)
  }

  /**
   * Gets the current language
   * @return {String}
   */
  get language() {
    return this.i18next.language;
  }

  /**
   * Gets the list of languages currently used for resolving phrases, from most specific to fallback.
   *
   * @return {String[]}
   */
  get resolveLanguages() {
    return this.i18next.languages;
  }

  /**
   * Adds phrase packs. A phrase pack is an object with a structure: langId.namespaceId.phraseId.
   *
   * <code>
   *   const packs = {
   *     en: {
   *       main: {
   *         hello: "hi"
   *       }
   *     },
   *     fr: {
   *       main: {
   *         hello: "bonjour"
   *       }
   *     },
   *     // the special $ separator can be used instead of nested namespace ids.
   *     de$main: {
   *       hello: "hallo"
   *     }
   *   };
   *   i18n.addPhrasePacks(packs);
   * </code>
   *
   * @param {Object} packs
   */
  addPhrasePacks(packs) {
    Object.keys(packs).forEach(k => {
      if (k.indexOf('$') !== -1) {
        const [ langName, ns ] = k.split('$', 2);
        const langId = langName.replace(/^([a-z]{2})([A-Z]{2})/, '$1-$2');

        this.i18next.addResourceBundle(langId, ns, packs[k], true, true);
      } else {
        const langId = k;
        Object.keys(packs[k]).forEach(ns => {
          this.i18next.addResourceBundle(langId, ns, packs[k][ns], true, true);
        })
      }
    });
  }

  /**
   * Add a single phrase pack.
   *
   * <code>
   *   const pack = {
   *     main: {
   *       hello: "hi"
   *     }
   *   }
   *   i18n.addPhrasePack('en', pack);
   * </code>
   *
   * @param {String} langId
   * @param {Object} pack
   */
  addPhrasePack(langId, pack) {
    Object.keys(pack).forEach(ns => {
      this.i18next.addResourceBundle(langId, ns, pack[ns], true, true);
    })
  }

  /**
   * Add phrases to a specific ns.
   *
   * @param {String} langId
   * @param {String} ns
   * @param {Object} phrases
   */
  addPhrases(langId, ns, phrases) {
    this.i18next.addResources(langId, ns, phrases);
  }

  /**
   * Check if a phrase exists given the current language setup.
   *
   * @param {String} id
   * @return {Boolean}
   */
  hasPhrase(id) {
    return this.i18next.exists(id);
  }

  /**
   * Checks for an exact phrase.
   *
   * @param {String} langId
   * @param {String} ns
   * @param {String} phraseId
   * @return {boolean}
   */
  hasExactPhrase(langId, ns, phraseId) {
    return !!this.getExactPhrase(langId, ns, phraseId);
  }

  /**
   * Gets an exact phrase.
   *
   * @param {String} langId
   * @param {String} ns
   * @param {String} phraseId
   * @return {boolean}
   */
  getExactPhrase(langId, ns, phraseId) {
    return this.i18next.getResource(langId, ns, phraseId) || null;
  }
}
