const KakyoUtil = require('../lib/helpers/Util');
const Kakyo = require('../lib/Kakyo');

const utilityMock = {
    response: 'Congrats #{username}# you are now level #{level}#!',
    data: {
        username: 'John Doe',
        level: 1337
    }
}

const translations = new Kakyo(__dirname + '/mocks', { defaultLocale: 'en_US' });

describe('Kakyo', () => {
    describe('Utility', () => {
        test('Rendering a response', () => {
            expect(KakyoUtil.renderText(utilityMock.response, utilityMock.data)).toBe('Congrats John Doe you are now level 1337!');
        });

        test('Check for a malformed response', () => {
            expect(() => {
                KakyoUtil.renderText(utilityMock.response, {})
            }).toThrow('There is no data property for placeholder');
        });
    });

    describe('Instance', () => {
        test('Getting the default locale', () => {
            expect(translations.getDefaultLocale()).toBe('en_US');
        });

        test('Single time locale override', () => {
            expect(translations.get('LEVEL_UP_MESSAGE', { username: 'John', level: 50 }, 'ja_JP')).toBe('おめでとう！Johnのレベルは50です！');
            expect(translations.get('LEVEL_UP_MESSAGE', { username: 'John', level: 50 })).toBe('Congratulations, John! you are now level 50!');
        });

        test('Permanent locale override', () => {
            translations.setDefaultLocale('ja_JP');
            expect(translations.getDefaultLocale()).toBe('ja_JP');
        });

        test('Check if an invalid locale was provided', () => {
            expect(() => {
                translations.setDefaultLocale('foo');
            }).toThrow('Cannot set default locale');
        });

        test('Check if an invalid response key was provided', () => {
            expect(() => {
                translations.get('invalid', {});
            }).toThrow('Couldn\'t find response');
        });

        test('Check if no default locale and no locale override were provided', () => {
            const noLocaleTranslation = new Kakyo(__dirname + '/mocks');

            expect(() => {
                noLocaleTranslation.get('LEVEL_UP_MESSAGE', {})
            }).toThrow('No locale was passed and no default locale was set.');
        });
    });
});