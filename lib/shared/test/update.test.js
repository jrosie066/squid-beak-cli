const updater = require('../update');
const promiseFs = require('../../util/promise-fs');

describe('Updater', () => {
  describe('#updateRoutes', () => {
    let readFileSpy;
    let writeFileSpy;
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
      readFileSpy = jest.spyOn(promiseFs, 'readFile').mockImplementation(() => file);
      writeFileSpy = jest.spyOn(promiseFs, 'writeFile').mockImplementation(() => { });
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
});