var fetch = require('node-fetch');

var db = require('../index');

exports.createOrder = function(customerId, cartId, shippingId, taxId) {
  return db.knex.raw(
    'CALL shopping_cart_create_order(?, ?, ?, ?);',
    [cartId, customerId, shippingId, taxId]).then(function(data) {
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

exports.getOrderInfo = function(orderId) {
  // FIXME check ownership of order
  return db.knex.raw(
    'CALL orders_get_order_info(?);', [orderId]).then(function(data) {
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

exports.getOrderDetails = function(orderId) {
  // FIXME check ownership of order
  return db.knex.raw(
    'CALL orders_get_order_short_details(?);', [orderId]).then(function(data) {
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
