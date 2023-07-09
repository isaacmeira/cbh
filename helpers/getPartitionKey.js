const { createHash } = require('./createHash');

function getPartitionKey(event) {
  if (!event) {
    return null;
  }

  return event.partitionKey || createHash(JSON.stringify(event));
}

exports.getPartitionKey = getPartitionKey;
