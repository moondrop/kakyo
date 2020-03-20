<div align="middle">
    <p><img src="https://img.kirameki.one/uk6QacfI.png" alt="Kakyo Logo" height="350" /></p>
    <h1>Kakyo</h1>
    <a href="#"><img src="https://circleci.com/gh/moondrop/kakyo.svg?style=svg" alt="Circle CI"/></a>
    <a href="https://www.npmjs.com/package/kakyo"><img src="https://img.shields.io/npm/v/kakyo.svg?color=ffb346"></a>
    <a href="#"><img src="https://img.shields.io/badge/node-10.15.1-ffb346.svg"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-ffb346.svg"></a>
    <p>A revolutionarily simple and easy to use i18n library easily integrable into any existing code base!</p>
    <br />
</div>

Kakyo is an extremely minimal, highly performant and fully tested internationalization *(i18n for short)* library following the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle). Kakyo was developed with the intention of developers being able to easily integrate i18n into any existing code base without having to heavily refactor the project or even rewrite any single bit of code.

Internationalization is an important step in making an application as accessible as possible, and Kakyo is here to make it as painless and straightforward as humanly possible!

## Install
Installing Kakyo is as easy as running following command if you're using npm:
```
$ npm install kakyo
```
Alternatively you can also use yarn:
```
$ yarn add kakyo
```

## Example Usage
Let's assume we have following folder structure:
```
kakyo-example
│
├── node_modules/
│   └── kakyo/
│
├── translations/
│   ├── english.json
│   └── japanese.json
│   
└── index.js
```
Translations can be abstracted into their own respective translation files if so desired, however it's also possible to put every translation into the same file grouped by their locale to stop unnecessary clutter if the project is lightweight enough.

### `english.json`
```json
{
    "en_US": {
        "WELCOME_MESSAGE": "Welcome, #{username}#!",
        "CURRENT_LEVEL": "Your level is #{level}#!"
    }
}
```

### `japanese.json`
```json
{
    "ja_JP": {
        "WELCOME_MESSAGE": "ようこそ、#{username}#！",
        "CURRENT_LEVEL": "あなたのレベルは#{level}#です！"
    }
}
```
**Locales:** Each language and thus its translations is grouped by its locale in the localisation files.

**Response Keys:** Each response must be keyed by a unique identifier which has to be identical amongst ***every*** language block.

**Placeholders:** Placeholders in translation files are initiated by an opening `#{`, followed by a data property name that's wished to be used, followed by a closing `}#` tag as shown above in the example files ( `#{username}#` and `#{level}#` ).

### `index.js`
```js
const Kakyo = require('kakyo');
const translations = new Kakyo(__dirname + '/translations', { defaultLocale: 'en_US' });

console.log(
    translations.get('WELCOME_MESSAGE', { username: 'John Doe' })
); /* ⇨ Welcome, John Doe! */

console.log(
    translations.get('WELCOME_MESSAGE', { username: 'Satoshi' }, 'ja_JP')
); /* ⇨ ようこそ、Satoshi！ */

console.log(
    translations.get('CURRENT_LEVEL', { level: 45 })
); /* ⇨ Your level is 45! */

console.log(
    translations.get('CURRENT_LEVEL', { level: 37 }, 'ja_JP')
); /* ⇨ あなたのレベルは37です！ */
```
**Instantiation:** Kakyo only requires an *absolute* folder path to where the localisation files are stored.

**Default Locale:** Providing a default locale upon instantiating Kakyo is fully optional and can be omitted.

**Changing Languages:** Getting a response in a different language than what was set as the default is as simple as providing the desired locale as a function parameter!

## API
Kakyo's API overview

### `new Kakyo(folderPath [,options])` - Instantiating a new instance of Kakyo:
```js
const translations = new Kakyo(__dirname + '/translations', { defaultLocale: 'en_US' });
```
* **folderPath** `String` **-** *An absolute file path of the directory that harbors all localisations.*
* **options** `Object` *(optional)* **-** *Options for initializing Kakyo and overwriting its default behavior.*
    * **options.defaultLocale** `String` *(optional)* **-** *Set the default locale of this Kakyo instance.*

<hr />

### `get(key, data [,locale])` - Getting a translated, rendered response:
```js
const result = translations.get('WELCOME_MESSAGE', { username: 'Bob' }, 'ja_JP');
```
* **key** `String` **-** *A response key identifier corresponding to responses saved in the localisation files.*
* **data** `Object` **-** *An object containing the data which should be injected into the response template.*
    * *The data object properties MUST match the placeholder names used in the localisation files!*
* **locale** `String` *(optional)* **-** *A locale specifying which language the response text should be rendered in.*
    * *Only optional if a default locale has been set upon instantiating Kakyo!*

**Returns:** `String` **-** *A fully rendered and ready to be used response string with the passed data values injected.*

<hr />

### `reload()` - Reload Kakyo's localisation files cache:
*Classic syntax:*
```js
translations.reload().then((successful) => {
    if (successful) {
        /* ⇨ Reload was successful! */
    }
}).catch((reloadingError) => {
    /* ⇨ Reload wasn't successful! */
});
```
*async / await syntax:*
```js
const successfullyReloaded = await translations.reload();

if (successfullyReloaded) {
    /* ⇨ Reload was successful! */
}
```
**Returns:** `Promise<Boolean>` **-** *Resolves with a truthy promise upon successful reload!*

## License
This repository makes use of the [MIT License](https://opensource.org/licenses/MIT) and all of its correlating traits.

While it isn't mandatory, a small credit would be highly appreciated if this repository was to be reused!
