

/* This method receive a front-end payment and create a chage. */
exports.createCharge = function(req, res) {
  res.render('index', { title: 'This method receive a front-end payment and create a chage.' });
};

/* Endpoint that provide a synchronization */
exports.handleWebhooks = function(req, res) {
  res.render('index', { title: 'Endpoint that provide a synchronization' });
};
