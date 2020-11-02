const fs = require('fs');
const throwError = require('./throwError');
const parseBuildFileName = require('./parseBuildFileName');

// Returns
// Data - JSON object containing the build file data.
// BuildFilePath - The cleaned unique id for the build file, which is the same as its path.
module.exports = (buildFilePath) => {
    // Find our path value and load it.
    let data = null;
    let fileName = '';
    try {
        buildFilePath = parseBuildFileName(buildFilePath);
        fileName = `${buildFilePath}/build.json`;
        try {
            data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (e) {
            throwError(`JSON was invalid for ${fileName}.`, e);
        }
    } catch(e) {
        throwError("Path command was invalid.", e);
    }
    return data;
};
