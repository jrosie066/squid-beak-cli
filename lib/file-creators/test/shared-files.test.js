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
    materialComponentSpy = jest.spyOn(template, 'materialComponentFile').mockImplementation(() => { });
    jssComponentSpy = jest.spyOn(template, 'jssComponentFile').mockImplementation(() => { });
    materialEnhancerSpy = jest.spyOn(template, 'materialEnhancerFile').mockImplementation(() => { });
    jssEnhancerSpy = jest.spyOn(template, 'jssEnhancerFile').mockImplementation(() => ('import'));
    materialStyleSpy = jest.spyOn(template, 'materialStyleSheet').mockImplementation(() => { });
    jssStyleSpy = jest.spyOn(template, 'jssStyleSheet').mockImplementation(() => { });
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
  describe.only('#createEnhancerFile', () => {
    it('should write the page enhancer file without material', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createEnhancerFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('import')
      );
      expect(jssEnhancerSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('#createComponentFile', () => {
    it('should write the page component file', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createComponentFile(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('import') // TODO: not sure if I want to use this
      );
    });
  });
  describe('#createStyleSheet', () => {
    it('should be a real test someday', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createStyleSheet(componentName, root, options);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('import') // TODO: not sure if I want to use this
      );
    });
  });
});