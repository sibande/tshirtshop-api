const { validationResult } = require('express-validator/check');

var response = require('./../utils/response.js');
var Customer = require('../db/models/customer');
var forms = require('../forms/forms');


/* Update a customer */
exports.updateCustomer = function(req, res) {
  Customer.updateCustomer(
    req.customerData.id,
    req.body.name,
    req.body.email,
    req.body.password || null,
    req.body.day_phone,
    req.body.eve_phone,
    req.body.mob_phone
  ).then(function(data) {
    res.json(data);
  });
};

/* Get a customer by ID. The customer is getting by Token. */
exports.getCustomer = function(req, res) {
  Customer.getCustomerInfoById(req.customerData.id).then(function(data) {
      res.json(data);
    });
};

/* Register a Customer */
exports.registerCustomer = function(req, res) {
  var error = forms.validateForm(forms.registerConstraints, req.body);

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Customer.registerCustomer(req.body.name, req.body.email, req.body.password).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Sign in in the Shopping. */
exports.loginCustomer = function(req, res) {
  var error = forms.validateForm(forms.loginConstraints, req.body);

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Customer.loginCustomer(req.body.email, req.body.password).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Sign in with a facebook login token. */
exports.facebookLoginCustomer = function(req, res) {
  var error = forms.validateForm(forms.facebookLoginConstraints, req.body);

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Customer.facebookLoginCustomer(req.body.access_token).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Update the address from customer */
exports.updateCustomerAddress = function(req, res) {
  Customer.updateCustomerAddress(
    req.customerData.id,
    req.body.address_1,
    req.body.address_2,
    req.body.city,
    req.body.region,
    req.body.postal_code,
    req.body.country,
    req.body.shipping_region_id
  ).then(function(data) {
    res.json(data);
  });
};

/* Update credit card */
exports.updateCustomerCreditCard = function(req, res) {
  Customer.updateCustomerCreditCard(req.customerData.id, req.body.credit_card).then(function(data) {
    res.json(data);
  });
};

