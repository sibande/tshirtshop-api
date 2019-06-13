var mailgun = require("mailgun-js");
var fetch = require('node-fetch');

var db = require('../index');
var mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

exports.createOrder = function(customerId, cartId, shippingId, taxId, email) {
  return db.knex.raw(
    'CALL shopping_cart_create_order(?, ?, ?, ?);',
    [cartId, customerId, shippingId, taxId]).then(function(data) {
      var mailData = {
	from: process.env.FROM_EMAIL_ADDRESS,
	to: email,
	subject: 'Order successfully placed',
	text: 'Your order has been successfully placed and will be dispatched soon as we receive payment.'
      };
      mg.messages().send(mailData, function (error, body) {
      });

      data = data[0][0];
      return data[0];
    }).catch(function(reason) {
      return {
	error: {
	  status: 400,
	  code: 'ORD_01',
	  message: reason
	}
      };
    });
};

exports.getOrderInfo = function(orderId, customerId) {
  return db.knex.raw(
    'CALL orders_get_order_info(?);', [orderId]).then(function(data) {
      data = data[0][0][0];
      if (data.customer_id != customerId) {
	return {
	  error: {
	    status: 403,
	    code: 'ORD_03',
	    message: 'Access denied'
	  }
	};
      }
      return data;
    }).catch(function(reason) {
      return {
	error: {
	  status: 400,
	  code: 'ORD_01',
	  message: reason
	}
      };
    });
};

exports.getCustomerOrders = function(customerId) {
  return db.knex.raw(
    'CALL orders_get_by_customer_id(?);', [customerId]).then(function(data) {
      data = data[0][0];
      return data;
    }).catch(function(reason) {
      return {
	error: {
	  status: 400,
	  code: 'ORD_01',
	  message: reason
	}
      };
    });
};

exports.getOrderDetails = function(orderId, customerId) {
  return db.knex.raw(
    'CALL orders_get_order_short_details(?);', [orderId]).then(function(data) {
      data = data[0][0][0];
      if (data.customer_id != customerId) {
	return {
	  error: {
	    status: 403,
	    code: 'ORD_03',
	    message: 'Access denied'
	  }
	};
      }
      return data;
    }).catch(function(reason) {
      return {
	error: {
	  status: 400,
	  code: 'ORD_01',
	  message: reason
	}
      };
    });
};
