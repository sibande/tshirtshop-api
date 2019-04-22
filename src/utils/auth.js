var crypto = require('crypto');
var jwt = require('jsonwebtoken');


/* Generates and returns the sha256 of the string */
exports.getSHA256 = function(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
};

/* Generates and returns the sha1 of the string */
exports.getSHA1 = function(str) {
  return crypto.createHash('sha1').update(str).digest('hex');
};


/* Generates and returns an access token for the given payload */
exports.generateToken = function(payload) {
  return jwt.sign(payload, process.env.AUTH_SECRET_TOKEN, {expiresIn: '24h'});
};

/* Generates and returns an access token for the given payload */
exports.verifyToken = function(token) {
  var decoded = false;
  try {
    decoded = jwt.verify(token, process.env.AUTH_SECRET_TOKEN);
  } catch(err) {
    //
  }

  return decoded;
};

