const crypto = require('crypto');

exports.createHash = (data) => {
  return crypto.createHash('sha3-512').update(data).digest('hex');
};
