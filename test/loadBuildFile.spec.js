const loadBuildFile = require('../src/loadBuildFile');

test('should load a build file from a nested directory', () => {
    const data = loadBuildFile('./test/testbuild/');

    expect(data).toEqual({
        build: 'testbuild.js', test: '', lint: '', deps: []
    });
});

test('should load a build file without a trailing slash', () => {
    const data = loadBuildFile('./test/testbuild');

    expect(data).toEqual({
        build: 'testbuild.js', test: '', lint: '', deps: []
    });
});

test('should load a build file with a trailing build file', () => {
    const data = loadBuildFile('./test/testbuild/build.json');

    expect(data).toEqual({
        build: 'testbuild.js', test: '', lint: '', deps: []
    });
});
