const fs = require('fs-extra');
const createComponent = require('../generate-component');
const sharedFiles = require('../../shared/shared-files');

jest.mock('fs');
jest.mock('../../util/logger.js');

describe('GenerateComponent', () => {
  let existsSyncSpy;
  let root;
  let componentName;
  let componentFileSpy;
  let enhancerFileSpy;
  let styleSheetFileSpy;
  let indexFileSpy;
  let storybookSpy;
  let options;
  beforeEach(() => {
    componentName = 'Test';
    root = 'src/components/Test';
    options = {
      useMaterial: false,
      useEnhancer: true,
    };
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    componentFileSpy = jest.spyOn(sharedFiles, 'createComponentFile').mockImplementation(() => { });
    enhancerFileSpy = jest.spyOn(sharedFiles, 'createEnhancerFile').mockImplementation(() => { });
    styleSheetFileSpy = jest.spyOn(sharedFiles, 'createStyleSheet').mockImplementation(() => { });
    indexFileSpy = jest.spyOn(sharedFiles, 'createIndexFile').mockImplementation(() => { });
    storybookSpy = jest.spyOn(sharedFiles, 'createStorybookFile').mockImplementation(() => { });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('useEnhancer', () => {
    it('create a new component', async () => {
      existsSyncSpy.mockReturnValue(false);
      await createComponent(componentName, options);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
      expect(componentFileSpy).toHaveBeenCalledTimes(1);
      expect(componentFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
      expect(enhancerFileSpy).toHaveBeenCalledTimes(1);
      expect(enhancerFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
      expect(indexFileSpy).toHaveBeenCalledTimes(1);
      expect(indexFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
    });
    it('create a new component with no enhancer', async () => {
      options.useEnhancer = false;
      existsSyncSpy.mockReturnValue(false);
      await createComponent(componentName, options);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
      expect(componentFileSpy).toHaveBeenCalledTimes(1);
      expect(componentFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
    });
    it('create a new component with storybook', async () => {
      options.useStorybook = true;
      existsSyncSpy.mockReturnValue(false);
      await createComponent(componentName, options);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
      expect(componentFileSpy).toHaveBeenCalledTimes(1);
      expect(componentFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
      expect(storybookSpy).toHaveBeenCalledTimes(1);
      expect(storybookSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(root), options);
    });
    it('should throw an error if a component with the given name already exist', async () => {
      existsSyncSpy.mockReturnValue(true);
      let error;
      try {
        await createComponent(componentName);
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
    });
  });
});