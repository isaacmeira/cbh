const { truncateKey } = require('../truncateKey');

describe('truncateKey', () => {
  it('should return the input unchanged when its length is less than or equal to maxLength', () => {
    const maxLength = 10;
    const partitionKey = 'short';

    const result = truncateKey(partitionKey, maxLength);

    expect(result).toEqual(partitionKey);
  });

  it('should return a string when the length of the input is more than maxLength', () => {
    const maxLength = 5;
    const partitionKey = 'too long';

    const result = truncateKey(partitionKey, maxLength);

    expect(typeof result).toEqual('string');
  });
});
