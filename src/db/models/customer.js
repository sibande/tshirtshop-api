var db = require('../index');
var authUtils = require('../../utils/auth');


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

exports.getCustomerInfoById = function(customerId) {
  return db.knex.raw('CALL customer_get_customer(?);', [customerId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The customer with this ID does not exist.';
    }

    return data[0];
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



exports.registerCustomer = async function(name, email, password) {
  var existingCustomer = await exports.getCustomerInfoByEmail(email);

  if (!('error' in existingCustomer)) {  // FIXME
    return Promise.resolve({
	error: {
	  status: 400,
	  code: 'USR_04',
	  message: 'The email already exists.'
	}
    });
  }
  
  return db.knex.raw(
    'CALL customer_add(?, ?, ?);',
    [name, email, authUtils.getSHA1(password)]).then(function(data) {
      data = data[0][0];

      return exports.getCustomerInfoByEmail(email).then(function(data) {
	/* FIXME */

	return exports.getCustomerInfoById(data.customer_id).then(function(data) {
	  return {
	    customer: data,
	    accessToken: authUtils.generateToken({
	      id: data.customer_id,
	      name: data.name,
	      email: data.email
	    }),
	    expires_in: '24h'
	  };
	})
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
};

exports.loginCustomer = async function(email, password) {
  var customer = await exports.getCustomerInfoByEmail(email);

  if ('error' in customer || customer.password !== authUtils.getSHA1(password)) {  // FIXME
    console.log(customer);
    console.log(authUtils.getSHA1(password))
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
      accessToken: authUtils.generateToken({
	id: data.customer_id,
	name: data.name,
	email: data.email
      }),
      expires_in: '24h'
    };
  });
};

