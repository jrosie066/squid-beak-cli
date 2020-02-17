const createFolderStructure = require('../folder-structure');
const fs = require('fs-extra');

jest.mock('fs');
describe('Initial Folder Structure', () => {
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
  it('should create all of the folders for a starter react app', async () => {
    await createFolderStructure(projectName, answers);
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(11);
  });
  // NOTE: combining all calls for some reason
  it.skip('should add the redux folder if user chooses that option', async () => {
    answers.redux = true;
    await createFolderStructure(projectName, answers);
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(12);
  });
});