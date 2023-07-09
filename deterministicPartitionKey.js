const createHash = require('./helpers/createHash');
const { getPartitionKey } = require('./helpers/getPartitionKey');
const { ensureStringType } = require('./helpers/ensureStringType');
const { truncateKey } = require('./helpers/truncateKey');

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  let partitionKey = getPartitionKey(event) || TRIVIAL_PARTITION_KEY;
  partitionKey = ensureStringType(partitionKey);
  partitionKey = truncateKey(partitionKey, MAX_PARTITION_KEY_LENGTH);

  return partitionKey;
};
