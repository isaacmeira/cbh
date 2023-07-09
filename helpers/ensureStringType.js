function ensureStringType(partitionKey) {
  return typeof partitionKey === 'string'
    ? partitionKey
    : JSON.stringify(partitionKey);
}

exports.ensureStringType = ensureStringType;
