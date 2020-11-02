const buildDepTree = require('../src/buildDepTree');

test('should load a build file from a nested directory with no deps', () => {
    const data = buildDepTree('./test/testbuild/');

    expect(data).toEqual({
        'test/testbuild': { build: 'testbuild.js', test: '', lint: '', deps: [] }
    });
});

test('should load a build file with one layer of dependencies', () => {
    const data = buildDepTree('./test/testdeps/');

    expect(data).toEqual({
        'test/testdeps': {
            build: 'testdeps.js',
            test: '',
            lint: '',
            deps: [ './test/testdeps/testdepsdeps' ]
        },
        'test/testdeps/testdepsdeps': { build: 'testbuild.js', test: '', lint: '', deps: [] }
    });
});

test('should load a build file with multiple nested dependencies', () => {
    const data = buildDepTree('./test/testnesteddeps');

    expect(data).toEqual({
        'test/testnesteddeps': {
            build: 'testbuild.js',
            test: '',
            lint: '',
            deps: [ 'test/testnesteddeps/depone', 'test/testnesteddeps/deptwo' ]
        },
        'test/testnesteddeps/depone': {
            build: 'testbuild.js',
            test: '',
            lint: '',
            deps: [ './test/testnesteddeps/depthree' ]
        },
        'test/testnesteddeps/depthree': { build: 'testbuild.js', test: '', lint: '', deps: [] },
        'test/testnesteddeps/deptwo': {
            build: 'testbuild.js',
            test: '',
            lint: '',
            deps: [ 'test/testnesteddeps/depthree' ]
        }
    });
});

test('should load a build file with an absolute path', () => {
    const data = buildDepTree('test/testabsolutedep/');

    expect(data).toEqual({
        'test/testabsolutedep': {
            build: 'testbuild.js',
            test: '',
            lint: '',
            deps: [ 'test/testdeps/' ]
        },
        'test/testdeps': {
            build: 'testdeps.js',
            test: '',
            lint: '',
            deps: [ './test/testdeps/testdepsdeps' ]
        },
        'test/testdeps/testdepsdeps': { build: 'testbuild.js', test: '', lint: '', deps: [] }
    });
});

test('should load a build file with a dot path', () => {
    const data = buildDepTree('./test/testdotdep');

    expect(data).toEqual(  {
        'test/testdotdep': {
            build: 'testbuild.js',
            test: '',
            lint: '',
            deps: [ './test/testall' ]
        },
        'test/testall': { build: 'testbuild.js', test: 'jest', lint: 'yarn lint', deps: [] }
    });
});
