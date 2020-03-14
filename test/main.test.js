const KakyoUtil = require('../lib/helpers/Util');

const mock = {
    response: 'Congrats #{username}# you are now level #{level}#!',
    data: {
        username: 'John Doe',
        level: 1337
    }
}

describe('Kakyo', () => {
    describe('Utility', () => {
        test('Rendering a response', () => {
            expect(KakyoUtil.renderText(mock.response, mock.data)).toBe('Congrats John Doe you are now level 1337!');
        });

        test('Catching a malformed response', () => {
            expect(() => {
                KakyoUtil.renderText(mock.response, {})
            }).toThrow('There is no data property for placeholder');
        });
    });
});