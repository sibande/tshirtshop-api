const { validationResult } = require('express-validator/check');

var response = require('./../utils/response.js');
var Customer = require('../db/models/customer');

/* Update a customer */
exports.updateCustomer = function(req, res) {
  Customer.updateCustomer(
    req.customerData.id,
    req.body.name,
    req.body.email,
    req.body.password,
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return response.sendValidateResponse(errors, 'USR', req, res);
  }

  Customer.registerCustomer(
    req.body.name, req.body.email, req.body.password).then(function(data) {
      res.json(data);
    });
};

/* Sign in in the Shopping. */
exports.loginCustomer = function(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return response.sendValidateResponse(errors, 'USR', req, res);
  }

  Customer.loginCustomer(req.body.email, req.body.password).then(function(data) {
    response.sendResponse(data, req, res);
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

