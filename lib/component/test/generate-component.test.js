const fs = require('fs-extra');
const sharedFiles = require('../../shared/shared-files');
const lintRoller = require('../../util/lint-roller');
const promiseFs = require('../../util/promise-fs');
const {
  createComponent,
  _setupComponentWithEnhancer,
  _createStoryBookFiles,
  _setupComponentNoEnhancer
} = require('../generate-component');
jest.mock('fs');
jest.mock('../../util/logger.js');
jest.mock('../../util/lint-roller');


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
  let mkDirSyncSpy;
  beforeEach(() => {
    componentName = 'Test';
    root = 'src/components/Test';
    options = {
      useMaterial: false,
      useEnhancer: true,
    };
    mkDirSyncSpy = jest.spyOn(fs, 'mkdirSync');
    existsSyncSpy = existsSyncSpy = jest.spyOn(fs, 'existsSync');
    componentFileSpy = jest.spyOn(sharedFiles, 'createComponentFile').mockImplementation(() => { });
    enhancerFileSpy = jest.spyOn(sharedFiles, 'createEnhancerFile').mockImplementation(() => { });
    styleSheetFileSpy = jest.spyOn(sharedFiles, 'createStyleSheet').mockImplementation(() => { });
    indexFileSpy = jest.spyOn(sharedFiles, 'createIndexFile').mockImplementation(() => { });
    storybookSpy = jest.spyOn(sharedFiles, 'createStorybookFile').mockImplementation(() => { });
    lintRoller.mockResolvedValue();
  });
  afterEach(jest.clearAllMocks);
  describe('#_setupComponentWithEnhancer', () => {
    it('should create new component with enhancer', () => {
      _setupComponentWithEnhancer(componentName, root, options);
      expect(componentFileSpy).toHaveBeenCalledTimes(1);
      expect(enhancerFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(indexFileSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('#_setupComponentNoEnhancer', () => {
    it('should create new component without enhancer', () => {
      _setupComponentNoEnhancer(componentName, root, options);
      expect(componentFileSpy).toHaveBeenCalledTimes(1);
      expect(enhancerFileSpy).toHaveBeenCalledTimes(0);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(indexFileSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('#_createStoryBookFiles', () => {
    it('should create new folder and storybook test', async () => {
      _createStoryBookFiles(componentName, root, options);
      expect(mkDirSyncSpy).toHaveBeenCalledTimes(1);
      expect(mkDirSyncSpy).toHaveBeenCalledWith(`${root}/test`, { recursive: true });
      expect(storybookSpy).toHaveBeenCalledTimes(1);
    });
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
    it('create a new component with a different path', async () => {
      const newPath = 'this/is/my/new/path';
      existsSyncSpy.mockReturnValue(false);
      options.newPath = newPath;
      await createComponent(componentName, options);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(newPath));
      expect(componentFileSpy).toHaveBeenCalledTimes(1);
      expect(componentFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(newPath), options);
      expect(enhancerFileSpy).toHaveBeenCalledTimes(1);
      expect(enhancerFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(newPath), options);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(newPath), options);
      expect(indexFileSpy).toHaveBeenCalledTimes(1);
      expect(indexFileSpy).toHaveBeenCalledWith(componentName, expect.stringContaining(newPath), options);
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
        await createComponent(componentName, options);
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
    });
    it('should reject the promise if lint error', async () => {
      existsSyncSpy.mockReturnValue(false);
      lintRoller.mockRejectedValue('lint roller error');
      let error;
      try {
        await createComponent(componentName, options);
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
      expect(error).toEqual({
        remove: false,
        message: '\nError creating component: Test'
      });
    });
  });
});