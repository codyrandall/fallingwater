const loadBuildFile = require('./loadBuildFile');
const parseBuildFileName = require('./parseBuildFileName');
const glob = require('glob');

// Reverse dep tree finds all files that have this one as a dependency.
// This returns a map that contains all the reverse deps for that file.
// TODO: This could be cached locally.
module.exports = (fileName) => {
    const files = glob.sync('**/build.json', {});
    const reverseDeps = {};

    for(const file of files) {
        const data = loadBuildFile(file);
        const buildFilePath = parseBuildFileName(file);

        for(const dep of data.deps) {
            const parsedDep = parseBuildFileName(dep);
            if(!reverseDeps[parsedDep]) {
                reverseDeps[parsedDep] = [];
            }
            reverseDeps[parsedDep].push(buildFilePath);
        }
    }
    return reverseDeps[parseBuildFileName(fileName)];
};
