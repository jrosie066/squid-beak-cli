const fs = require('fs-extra');
const { copyFiles } = require('../add-files');

jest.mock('fs');
describe('AddFiles', () => {
  let copySyncSpy;
  let projectName;
  let answers;
  beforeEach(() => {
    copySyncSpy = jest.spyOn(fs, 'copySync');
    projectName = 'test';
    answers = {
      test: true,
    };
  });
  it.skip('copy files to the project', async () => { 
    console.log(copySyncSpy);
    await copyFiles(projectName, answers);
    expect(copySyncSpy).toHaveBeenCalledTimes(11);
  });
});