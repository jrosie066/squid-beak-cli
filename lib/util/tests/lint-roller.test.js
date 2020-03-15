const lintRoller = require('../lint-roller');
const createSpinner = require('../spinner');
const cmdAsync = require('../cmd-async');

jest.mock('../../util/cmd-async');
jest.mock('../../util/logger.js');
jest.mock('../spinner');

describe('#lintRoller', () => {
  let folder;
  beforeEach(() => {
    createSpinner.mockImplementation(() => {
      return {
        start: jest.fn(),
        stop: jest.fn()
      };
    });
    folder = 'src/component/test';
  });
  afterEach(jest.clearAllMocks);
  it('should call the lint-roller', async () => {
    await lintRoller(folder);
    expect(createSpinner).toHaveBeenCalledTimes(1);
    expect(cmdAsync).toHaveBeenCalledTimes(1);
    expect(cmdAsync).toHaveBeenCalledWith(expect.stringContaining(folder));
  });
  it('should handle errors', async () => {
    cmdAsync.mockRejectedValue('error');
    let error;
    try {
      await lintRoller(folder);
    } catch (err) {
      error = err;
    }
    expect(createSpinner).toHaveBeenCalledTimes(1);
    expect(cmdAsync).toHaveBeenCalledTimes(1);
    expect(error).toEqual('error');

  });
});