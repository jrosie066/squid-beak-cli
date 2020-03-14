const installer = require('../startup-scripts');
const cmdAsync = require('../../util/cmd-async');

jest.mock('../../util/cmd-async');
jest.mock('../../util/logger.js');

describe('Project Installs', () => {

  describe('#installAirbnbEslint', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install eslint', async () => {
      await installer.installAirbnbEslint();
      expect(cmdAsync).toHaveBeenCalledTimes(1);
    });
    // NOTE: need to throw the error to be able to handle it
    // not sure I want to do that yet
    it.skip('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installAirbnbEslint();
      } catch(err) {
        console.log(err);
        error = err;
      }

      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
  describe('#installStorybook', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install storybook', async () => {
      await installer.installStorybook();
      expect(cmdAsync).toHaveBeenCalledTimes(1);
    });
    // NOTE: need to throw the error to be able to handle it
    // not sure I want to do that yet
    it.skip('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installStorybook();
      } catch(err) {
        console.log(err);
        error = err;
      }

      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
  describe('#installRedux', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install redux', async () => {
      await installer.installRedux();
      expect(cmdAsync).toHaveBeenCalledTimes(2);
    });
    // NOTE: need to throw the error to be able to handle it
    // not sure I want to do that yet
    it.skip('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installRedux();
      } catch(err) {
        console.log(err);
        error = err;
      }

      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
  describe('#installAll', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install all', async () => {
      await installer.installAll();
      expect(cmdAsync).toHaveBeenCalledTimes(1);
    });
    // NOTE: need to throw the error to be able to handle it
    // not sure I want to do that yet
    it.skip('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installAll();
      } catch(err) {
        console.log(err);
        error = err;
      }

      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
}); 