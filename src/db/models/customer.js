var fetch = require('node-fetch');
var mailgun = require("mailgun-js");

var db = require('../index');
var authUtils = require('../../utils/auth');

var mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});


exports.getCustomerInfoByEmail = function(email) {
  return db.knex.raw('CALL customer_get_login_info(?);', [email]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The email is invalid.';
    }

    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'USR_01',
	message: reason
      }
    };
  });
};

exports.updateCustomer = function(customerId, name, email, password, dayPhone, evePhone, mobPhone) {
  if (password) {
    password = authUtils.getSHA1(password);
  }

  return db.knex.raw(
    'CALL customer_update_account(?, ?, ?, ?, ?, ?, ?);',
    [customerId, name, email, password, dayPhone, evePhone, mobPhone]).then(function(data) {
      return exports.getCustomerInfoById(customerId);
    }).catch(function(reason) {
      return {
	error: {
	  status: 400,
	  code: 'USR_01',
	  message: reason
	}
      };
    });
};

exports.updateCustomerAddress = function(customerId, address1, address2, city, region, postalCode,
					 country, shippingRegionId) {
  return db.knex.raw(
    'CALL customer_update_address(?, ?, ?, ?, ?, ?, ?, ?);',
    [customerId, address1, address2, city, region, postalCode, country, shippingRegionId]).then(function(data) {

      return exports.getCustomerInfoById(customerId);
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'USR_01',
	message: reason
      }
    };
  });
};

exports.updateCustomerCreditCard = function(customerId, creditCard) {
  return db.knex.raw('CALL customer_update_credit_card(?, ?);', [customerId, creditCard]).then(function(data) {
      return exports.getCustomerInfoById(customerId);
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'USR_01',
	message: reason
      }
    };
  });
};

exports.getCustomerInfoById = function(customerId) {
  return db.knex.raw('CALL customer_get_customer(?);', [customerId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The customer with this ID does not exist.';
    }
    data = data[0];
    delete data['password'];

    return data;
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'USR_01',
	message: reason
      }
    };
  });
};

function _registerCustomer(name, email, password) {
  return db.knex.raw(
    'CALL customer_add(?, ?, ?);',
    [name, email, password]).then(function(data) {
      data = data[0][0];

      return exports.getCustomerInfoByEmail(email).then(function(data) {
	/* FIXME */

	return exports.getCustomerInfoById(data.customer_id).then(function(data) {
	  var mailData = {
	    from: process.env.FROM_EMAIL_ADDRESS,
	    to: data.email,
	    subject: 'Your account has been created',
	    text: 'Your account has been created'
	  };
	  mg.messages().send(mailData, function (error, body) {
	  });

	  return {
	    customer: data,
	    accessToken: 'Bearer ' + authUtils.generateToken({
	      id: data.customer_id,
	      name: data.name,
	      email: data.email
	    }),
	    expires_in: '24h'
	  };
	});
      });
    }).catch(function(reason) {
      return {
	error: {
	  status: 400,
	  code: 'USR_01',
	  message: reason
	}
      };
    });
}

exports.registerCustomer = async function(name, email, password) {
  var existingCustomer = await exports.getCustomerInfoByEmail(email);

  if (!('error' in existingCustomer)) {  // FIXME
    return Promise.resolve({
	error: {
	  status: 400,
	  field: 'email',
	  code: 'USR_01',
	  message: 'The email already exists.'
	}
    });
  }

  password = authUtils.getSHA1(password);

  return _registerCustomer(name, email, password);
};

async function _loginCustomer(email, password) {
  var customer = await exports.getCustomerInfoByEmail(email);

  if ('error' in customer || customer.password !== password) {  // FIXME
    return Promise.resolve({
	error: {
	  status: 400,
	  code: 'USR_01',
	  message: 'Email or Password is invalid.'
	}
    });
  }

  return exports.getCustomerInfoById(customer.customer_id).then(function(data) {
    /* FIXME handle possible error */
    return {
      customer: data,
      accessToken: 'Bearer ' + authUtils.generateToken({
	id: data.customer_id,
	name: data.name,
	email: data.email
      }),
      expires_in: '24h'
    };
  });
}

exports.loginCustomer = function(email, password) {
  password = authUtils.getSHA1(password);

  return _loginCustomer(email, password);
};


exports.facebookLoginCustomer = async function(accessToken) {
  var appAccessToken = process.env.FB_APP_ID + '|' + process.env.FB_SECRET;

  var verifyApi = 'https://graph.facebook.com/debug_token?input_token=' + accessToken
      + '&access_token=' + appAccessToken;

  return fetch(verifyApi, {method: 'GET'}).then(function(res) {
    return res.json();
  }).then(function(body) {
    var fbAppId = body.data.app_id,
	fbIsValid = body.data.is_valid,
	fbUserId = body.data.user_id;

    if (fbAppId !== process.env.FB_APP_ID || !fbIsValid) {
      return Promise.resolve({
	error: {
	  status: 400,
	  code: 'USR_01',
	  message: 'Facebook login failed.'
	}
      });
    }

    var detailsApi = 'https://graph.facebook.com/' + fbUserId + '?fields=id,email,name,picture&access_token='
	+ appAccessToken;

    return fetch(detailsApi, {method: 'GET'}).then(function(res) {
      return res.json();
    }).then(function(body) {

      if (!('email' in body)) {
	throw 'Please add (or verify) your email to your profile or make it public.';
      }

      return exports.getCustomerInfoByEmail(body.email).then(function(customer) {
	if ('error' in customer) {  // The customer is new
	  return _registerCustomer(body.name, body.email, 'facebook');
	} else {
	  return _loginCustomer(body.email, 'facebook');
	}
      });
    });

  });
};

