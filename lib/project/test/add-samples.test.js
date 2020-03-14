const addSamples = require('../add-samples');
const cmdAsync = require('../../util/cmd-async');

jest.mock('../../util/cmd-async');
jest.mock('../../util/logger.js');

describe('Add Samples', () => {
  afterEach(() => {
    cmdAsync.mockResolvedValue('ok');
  });
  describe('#addSampleComponent', () => {
    let projectName;
    let answers;
    beforeEach(() => {
      projectName = 'Test';
      answers = {
        componentLibrary: 'None',
      };
    });
    afterEach(jest.clearAllMocks);
    it('should call sb to create component', async () => {
      await addSamples.addSampleComponent(projectName, answers);
      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(cmdAsync).toHaveBeenCalledWith(expect.stringContaining(
        'squid-beak component Sample'
      ));
    });
    it('should call sb to create component with materials', async () => {
      answers.componentLibrary = 'Material-UI';
      await addSamples.addSampleComponent(projectName, answers);
      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(cmdAsync).toHaveBeenCalledWith(expect.stringContaining(
        'squid-beak component Sample --material'
      ));
    });
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await addSamples.addSampleComponent(projectName, answers);
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
    });
  });
  describe('#addSamplePage', () => {
    let projectName;
    let answers;
    beforeEach(() => {
      projectName = 'Test';
      answers = {
        componentLibrary: 'None',
      };
    });
    afterEach(jest.clearAllMocks);
    it('should call sb to create page', async () => {
      await addSamples.addSamplePage(projectName, answers);
      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(cmdAsync).toHaveBeenCalledWith(expect.stringContaining(
        'squid-beak page Sample'
      ));
    });
    it('should call sb to create page with material', async () => {
      answers.componentLibrary = 'Material-UI';
      await addSamples.addSamplePage(projectName, answers);
      expect(cmdAsync).toHaveBeenCalledTimes(1);
      expect(cmdAsync).toHaveBeenCalledWith(expect.stringContaining(
        'squid-beak page Sample --material'
      ));
    });
    it('should handle errors', async () => {
      cmdAsync.mockRejectedValue('error');
      let error;
      try {
        await addSamples.addSamplePage(projectName, answers);
      } catch (err) {
        error = err;
      }
      expect(error).toBeDefined();
    });
  });
});