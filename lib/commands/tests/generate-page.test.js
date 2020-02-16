const path = require('path');
const fs = require('fs-extra');
const initiatePage = require('../generate-page');
const pageFileCreator = require('../../file-creators/page-files');
jest.mock('fs');

describe('GeneratePage', () => {
  let existsSyncSpy;
  let mkdirSyncSpy;
  let pageIndexFileSpy;
  let pageComponentSpy;
  let pageWrappereSpy;
  let pageName;
  let root;
  beforeEach(() => {
    pageName = 'test';
    root = path.resolve('src/pages/Test');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
    pageIndexFileSpy = jest.spyOn(pageFileCreator, 'createPageIndexFile').mockImplementation(() => {});
    pageComponentSpy = jest.spyOn(pageFileCreator, 'createPageComponent').mockImplementation(() => {});
    pageWrappereSpy = jest.spyOn(pageFileCreator, 'createPageWrapper').mockImplementation(() => {});
  });
  it('create the page if none exist', () => {
    existsSyncSpy.mockReturnValue(false);
    initiatePage(pageName, {});
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
    expect(mkdirSyncSpy).toHaveBeenCalledWith(root);
    expect(pageIndexFileSpy).toHaveBeenCalledTimes(1);
    expect(pageIndexFileSpy).toHaveBeenCalledWith('Test', root);
    expect(pageComponentSpy).toHaveBeenCalledTimes(1);
    expect(pageComponentSpy).toHaveBeenCalledWith('Test', root);
    expect(pageWrappereSpy).toHaveBeenCalledTimes(1);
    expect(pageWrappereSpy).toHaveBeenCalledWith('Test', root);
  });
});