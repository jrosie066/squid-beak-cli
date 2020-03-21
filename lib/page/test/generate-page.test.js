const path = require('path');
const fs = require('fs-extra');
const initiatePage = require('../generate-page');
const pageFileCreator = require('../page-files');
const updater = require('../../shared/update');
const lintRoller = require('../../util/lint-roller');

jest.mock('fs');
jest.mock('../../util/logger.js');
jest.mock('../../util/lint-roller');

describe('GeneratePage', () => {
  let existsSyncSpy;
  let mkdirSyncSpy;
  let pageMainSpy;
  let pageComponentSpy;
  let pageWrappereSpy;
  let updateRouteSpy;
  let pageName;
  let root;
  let options;
  let folder;
  beforeEach(() => {
    options = {
      useMaterial: false,
      useEnhancer: true,
      useWrapper: true,
    };
    pageName = 'Test';
    folder = 'src/pages/Test';
    root = path.resolve(folder);
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { });
    pageMainSpy = jest.spyOn(pageFileCreator, 'createPageMain').mockImplementation(() => { });
    pageComponentSpy = jest.spyOn(pageFileCreator, 'createPageComponent').mockImplementation(() => { });
    pageWrappereSpy = jest.spyOn(pageFileCreator, 'createPageWrapper').mockImplementation(() => { });
    updateRouteSpy = jest.spyOn(updater, 'updateRoutes').mockResolvedValue('This passed');
    lintRoller.mockResolvedValue('');
  });
  afterEach(jest.clearAllMocks);
  it('create the page if none exist', async () => {
    existsSyncSpy.mockReturnValue(false);

    await initiatePage(pageName, options);
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
    expect(mkdirSyncSpy).toHaveBeenCalledWith(root);
    expect(pageMainSpy).toHaveBeenCalledTimes(1);
    expect(pageMainSpy).toHaveBeenCalledWith('Test', root, options);
    expect(pageComponentSpy).toHaveBeenCalledTimes(1);
    expect(pageComponentSpy).toHaveBeenCalledWith('Test', root, options);
    expect(pageWrappereSpy).toHaveBeenCalledTimes(1);
    expect(pageWrappereSpy).toHaveBeenCalledWith('Test', root);
    expect(updateRouteSpy).toHaveBeenCalledTimes(1);
    expect(updateRouteSpy).toHaveBeenCalledWith('Test');
    expect(lintRoller).toHaveBeenCalledTimes(1);
    expect(lintRoller).toHaveBeenCalledWith(folder);
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
  it('should handle lint roller error', async () => {
    existsSyncSpy.mockReturnValue(false);
    lintRoller.mockRejectedValue('failed');
    let error;
    try {
      await initiatePage(pageName, {});
    } catch (err) {
      error = err;
    }
    expect(error).toEqual('failed');
  });
});