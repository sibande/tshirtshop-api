

/* Create a Order */
exports.createOrder = function(req, res) {
  res.render('index', { title: 'Create a Order' });
};

/* Get Info about Order */
exports.getOrderInfo = function(req, res) {
  res.render('index', { title: 'Get Info about Order' });
};

/* Get orders by Customer */
exports.getCustomerOrders = function(req, res) {
  res.render('index', { title: 'Get orders by Customer' });
};

/* Get Info about Order */
exports.getOrderDetails = function(req, res) {
  res.render('index', { title: 'Get Info about Order' });
};

