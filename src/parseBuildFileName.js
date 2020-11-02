
// Parse the build file name because it makes it clean, provides better ux, and easier to use as a key in a map.
module.exports = (buildFilePath) => {
    if(buildFilePath.endsWith("/")) {
        buildFilePath = buildFilePath.slice(0, -1);
    }
    if(buildFilePath.endsWith("/build.json")) {
        buildFilePath = buildFilePath.slice(0, -11);
    }
    if(buildFilePath.startsWith("./")) {
        buildFilePath = buildFilePath.substr(2);
    }
    return buildFilePath;
};
