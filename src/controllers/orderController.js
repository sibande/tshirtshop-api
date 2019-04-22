var Order = require('../db/models/order');


/* Create a Order */
exports.createOrder = function(req, res) {
  Order.createOrder(
    req.customerData.id, req.body.cart_id, req.body.shipping_id, req.body.tax_id).then(function(data) {
      res.json(data);
  });
};

/* Get Info about Order */
exports.getOrderInfo = function(req, res) {
  Order.getOrderInfo(req.params.orderId).then(function(data) {
    res.json(data);
  });
};

/* Get orders by Customer */
exports.getCustomerOrders = function(req, res) {
  Order.getCustomerOrders(req.customerData.id).then(function(data) {
    res.json(data);
  });
};

/* Get Info about Order */
exports.getOrderDetails = function(req, res) {
  Order.getOrderDetails(req.params.orderId).then(function(data) {
    res.json(data);
  });
};

