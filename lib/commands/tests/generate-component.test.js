const fs = require('fs-extra');
const commands = require('../generate-component');
const sharedFiles = require('../../file-creators/shared-files');

jest.mock('fs');
describe('GenerateComponent', () => {
  let existsSyncSpy;
  let root;
  let componentName;
  let componentFileSpy;
  let enhancerFileSpy;
  let styleSheetFileSpy;
  let indexFileSpy;

  beforeEach(() => {
    componentName = 'Test';
    root = 'src/components/Test';
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    componentFileSpy = jest.spyOn(sharedFiles, 'createComponentFile').mockImplementation(() => { });
    enhancerFileSpy = jest.spyOn(sharedFiles, 'createEnhancerFile').mockImplementation(() => { });
    styleSheetFileSpy = jest.spyOn(sharedFiles, 'createStyleSheet').mockImplementation(() => { });
    indexFileSpy = jest.spyOn(sharedFiles, 'createIndexFile').mockImplementation(() => { });
  });
  it('create a new component', () => {
    existsSyncSpy.mockReturnValue(false);
    commands.createComponent(componentName);
    expect(existsSyncSpy).toHaveBeenCalledTimes(1);
    expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
    expect(componentFileSpy).toHaveBeenCalledTimes(1);
    expect(componentFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root));
    expect(enhancerFileSpy).toHaveBeenCalledTimes(1);
    expect(enhancerFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root));
    expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
    expect(styleSheetFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root));
    expect(indexFileSpy).toHaveBeenCalledTimes(1);
    expect(indexFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root));
  });
  it('should throw an error if a component with the given name already exist', () => {
    existsSyncSpy.mockReturnValue(true);
    let error;
    try {
      commands.createComponent(componentName);
    } catch(err) {
      error = err;
    }
    expect(error).toBeDefined();
    
  });
});