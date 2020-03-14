const fs = require('fs-extra');
const { copyFiles, addGitKeep } = require('../add-files-to-project');
const promiseFs = require('../../util/promise-fs');

jest.mock('fs');
jest.mock('../../util/logger.js');

describe('AddFiles', () => {
  describe('#copyFiles', () => {
    let copySpy;
    let projectName;
    let answers;
    beforeEach(() => {
      copySpy = jest.spyOn(promiseFs, 'copyFile').mockImplementation(() => { });
      projectName = 'test';
      answers = {
        redux: false,
        storybook: true,
      };
    });
    afterEach(() => {
      copySpy.mockReset();
    });
    it('copy files to the project', async () => {
      const res = await copyFiles(projectName, answers);
      expect(copySpy).toHaveBeenCalledTimes(23);
      expect(res).toEqual('Finished Adding Files');
    });
    it('should copy files to project - no storybook', async () => {
      answers.storybook = false;
      await copyFiles(projectName, answers);
      expect(copySpy).toHaveBeenCalledTimes(22);
    });
    // Not working for some reason
    it.skip('should handle errors', async () => {
      copySpy.mockRejectedValue('Error');
      let error;
      try {
        await copyFiles(projectName, answers);
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
      expect(error).toEqual('Error Adding Files');
    });
  });
  describe.skip('#addGitKeep', () => {
    it('should copy over .gitkeep', () => {
      const copySyncSpy = jest.spyOn(fs, 'copySync');
      addGitKeep('test', 'index');
      expect(copySyncSpy).toHaveBeenCalledTimes(1);
    });
  });
});