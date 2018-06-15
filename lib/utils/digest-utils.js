const crypto = require('crypto');

exports.createDigest = function (object) {
  return crypto
    .createHash('md5')
    .update(JSON.stringify(object))
    .digest('hex');
};
