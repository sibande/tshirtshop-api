var response = require('./../utils/response.js');
var StripePayment = require('../db/models/stripe');
var forms = require('../forms/forms');


/* This method receive a front-end payment and create a chage. */
exports.createCharge = function(req, res) {
  var error = forms.validateForm(forms.stripeConstraints, req.body, 'STP');

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  StripePayment.chargeOrder(
    req.body.order_id, req.body.stripeToken, req.body.amount,
    req.body.description, req.body.currency).then(function(data) {
      response.sendResponse(data, req, res);
    });
};

/* Endpoint that provide a synchronization */
exports.handleWebhooks = function(req, res) {
  response.sendResponse({ title: 'Endpoint that provide a synchronization' }, req, res);
};
