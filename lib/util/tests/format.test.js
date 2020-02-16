const { capitalizeName, generateItemName } = require('../format');
describe('Format', () => {
  describe('#capitalizeName', () => {
    it('should capitalize name', () => {
      const expected = 'Test';
      const actual = capitalizeName('test');
      expect(actual).toStrictEqual(expected);
    });
    it('should throw an error if the input is not a string', () => {
      let actual;
      let error;
      try {
        actual = capitalizeName(1);
      } catch (err) {
        error = err;
      }
      expect(error).toEqual(expect.stringContaining('The name you provided is not a string'));
      expect(actual).toBeUndefined();
    });
  });
  describe('#generateItemName', () => {
    it('should capitalize non dashed names', () => {
      const expected = 'Test';
      const actual = generateItemName('test');
      expect(actual).toStrictEqual(expected);
    });
    it('should camel case dashed names', () => {
      const expected = 'TestOne';
      const actual = generateItemName('test-one');
      expect(actual).toStrictEqual(expected);
    });    it('should throw an error if the input is not a string', () => {
      let actual;
      let error;
      try {
        actual = generateItemName(1);
      } catch (err) {
        error = err;
      }
      expect(error).toEqual(expect.stringContaining('The name you provided is not a string'));
      expect(actual).toBeUndefined();
    });
  });
});
