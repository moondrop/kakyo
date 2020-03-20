const Util = require('./helpers/Util');

/**
 * Kakyo - A revolutionarily simple and easy to use i18n library.
 * @class Kakyo
 * @classdesc The main i18n class handling initialization, locale loading and providing string renderers.
 */
class Kakyo {
    /**
     * Constructor for Kakyo
     * @param {string} folderPath An absolute file path of the directory that harbors all localisations
     * @param {object} [options] Options for initializing Kakyo and overwriting its default behavior
     * @property {string} [options.defaultLocale] Set the default locale of this Kakyo instance.
     */
    constructor(folderPath, options = {}) {
        this._folderPath = folderPath;
        this._defaultLocale = options.defaultLocale || null;
        this._localizations = {};
        this._initialize();
    }

    /**
     * Initializes Kakyo for usage by reading all localisation files and populating their content within Kakyo
     * @private
     */
    _initialize() {
        const localizationFiles = Util.readDirectory(this._folderPath);

        for (let locale of localizationFiles) {
            const localeObject = require(locale);

            for (let localeProp in localeObject) {
                if (!this._localizations.hasOwnProperty(localeProp)) {
                    Object.assign(this._localizations, { [localeProp]: localeObject[localeProp] });
                }
            }
        }
    }

    /**
     * Get a fully rendered and ready to use response text from the localisation files
     * @param {string} responseKey A response key identifier corresponding to responses saved in the localisation files
     * @param {object} data An object containing the data which should be injected into the response template. IMPORTANT: The data object properties MUST match the placeholder names used in the localisation files!
     * @param {string} [locale] A locale specifying which language the response text should be rendered in. Optional if a default locale has been set upon instantiating Kakyo
     * @returns {string} A fully rendered and ready to be used response string with the passed data values injected
     */
    get(responseKey, data, locale) {
        if (!locale && this._defaultLocale === null) {
            throw new Error(`No locale was passed and no default locale was set.`)
        }

        const computedLocale = (locale) ? locale : this._defaultLocale;
        const responseLocale = this._localizations[computedLocale];

        if (!responseLocale) {
            throw new Error(`Kakyo wasn't initialized with a set of localisations grouped by locale "${computedLocale}". Please check your localisation files.`)
        }

        const responseTemplate = responseLocale[responseKey];

        if (!responseTemplate) {
            throw new Error(`Couldn't find response "${responseKey}" under the localisations grouped by locale "${computedLocale}". Please check your localisation files.`);
        }

        return Util.renderText(responseTemplate, data);
    }

    /**
     * Reload Kakyo's locale files cache 
     * @async
     * @returns {Promise<boolean>} Resolves with a truthy promise upon successful reload
     */
    async reload() {
        return new Promise((resolve, reject) => {
            try {
                this._localizations = {};

                Object.keys(require.cache).forEach((key) => {
                    if (require.cache[key].path === this._folderPath) {
                        delete require.cache[key];        
                    }
                });

                this._initialize();
                resolve(true);
            } catch (cacheDeleteError) {
                reject(cacheDeleteError);
            }
        });
    }
}

module.exports = Kakyo;