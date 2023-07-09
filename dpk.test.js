const createHash = require('./helpers/createHash');
const { getPartitionKey } = require('./helpers/getPartitionKey');
const { ensureStringType } = require('./helpers/ensureStringType');
const { truncateKey } = require('./helpers/truncateKey');
const { deterministicPartitionKey } = require('./deterministicPartitionKey');

jest.mock('./helpers/getPartitionKey');
jest.mock('./helpers/ensureStringType');
jest.mock('./helpers/truncateKey');

describe('deterministicPartitionKey', () => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  const MOCK_EVENT = 'mock event';

  beforeEach(() => {
    getPartitionKey.mockClear();
    ensureStringType.mockClear();
    truncateKey.mockClear();
  });

  it('should return the trivial partition key when getPartitionKey returns undefined', () => {
    getPartitionKey.mockReturnValueOnce(undefined);
    ensureStringType.mockReturnValueOnce(TRIVIAL_PARTITION_KEY);
    truncateKey.mockReturnValueOnce(TRIVIAL_PARTITION_KEY);

    const result = deterministicPartitionKey(MOCK_EVENT);

    expect(result).toEqual(TRIVIAL_PARTITION_KEY);
    expect(getPartitionKey).toHaveBeenCalledWith(MOCK_EVENT);
    expect(ensureStringType).toHaveBeenCalledWith(TRIVIAL_PARTITION_KEY);
    expect(truncateKey).toHaveBeenCalledWith(
      TRIVIAL_PARTITION_KEY,
      MAX_PARTITION_KEY_LENGTH
    );
  });

  it('should return a string type key when getPartitionKey returns a non-string type', () => {
    const nonStringPartitionKey = 12345;
    const stringPartitionKey = '12345';

    getPartitionKey.mockReturnValueOnce(nonStringPartitionKey);
    ensureStringType.mockReturnValueOnce(stringPartitionKey);
    truncateKey.mockReturnValueOnce(stringPartitionKey);

    const result = deterministicPartitionKey(MOCK_EVENT);

    expect(result).toEqual(stringPartitionKey);
    expect(getPartitionKey).toHaveBeenCalledWith(MOCK_EVENT);
    expect(ensureStringType).toHaveBeenCalledWith(nonStringPartitionKey);
    expect(truncateKey).toHaveBeenCalledWith(
      stringPartitionKey,
      MAX_PARTITION_KEY_LENGTH
    );
  });

  it('should return a truncated key when the original key exceeds the maximum length', () => {
    const longPartitionKey = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const truncatedPartitionKey = 'a'.repeat(MAX_PARTITION_KEY_LENGTH);

    getPartitionKey.mockReturnValueOnce(longPartitionKey);
    ensureStringType.mockReturnValueOnce(longPartitionKey);
    truncateKey.mockReturnValueOnce(truncatedPartitionKey);

    const result = deterministicPartitionKey(MOCK_EVENT);

    expect(result).toEqual(truncatedPartitionKey);
    expect(getPartitionKey).toHaveBeenCalledWith(MOCK_EVENT);
    expect(ensureStringType).toHaveBeenCalledWith(longPartitionKey);
    expect(truncateKey).toHaveBeenCalledWith(
      longPartitionKey,
      MAX_PARTITION_KEY_LENGTH
    );
  });
});
