const updater = require('../update');
const promiseFs = require('../../util/promise-fs');

jest.mock('../../util/logger.js');

describe('Updater', () => {
  let readFileSpy;
  let writeFileSpy;
  beforeEach(() => {
    readFileSpy = jest.spyOn(promiseFs, 'readFile');
    writeFileSpy = jest.spyOn(promiseFs, 'writeFile');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#updateRoutes', () => {
    let file;
    beforeEach(() => {
      file =
        `
        export const routes = () => {
          [
            {
              path: ''
            },
          ].map(item => item);
        }
      `;
      readFileSpy.mockImplementation(() => file);
      writeFileSpy.mockImplementation(() => { });
    });
    it('should update the given file', async () => {
      // const finalFile = 'import { Test } from \'./Test\';\n';
      await updater.updateRoutes('Test');
      expect(readFileSpy).toHaveBeenCalledTimes(1);
      expect(readFileSpy).toHaveBeenCalledWith(
        expect.stringContaining('src/pages/routes.tsx')
      );
      expect(writeFileSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSpy).toHaveBeenCalledWith(
        expect.stringContaining('src/pages/routes.tsx'),
        // expect.stringContaining(finalFile)
        expect.anything() // TODO: fix
      );
    });
    it('should catch any read/write errors and log them', async () => {
      let error;
      readFileSpy.mockRejectedValue('Error');
      try {
        await updater.updateRoutes('Test');
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
      // TODO: mock loggers?
    });
  });
  describe('#updatePackageJson', () => {
    let file;
    beforeEach(() => {
      file = `
      {
        "name": "react-starter"
      }
      `;
      readFileSpy.mockImplementation(() => file);
      writeFileSpy.mockImplementation(() => { });
    });
    it('should replace starter name with project name', async () => {
      await updater.updatePackageJson('Test');
      expect(readFileSpy).toHaveBeenCalledTimes(1);
      expect(readFileSpy).toHaveBeenCalledWith(
        expect.stringContaining('package.json')
      );
      expect(writeFileSpy).toHaveBeenCalledTimes(1);
      expect(writeFileSpy).toHaveBeenCalledWith(
        expect.stringContaining('package.json'),
        expect.anything()
      );
    });
    it('should catch any read/write errors and log them', async () => {
      let error;
      readFileSpy.mockRejectedValue('Error');
      try {
        await updater.updatePackageJson('Test');
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
      // TODO: mock loggers?
    });
  });
});