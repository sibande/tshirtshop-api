var authUtils = require('../../utils/auth');


/* Extract authentication token and add it to the request object */
exports.extractToken = function(req, res, next){
  var headerKey = 'Bearer';

  if (req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === headerKey) {
      req['token'] = parts[1];
    }
  }

  next();
};

/* Verify token */
exports.verifyToken = function(req, res, next){
  if (req.token) {
    var decoded = authUtils.verifyToken(req.token);

    if (decoded === false) {
      // Token invalid / expired / etc
      res.status(400).json({
	error: {
	  status: 400,
	  code: 'USR_02',
	  message: 'Access Unauthorized.'
	}
      });
    } else {
      req['customerData'] = decoded;
      next();
    }
  } else {
    // Token not specified
    res.status(400).json({
      error: {
	status: 400,
	code: 'USR_01',
	message: 'Authorization code is empty.'
      }
    });
  }
};


