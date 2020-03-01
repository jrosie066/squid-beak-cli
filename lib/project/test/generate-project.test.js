jest.mock('../project-structure');
jest.mock('../add-files-to-project');
const inquirer = require('inquirer');
const projectStructure = require('../project-structure');
const generateProject = require('../generate-project');
const { copyFiles } = require('../add-files-to-project');

describe('GenerateProject', () => {
  let inquirerSpy;
  let answers;
  let projectName;
  let projectStructureSpy;
  beforeEach(() => {
    projectName = 'test';
    inquirerSpy = jest.spyOn(inquirer, 'prompt');
    answers = {
      componentLibrary: 'Material-UI',
      eslintStandard: 'AirBnb',
      redux: true
    };
    projectStructureSpy = jest.spyOn(projectStructure, 'createProjectStructure').mockImplementation(() => {});
  });
  it('create project with default answers', async () => {
    inquirerSpy.mockResolvedValue(answers);
    await generateProject(projectName);
    expect(inquirerSpy).toHaveBeenCalledTimes(1);
    expect(projectStructureSpy).toHaveBeenCalledTimes(1);
    expect(projectStructureSpy).toHaveBeenCalledWith(projectName, answers);
    expect(copyFiles).toHaveBeenCalledTimes(1);
    expect(copyFiles).toHaveBeenCalledWith(projectName, answers);
  });
});