var StripePayment = require('../db/models/stripe');



/* This method receive a front-end payment and create a chage. */
exports.createCharge = function(req, res) {
  console.log(req.body);
  StripePayment.chargeOrder(
    req.body.order_id, req.body.stripeToken, req.body.amount,
    req.body.description, req.body.currency).then(function(data) {
      res.json(data);
    });
};

/* Endpoint that provide a synchronization */
exports.handleWebhooks = function(req, res) {
  res.render('index', { title: 'Endpoint that provide a synchronization' });
};
