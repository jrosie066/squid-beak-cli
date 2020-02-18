const fs = require('fs-extra');
const projectStructure = require('../project-structure');
jest.mock('fs');
describe('ProjectStructure', () => {
  let projectName;
  let answers;
  let mkdirSyncSpy;

  beforeEach(() => {
    projectName = 'Test';
    answers = {
      test: true,
    };
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync');
  });
  describe('#createFolderStructure', () => {
    beforeEach(() => {
      mkdirSyncSpy.mockClear();
    });
    it('should create all of the folders for a starter react app', async () => {
      await projectStructure.createFolderStructure(projectName, answers);
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(11);
    });
    // NOTE: combining all calls for some reason
    it('should add the redux folder if user chooses that option', async () => {
      answers.redux = true;
      await projectStructure.createFolderStructure(projectName, answers);
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(12);
    });
  });
  describe.skip('#createProjectStructure', () => {
    it('should create new project structure and folder', () => {

    });
  });
});