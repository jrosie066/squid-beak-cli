const { createEnhancerFile, createIndexFile, createComponentFile, createStyleSheet } = require('../shared-files');
const fs = require('fs-extra');
const template = require('../file-templates');

jest.mock('fs');
describe('Shared File Creators', () => {
  let writeSyncSpy;
  let options;
  let materialComponentSpy;
  let jssComponentSpy;
  let materialEnhancerSpy;
  let jssEnhancerSpy;
  let materialStyleSpy;
  let jssStyleSpy;
  beforeEach(() => {
    writeSyncSpy = jest.spyOn(fs, 'writeFileSync');
    materialComponentSpy = jest.spyOn(template, 'materialComponentFile').mockImplementation(() => ('const {classes} = props;'));
    jssComponentSpy = jest.spyOn(template, 'jssComponentFile').mockImplementation(() => ('const classes = useStyles();'));
    materialEnhancerSpy = jest.spyOn(template, 'materialEnhancerFile').mockImplementation(() => ('withStyles(\'styles\')'));
    jssEnhancerSpy = jest.spyOn(template, 'jssEnhancerFile').mockImplementation(() => ('memo'));
    materialStyleSpy = jest.spyOn(template, 'materialStyleSheet').mockImplementation(() => ('theme'));
    jssStyleSpy = jest.spyOn(template, 'jssStyleSheet').mockImplementation(() => ('createUseStyles()'));
    options = {
      useMaterial: false,
    };
  });
  describe('#createIndexFile', () => {
    it('should write the main index file', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createIndexFile(componentName, root);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        'import { Test } from \'./Test\';\n' +
        'import { enhance } from \'./Test.enhancer\';\n\n' +
        'export default enhance(Test);\n'
      );
    });
  });
  describe('#createEnhancerFile', () => {
    it('should write the page enhancer file without material', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createEnhancerFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('memo')
      );
      expect(jssEnhancerSpy).toHaveBeenCalledTimes(1);
    });
    it('should write the page enhancer file with material', () => {
      options.useMaterial = true;
      const componentName = 'Test';
      const root = 'src/components/test';
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
    it('should write the component file without material', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createComponentFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('const classes = useStyles();')
      );
      expect(jssComponentSpy).toHaveBeenCalledTimes(1);
      expect(jssComponentSpy).toHaveBeenCalledWith(componentName);
    });
    it('should write the component file with material', () => {
      options.useMaterial = true;
      const componentName = 'Test';
      const root = 'src/components/test';
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
      const componentName = 'Test';
      const root = 'src/components/test';
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
      const componentName = 'Test';
      const root = 'src/components/test';
      createStyleSheet(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('theme')
      );
      expect(materialStyleSpy).toHaveBeenCalledTimes(1);
      expect(materialStyleSpy).toHaveBeenCalledWith();
    });
  });
});