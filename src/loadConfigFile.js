const fs = require('fs');
const throwError = require('./throwError');

// Returns JSON object containing the config file
module.exports = (fileName) => {
    let data = {};
    let defaultConfig = {};

    if(fileName) {
        // Find our data value and load it.
        try {
            data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (e) {
            console.log(e);
            // throwError(`JSON was invalid for ${filename}.`, e);
        }
    }

    // Find our data value and load it.
    try {
        defaultConfig = JSON.parse(fs.readFileSync(`${__dirname}/defaultConfig.json`, 'utf8'));
    } catch (e) {
        throwError(`JSON was invalid for the default config.`, e);
    }


    return {...defaultConfig, ...data};
};
