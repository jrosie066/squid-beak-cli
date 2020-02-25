const fs = require('fs-extra');
const projectStructure = require('../project-structure');
jest.mock('fs');
describe('ProjectStructure', () => {
  let projectName;
  let answers;
  let mkdirSyncSpy;
  let existsSyncSpy;
  beforeEach(() => {
    projectName = 'Test';
    answers = {
      test: true,
    };
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
  });
  afterEach(() => {
    mkdirSyncSpy.mockReset();
  });
  describe('#createFolderStructure', () => {
    afterEach(() => {
      mkdirSyncSpy.mockReset();
    });
    it('should create all of the folders for a starter react app', async () => {
      answers.storybook = false;
      await projectStructure.createFolderStructure(projectName, answers);
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(11);
    });
    it('should add the redux folder if user chooses that option', async () => {
      answers.redux = true;
      await projectStructure.createFolderStructure(projectName, answers);
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(12);
    });
  });
  describe('#createProjectStructure', () => {
    beforeEach(() => {
      mkdirSyncSpy.mockReset();
    });
    it('should create new project structure and folder', async () => {
      existsSyncSpy.mockReturnValue(false);
      await projectStructure.createProjectStructure(projectName, answers);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(12);
      expect(mkdirSyncSpy).toHaveBeenCalledWith(expect.stringContaining(projectName));
    });
    it('should give an error for the project folder name already existing', async () => {
      existsSyncSpy.mockReturnValue(true);
      let error;
      try {
        await projectStructure.createProjectStructure(projectName, answers);
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
    });
  });
});