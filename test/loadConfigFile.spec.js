const loadConfigFile = require('../src/loadConfigFile');

test('should load the default config file if none is provided', () => {
    const data = loadConfigFile(undefined);

    expect(data).toEqual({
        test: { deps: false, required: true, reverseDeps: true },
        build: { deps: false, required: true, reverseDeps: false},
        lint: { deps: false, required: true, reverseDeps: false},
        base: "node"
    });
});

test('should combine the default config file with the provided one', () => {
    const data = loadConfigFile('./test/config/config.json');

    expect(data).toEqual({
        test: { required: false, test: 'this please' },
        build: { deps: false, required: true, reverseDeps: false },
        lint: { deps: false, required: true, reverseDeps: false },
        base: "node"
    });
});
