const path = require('path');
const fs = require('fs-extra');
const initiatePage = require('../generate-page');
const pageFileCreator = require('../page-files');
const updater = require('../../shared/update');

jest.mock('fs');
jest.mock('../../util/logger.js');

describe('GeneratePage', () => {
  let existsSyncSpy;
  let mkdirSyncSpy;
  let pageIndexFileSpy;
  let pageComponentSpy;
  let pageWrappereSpy;
  let updateRouteSpy;
  let pageName;
  let root;
  let options;
  beforeEach(() => {
    options = {
      useMaterial: false,
      useEnhancer: true,
      useWrapper: true,
    };
    pageName = 'test';
    root = path.resolve('src/pages/Test');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { });
    pageIndexFileSpy = jest.spyOn(pageFileCreator, 'createPageIndexFile').mockImplementation(() => { });
    pageComponentSpy = jest.spyOn(pageFileCreator, 'createPageComponent').mockImplementation(() => { });
    pageWrappereSpy = jest.spyOn(pageFileCreator, 'createPageWrapper').mockImplementation(() => { });
    updateRouteSpy = jest.spyOn(updater, 'updateRoutes').mockResolvedValue('This passed');
  });
  afterEach(jest.clearAllMocks);
  it('create the page if none exist', async () => {
    existsSyncSpy.mockReturnValue(false);

    await initiatePage(pageName, options);
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
    expect(mkdirSyncSpy).toHaveBeenCalledWith(root);
    expect(pageIndexFileSpy).toHaveBeenCalledTimes(1);
    expect(pageIndexFileSpy).toHaveBeenCalledWith('Test', root);
    expect(pageComponentSpy).toHaveBeenCalledTimes(1);
    expect(pageComponentSpy).toHaveBeenCalledWith('Test', root, options);
    expect(pageWrappereSpy).toHaveBeenCalledTimes(1);
    expect(pageWrappereSpy).toHaveBeenCalledWith('Test', root);
    expect(updateRouteSpy).toHaveBeenCalledTimes(1);
    expect(updateRouteSpy).toHaveBeenCalledWith('Test');
  });
  it('should throw an error if a page with the given name already exist', async () => {
    existsSyncSpy.mockReturnValue(true);
    let error;
    try {
      await initiatePage(pageName, {});
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });
  it('should handle update routes error', async () => {
    existsSyncSpy.mockReturnValue(false);
    updateRouteSpy.mockRejectedValue('failed');
    let error;
    try {
      await initiatePage(pageName, {});
    } catch (err) {
      error = err;
    }
    expect(error).toEqual('failed');
  });
});