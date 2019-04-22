var Customer = require('../db/models/customer');

/* Update a customer */
exports.updateCustomer = function(req, res) {
  res.render('index', { title: 'Update a customer' });
};

/* Get a customer by ID. The customer is getting by Token. */
exports.getCustomer = function(req, res) {
  res.render('index', { title: 'Get a customer by ID. The customer is getting by Token.' });
};

/* Register a Customer */
exports.registerCustomer = function(req, res) {
  Customer.registerCustomer(
    req.body.name, req.body.email, req.body.password).then(function(data) {
      res.json(data);
    });
};

/* Sign in in the Shopping. */
exports.loginCustomer = function(req, res) {
  Customer.loginCustomer(req.body.email, req.body.password).then(function(data) {
    res.json(data);
  });
};

/* Sign in with a facebook login token. */
exports.facebookLoginCustomer = function(req, res) {
  Customer.facebookLoginCustomer(req.body.access_token).then(function(data) {
    res.json(data);
  });
};

/* Update the address from customer */
exports.updateCustomerAddress = function(req, res) {
  res.render('index', { title: 'Update the address from customer' });
};

/* Update credit card */
exports.updateCustomerCreditCard = function(req, res) {
  res.render('index', { title: 'Update credit card' });
};

