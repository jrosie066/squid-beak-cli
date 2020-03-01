const fs = require('fs-extra');
const pageFileCreator = require('../page-files');
const sharedFiles = require('../../shared/shared-files');
const pageTemplates = require('../page-templates');
const sharedTemplates = require('../../shared/file-templates');

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
  afterEach(() => {
    jest.clearAllMocks();
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
  describe('#createPageEnhancerFile', () => {
    let pageMaterialEnhancerSpy;
    let pageJssEnhancerSpy;
    let materialEnhancerSpy;
    let jssEnhancerSpy;
    beforeEach(() => {
      pageMaterialEnhancerSpy = jest.spyOn(pageTemplates, 'materialEnhancerFile').mockImplementation(() => '');
      pageJssEnhancerSpy = jest.spyOn(pageTemplates, 'jssEnhancerFile').mockImplementation(() => '');
      materialEnhancerSpy = jest.spyOn(sharedTemplates, 'materialEnhancerFile').mockImplementation(() => '');
      jssEnhancerSpy = jest.spyOn(sharedTemplates, 'jssEnhancerFile').mockImplementation(() => '');
    });
    it('should create enhancer with material and wrapper', () => {
      options.useMaterial = true;
      options.useWrapper = true;
      pageFileCreator.createPageEnhancerFile(pageName, root, options);
      expect(pageMaterialEnhancerSpy).toHaveBeenCalledTimes(1);
      expect(pageMaterialEnhancerSpy).toHaveBeenCalledWith(pageName);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${pageName}.enhancer.ts`),
        expect.anything()
      );
    });
    it('should create enhancer with material and no wrapper', () => {
      options.useMaterial = true;
      options.useWrapper = false;
      pageFileCreator.createPageEnhancerFile(pageName, root, options);
      expect(materialEnhancerSpy).toHaveBeenCalledTimes(1);
      expect(materialEnhancerSpy).toHaveBeenCalledWith(pageName);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${pageName}.enhancer.ts`),
        expect.anything()
      );
    });
    it('should create enhancer with no material and wrapper', () => {
      options.useMaterial = false;
      options.useWrapper = true;
      pageFileCreator.createPageEnhancerFile(pageName, root, options);
      expect(pageJssEnhancerSpy).toHaveBeenCalledTimes(1);
      expect(pageJssEnhancerSpy).toHaveBeenCalledWith(pageName);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${pageName}.enhancer.ts`),
        expect.anything()
      );
    });
    it('should create enhancer with no material and no wrapper', () => {
      options.useMaterial = false;
      options.useWrapper = false;
      pageFileCreator.createPageEnhancerFile(pageName, root, options);
      expect(jssEnhancerSpy).toHaveBeenCalledTimes(1);
      expect(jssEnhancerSpy).toHaveBeenCalledWith(pageName);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${pageName}.enhancer.ts`),
        expect.anything()
      );
    });
  });
  describe('#createPageComponentFile', () => {
    let noenMaterialComponentSpy;
    let noenJssComponentSpy;
    let componentSpy;
    beforeEach(() => {
      noenMaterialComponentSpy = jest.spyOn(pageTemplates, 'noEnhancerMaterialWrapperComponentFile').mockImplementation(() => '');
      noenJssComponentSpy = jest.spyOn(pageTemplates, 'noEnhancerJssWrapperComponentFile').mockImplementation(() => '');
      componentSpy = jest.spyOn(sharedFiles, 'createComponentFile').mockImplementation(() => '');
    });
    it('should create component with material, wrapper and no enhancer', () => {
      options.useEnhancer = false;
      options.useWrapper = true;
      options.useMaterial = true;
      pageFileCreator.createPageComponentFile(pageName, root, options);
      expect(noenMaterialComponentSpy).toHaveBeenCalledTimes(1);
      expect(noenMaterialComponentSpy).toHaveBeenCalledWith(pageName);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    });
    it('should create component with no material, wrapper and no enhancer', () => {
      options.useEnhancer = false;
      options.useWrapper = true;
      options.useMaterial = false;
      pageFileCreator.createPageComponentFile(pageName, root, options);
      expect(noenJssComponentSpy).toHaveBeenCalledTimes(1);
      expect(noenJssComponentSpy).toHaveBeenCalledWith(pageName);
      expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    });
    it('should create component with wrapper and enhancer', () => {
      options.useEnhancer = true;
      options.useWrapper = true;
      options.useMaterial = true;
      pageFileCreator.createPageComponentFile(pageName, root, options);
      expect(componentSpy).toHaveBeenCalledTimes(1);
      expect(componentSpy).toHaveBeenCalledWith(pageName, root, options);
    });
  });
});