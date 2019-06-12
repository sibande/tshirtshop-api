var response = require('./../utils/response.js');
var Order = require('../db/models/order');
var forms = require('../forms/forms');

/* Create a Order */
exports.createOrder = function(req, res) {
  var error = forms.validateForm(forms.orderConstraints, req.body);

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Order.createOrder(
    req.customerData.id, req.body.cart_id, req.body.shipping_id, req.body.tax_id).then(function(data) {
      response.sendResponse(data, req, res);
  });
};

/* Get Info about Order */
exports.getOrderInfo = function(req, res) {
  Order.getOrderInfo(req.params.order_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get orders by Customer */
exports.getCustomerOrders = function(req, res) {
  Order.getCustomerOrders(req.customerData.id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get Info about Order */
exports.getOrderDetails = function(req, res) {
  Order.getOrderDetails(req.params.orderId).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

