const loadBuildFile = require('./loadBuildFile');
const parseBuildFileName = require('./parseBuildFileName');

const addToTree = (fileName, ret) => {
    const data = loadBuildFile(fileName);
    const buildFilePath = parseBuildFileName(fileName);

    // The dependency has already been loaded. Circular dependencies should work fine.
    if(ret[buildFilePath] !== undefined) {
        return;
    }

    ret[buildFilePath] = data;
    for(let dep of data.deps) {
        addToTree(dep, ret);
    }
};

module.exports = (startingFile) => {
    const ret = {};
    addToTree(startingFile, ret);
    return ret;
};
