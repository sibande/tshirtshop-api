

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
  res.render('index', { title: 'Register a Customer' });
};

/* Sign in in the Shopping. */
exports.loginCustomer = function(req, res) {
  res.render('index', { title: 'Sign in in the Shopping.' });
};

/* Sign in with a facebook login token. */
exports.facebookLoginCustomer = function(req, res) {
  res.render('index', { title: 'Sign in with a facebook login token.' });
};

/* Update the address from customer */
exports.updateCustomerAddress = function(req, res) {
  res.render('index', { title: 'Update the address from customer' });
};

/* Update credit card */
exports.updateCustomerCreditCard = function(req, res) {
  res.render('index', { title: 'Update credit card' });
};

