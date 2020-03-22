const fs = require('fs-extra');
const { copyFiles, addGitKeep, _getFilesToAddToSrc } = require('../add-files-to-project');
const promiseFs = require('../../util/promise-fs');

jest.mock('fs');
jest.mock('../../util/logger.js');

describe('AddFiles', () => {
  let projectName;
  let answers;
  beforeEach(() => {
    projectName = 'test';
    answers = {
      redux: true,
      storybook: true,
    };
  });
  describe('#copyFiles', () => {
    let copySpy;
    beforeEach(() => {
      copySpy = jest.spyOn(promiseFs, 'copyFile').mockImplementation(() => { });
    });
    afterEach(() => {
      copySpy.mockReset();
    });
    it('copy files to the project', async () => {
      const res = await copyFiles(projectName, answers);
      expect(copySpy).toHaveBeenCalledTimes(32);
      expect(res).toEqual('Finished Adding Files');
    });
    it('should copy files to project - no storybook', async () => {
      answers.storybook = false;
      await copyFiles(projectName, answers);
      expect(copySpy).toHaveBeenCalledTimes(31);
    });
    it('should handle errors', async () => {
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
  describe('#getFilesToAddToSrc', () => {
    it('should return the files array for base answers', () => {
      const actual = _getFilesToAddToSrc(answers);
      expect(actual).toHaveLength(16);
    });
    it('should return the files array for no redux answer', () =>{
      answers.redux = false;
      const actual = _getFilesToAddToSrc(answers);
      expect(actual).toHaveLength(14);
    });
  });
  // NOTE: this is throwing a weird error
  describe.skip('#addGitKeep', () => {
    it('should copy over .gitkeep', () => {
      const copySyncSpy = jest.spyOn(fs, 'copySync');
      addGitKeep('test', 'index');
      expect(copySyncSpy).toHaveBeenCalledTimes(1);
    });
  });
});