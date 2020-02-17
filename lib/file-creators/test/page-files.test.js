const fs = require('fs-extra');
const pageFileCreator = require('../page-files');
const sharedFiles = require('../shared-files');

jest.mock('fs');


describe.skip('Page File Creators', () => {
  let writeFileSyncSpy;
  let existsSyncSpy;
  let pageName;
  let root;
  let componentFileSpy;
  let enhancerFileSpy;
  let styleSheetFileSpy;
  let indexFileSpy;
  beforeEach(() => {
    writeFileSyncSpy = jest.spyOn(fs, 'writeFileSyncSpy');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    pageName = 'Test';
    root = 'src/components/Test';
    componentFileSpy = jest.spyOn(sharedFiles, 'createComponentFile').mockImplementation(() => { });
    enhancerFileSpy = jest.spyOn(sharedFiles, 'createEnhancerFile').mockImplementation(() => { });
    styleSheetFileSpy = jest.spyOn(sharedFiles, 'createStyleSheet').mockImplementation(() => { });
    indexFileSpy = jest.spyOn(sharedFiles, 'createIndexFile').mockImplementation(() => { });

  });
  describe('#createPageIndexFile', () => {
    it('should create the index file for the page', () => {
      pageFileCreator.createPageComponent(pageName, root);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${root}/index.ts`),
        `import ${pageName} from './component';\n\n` +
        `export { ${pageName} };\n`
      );
    }
    );
  });
  describe('#createPageComponent', () => {
    it('should create the page component file', () => {
      existsSyncSpy.mockReturnValue(false);
      pageFileCreator.createPageComponent(pageName, root);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
      expect(componentFileSpy).toHaveBeenCalledTimes(1);
      expect(componentFileSpy).toHaveBeenCalledWith(pageName, expect.stringContaining(root));
      expect(enhancerFileSpy).toHaveBeenCalledTimes(1);
      expect(enhancerFileSpy).toHaveBeenCalledWith(pageName, expect.stringContaining(root));
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledWith(pageName, expect.stringContaining(root));
      expect(indexFileSpy).toHaveBeenCalledTimes(1);
      expect(indexFileSpy).toHaveBeenCalledWith(pageName, expect.stringContaining(root));
    });
  });
  describe.skip('#createPageWrapper', () => { });
});