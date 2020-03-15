const {
  createEnhancerFile, createIndexFile, createComponentFile, createStyleSheet, createStorybookFile
} = require('../shared-files');
const fs = require('fs-extra');
const template = require('../file-templates');

jest.mock('fs');
jest.mock('../../util/logger.js');

describe('Shared File Creators', () => {
  let writeSyncSpy;
  let options;
  let materialComponentSpy;
  let jssComponentSpy;
  let noEnhancerMaterialComponentSpy;
  let noEnhancerJssComponentSpy;
  let materialEnhancerSpy;
  let jssEnhancerSpy;
  let materialStyleSpy;
  let indexFileSpy;
  let jssStyleSpy;
  let storybookFileSpy;
  let componentName;
  let root;
  beforeEach(() => {
    writeSyncSpy = jest.spyOn(fs, 'writeFileSync');
    indexFileSpy = jest.spyOn(template, 'indexFile').mockImplementation(() => ('export default enhance'));
    materialComponentSpy = jest.spyOn(template, 'materialComponentFile').mockImplementation(() => ('const {classes} = props;'));
    noEnhancerMaterialComponentSpy = jest.spyOn(template, 'noEnhancerMaterialComponentFile').mockImplementation(() => ('Test = withStyles(Test);'));
    jssComponentSpy = jest.spyOn(template, 'jssComponentFile').mockImplementation(() => ('const classes = useStyles();'));
    noEnhancerJssComponentSpy = jest.spyOn(template, 'noEnhancerJssComponentFile').mockImplementation(() => ('export default memo(Test);'));
    materialEnhancerSpy = jest.spyOn(template, 'materialEnhancerFile').mockImplementation(() => ('withStyles(\'styles\')'));
    jssEnhancerSpy = jest.spyOn(template, 'jssEnhancerFile').mockImplementation(() => ('memo'));
    materialStyleSpy = jest.spyOn(template, 'materialStyleSheet').mockImplementation(() => ('theme'));
    jssStyleSpy = jest.spyOn(template, 'jssStyleSheet').mockImplementation(() => ('createUseStyles()'));
    storybookFileSpy = jest.spyOn(template, 'storybookTestFile').mockImplementation(() => ('export const test = ()'));
    options = {
      useMaterial: false,
    };
    componentName = 'Test';
    root = 'src/components/test';
  });
  describe('#createIndexFile', () => {
    it('should write the main index file', () => {
      createIndexFile(componentName, root);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('export default enhance')
      );
      expect(indexFileSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('#createEnhancerFile', () => {
    it('should write the page enhancer file without material', () => {
      createEnhancerFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('memo')
      );
      expect(jssEnhancerSpy).toHaveBeenCalledTimes(1);
    });
    it('should write the page enhancer file with material', () => {
      options.useMaterial = true;
      createEnhancerFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('withStyles(\'styles\')')
      );
      expect(materialEnhancerSpy).toHaveBeenCalledTimes(1);
      expect(materialEnhancerSpy).toHaveBeenCalledWith(componentName);
    });
  });
  describe('#createComponentFile', () => {
    it('should write the component file without material and no enhancer', () => {
      options.useMaterial = false;
      options.useEnhancer = false;
      createComponentFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('export default memo(Test);')
      );
      expect(noEnhancerJssComponentSpy).toHaveBeenCalledTimes(1);
      expect(noEnhancerJssComponentSpy).toHaveBeenCalledWith(componentName);
    });
    it('should write the component file with material and no enhancer', () => {
      options.useMaterial = true;
      options.useEnhancer = false;
      createComponentFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('Test = withStyles(Test);')
      );
      expect(noEnhancerMaterialComponentSpy).toHaveBeenCalledTimes(1);
      expect(noEnhancerMaterialComponentSpy).toHaveBeenCalledWith(componentName);
    });
    it('should write the component file with no material and with enhancer', () => {
      options.useMaterial = false;
      options.useEnhancer = true;
      createComponentFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('const classes = useStyles();')
      );
      expect(jssComponentSpy).toHaveBeenCalledTimes(1);
      expect(jssComponentSpy).toHaveBeenCalledWith(componentName);
    });
    it('should write the component file with material and with enhancer', () => {
      options.useMaterial = true;
      options.useEnhancer = true;
      createComponentFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('const {classes} = props;')
      );
      expect(materialComponentSpy).toHaveBeenCalledTimes(1);
      expect(materialComponentSpy).toHaveBeenCalledWith(componentName);
    });
  });
  describe('#createStyleSheet', () => {
    it('should create stylesheet without material', () => {
      createStyleSheet(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('createUseStyles()')
      );
      expect(jssStyleSpy).toHaveBeenCalledTimes(1);
      expect(jssStyleSpy).toHaveBeenCalledWith();
    });
    it('should create stylesheet with material', () => {
      options.useMaterial = true;
      createStyleSheet(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('theme')
      );
      expect(materialStyleSpy).toHaveBeenCalledTimes(1);
      expect(materialStyleSpy).toHaveBeenCalledWith();
    });
  });
  describe('#createStorybook', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should create storybook file with enhancer import', () => {
      options.useEnhancer = true;
      createStorybookFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining('stories.jsx'),
        expect.stringContaining('export const test = ()')
      );
      expect(storybookFileSpy).toHaveBeenCalledTimes(1);
    });
    it('should create storybook file without enhancer import', () => {
      options.useEnhancer = false;
      createStorybookFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining('stories.jsx'),
        expect.stringContaining('export const test = ()')
      );
      expect(storybookFileSpy).toHaveBeenCalledTimes(1);
    });
  });
});