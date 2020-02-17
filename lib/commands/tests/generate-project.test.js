jest.mock('../../initializers/project-structure');
jest.mock('../../initializers/add-files');
const inquirer = require('inquirer');
const projectStructure = require('../../initializers/project-structure');
const generateProject = require('../generate-project');
const { copyFiles } = require('../../initializers/add-files');

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