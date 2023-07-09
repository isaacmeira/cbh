const { createHash } = require('./createHash');

function truncateKey(partitionKey, maxLength) {
  return partitionKey.length > maxLength
    ? createHash(partitionKey)
    : partitionKey;
}

exports.truncateKey = truncateKey;
