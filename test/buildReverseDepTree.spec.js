const buildReverseDepTree = require('../src/buildReverseDepTree');

test('should build the entire dep tree, in reverse', () => {
    const data = buildReverseDepTree('test/testnesteddeps/depthree');

    expect(data).toEqual([ 'test/testnesteddeps/depone', 'test/testnesteddeps/deptwo' ]);
});
