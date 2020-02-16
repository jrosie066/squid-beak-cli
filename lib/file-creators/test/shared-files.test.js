const { createEnhancerFile, createIndexFile, createComponentFile, createStyleSheet } = require('../shared-files');
const fs = require('fs-extra');

jest.mock('fs');
describe('Shared File Creators', () => {
  let writeSyncSpy;
  beforeEach(() => {
    writeSyncSpy = jest.spyOn(fs, 'writeFileSync');
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
    it('should write the page enhancer file', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createEnhancerFile(componentName, root);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('import') // TODO: not sure if I want to use this
      );
    });
  });
  describe('#createComponentFile', () => {
    it('should write the page component file', () => {
      const componentName = 'Test';
      const root = 'src/components/test';
      createComponentFile(componentName, root);
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
      createStyleSheet(componentName, root);
      expect(writeSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(root),
        expect.stringContaining('import') // TODO: not sure if I want to use this
      );
    });
  });
});