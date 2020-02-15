const { capitalizeName, generateItemName } = require('../lib/util/format');
describe('Format', () => {
  describe('#capitalizeName', () => {
    it('should capitalize name', () => {
      const expected = 'Test';
      const actual = capitalizeName('test');
      expect(actual).toStrictEqual(expected);
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
    });
  });
});
