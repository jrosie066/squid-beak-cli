const installer = require('../startup-scripts');
const cmdAsync = require('../../util/cmd-async');

jest.mock('../../util/cmd-async');
jest.mock('../../util/logger.js');

describe('Project Installs', () => {
  afterEach(() => {
    cmdAsync.mockResolvedValue('');
  });
  describe('#installAirbnbEslint', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install eslint', async () => {
      await installer.installAirbnbEslint();
      expect(cmdAsync).toHaveBeenCalledTimes(1);
    });
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installAirbnbEslint();
      } catch (err) {
        error = err;
      }
      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
  describe('#installGoogleEslint', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install eslint', async () => {
      await installer.installGoogleEslint();
      expect(cmdAsync).toHaveBeenCalledTimes(1);
    });
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installGoogleEslint();
      } catch (err) {
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
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installStorybook();
      } catch (err) {
        error = err;
      }

      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
  describe('#installMaterialUI', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install storybook', async () => {
      await installer.installMaterialUI();
      expect(cmdAsync).toHaveBeenCalledTimes(1);
    });
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installMaterialUI();
      } catch (err) {
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
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installRedux();
      } catch (err) {
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
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.installAll();
      } catch (err) {
        error = err;
      }

      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
  describe('#lintProject', () => {
    afterEach(jest.clearAllMocks);
    it('should successfully install all', async () => {
      await installer.lintProject();
      expect(cmdAsync).toHaveBeenCalledTimes(1);
    });
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await installer.lintProject();
      } catch (err) {
        error = err;
      }
      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(error).toBeDefined();
    });
  });
}); 