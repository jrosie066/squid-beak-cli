const path = require('path');
const getCwd = require('../cwd');

describe.skip('#getCWD', () => {
  afterEach(jest.clearAllMocks);
  it('should return the absolute path', () => {
    const pathSpy = jest.spyOn(path, 'resolve');
    pathSpy.mockImplementation((strA, strB )=> `this/is/${strA}/${strB}`);
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue('my/folder/structure');
    const actual = getCwd('files');
    expect(actual).toEqual('this/is/my/folder/structure/files');
  });
});