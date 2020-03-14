const fs = require('fs');

/**
 * Util helper class bringing useful utility functions abstracted from the main library flow
 * 
 * @class Util
 * @classdesc Harbors utility functions for use within the Kakyo library
 */
class Util {

    /**
     * Read a directory synchronously
     * 
     * IMPORTANT: This method reads the directory SYNCHRONOUSLY. This method should only be used at startup!
     * 
     * @private
     * @param {string} path An absolute file path of the directory that should be read
     * @returns {Array<string>} An array of all files including their absolute path within the provided directory
     */
    readDirectory(path) {
        try {
            const files = fs.readdirSync(path);
            const result = [];
    
            files.forEach((file) => {
                result.push(`${path}/${file}`);
            });
    
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Renders a response template string with passed data values 
     * @private
     * @param {string} response A response template string coming from a Kakyo localisation file
     * @param {object} data An object containing the data which should be injected into the response template
     * @returns {string} A fully rendered and ready to be used response string with the passed data values injected
     */
    renderText(response, data) {
        return response.replace(/#{(.*?)}#/g, (m, i) =>  {
            if (!data[i]) {
                throw new Error(`There is no data property for placeholder "${i}" to inject.`);
            }
    
            return data[i];
        });
    }
    
}

module.exports = new Util();