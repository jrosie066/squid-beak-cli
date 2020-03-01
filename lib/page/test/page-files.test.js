const fs = require('fs-extra');
const pageFileCreator = require('../page-files');
const sharedFiles = require('../../shared/shared-files');

jest.mock('fs');

describe('Page File Creators', () => {
  let writeFileSyncSpy;
  let existsSyncSpy;
  let pageName;
  let root;
  let styleSheetFileSpy;
  let indexFileSpy;
  let mkdirSyncSpy;
  let options;

  beforeEach(() => {
    writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync');
    pageName = 'Test';
    root = 'src/components/Test';
    options = {
      material: false,
      useEnhancer: true,
      useWrapper: true,
    };
    styleSheetFileSpy = jest.spyOn(sharedFiles, 'createStyleSheet').mockImplementation(() => { });
    indexFileSpy = jest.spyOn(sharedFiles, 'createIndexFile').mockImplementation(() => { });

  });
  describe('#createPageIndexFile', () => {
    it('should create the index file for the page', () => {
      pageFileCreator.createPageIndexFile(pageName, root);
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
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should create the page component file', () => {
      existsSyncSpy.mockReturnValue(false);
      pageFileCreator.createPageComponent(pageName, root, options);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledWith(pageName, expect.stringContaining(root), options);
      expect(indexFileSpy).toHaveBeenCalledTimes(1);
      expect(indexFileSpy).toHaveBeenCalledWith(pageName, expect.stringContaining(root), options);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(2);
    });
    it('should create page component without enhancer', () => {
      existsSyncSpy.mockReturnValue(false);
      options.useEnhancer = false;
      pageFileCreator.createPageComponent(pageName, root, options);
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledTimes(1);
      expect(styleSheetFileSpy).toHaveBeenCalledWith(pageName, expect.stringContaining(root), options);
      expect(indexFileSpy).toHaveBeenCalledTimes(0);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if the page already exists', () => {
      existsSyncSpy.mockReturnValue(true);
      let error;
      try {
        pageFileCreator.createPageComponent(pageName, root);
      } catch (err) {
        error = err;
      }
      expect(existsSyncSpy).toHaveBeenCalledTimes(1);
      expect(existsSyncSpy).toHaveBeenCalledWith(expect.stringContaining(root));
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(0);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(0);
      expect(error).toEqual(expect.stringContaining('Folder already exists'));
    });
  });
  describe('#createPageWrapper', () => {
    it('should create a page wrapper file', () => {
      pageFileCreator.createPageWrapper(pageName, root);
      expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
      expect(mkdirSyncSpy).toHaveBeenCalledWith(`${root}/wrapper`);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${root}/wrapper/${pageName}Wrapper.tsx`),
        expect.stringContaining('<WrappedComponent'),
      );
    });
  });
});