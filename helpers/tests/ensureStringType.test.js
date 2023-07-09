const { ensureStringType } = require('../ensureStringType');

describe('ensureStringType', () => {
  it('should return the input unchanged when it is already a string', () => {
    const stringInput = 'test string';

    const result = ensureStringType(stringInput);

    expect(result).toEqual(stringInput);
  });

  it('should return a JSON string when the input is not a string', () => {
    const nonStringInput = { key: 'value' };
    const jsonString = JSON.stringify(nonStringInput);

    const result = ensureStringType(nonStringInput);

    expect(result).toEqual(jsonString);
  });
});
