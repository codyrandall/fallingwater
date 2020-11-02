const parseBuildFileName = require('../src/parseBuildFileName');


test('parse a file name with no changes', () => {
    const data = parseBuildFileName('test/this/please');

    expect(data).toBe('test/this/please');
});

test('parse a file name that ends with build.json', () => {
    const data = parseBuildFileName('test/this/please/build.json');

    expect(data).toBe('test/this/please');
});

test('parse a file name that ends with trailing slash', () => {
    const data = parseBuildFileName('test/this/please/');

    expect(data).toBe('test/this/please');
});

test('parse a file name that starts with a dot', () => {
    const data = parseBuildFileName('./test/this/please/');

    expect(data).toBe('test/this/please');
});
