const crypto = require('crypto');
const { createHash } = require('../createHash');

jest.mock('crypto');

describe('createHash', () => {
  it('should call crypto.createHash with the correct algorithm and data', () => {
    const mockData = 'test data';
    const mockHashObject = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn(),
    };
    const mockDigest = 'mock digest';

    crypto.createHash.mockReturnValueOnce(mockHashObject);
    mockHashObject.digest.mockReturnValueOnce(mockDigest);

    const result = createHash(mockData);

    expect(result).toEqual(mockDigest);
    expect(crypto.createHash).toHaveBeenCalledWith('sha3-512');
    expect(mockHashObject.update).toHaveBeenCalledWith(mockData);
    expect(mockHashObject.digest).toHaveBeenCalledWith('hex');
  });
});
