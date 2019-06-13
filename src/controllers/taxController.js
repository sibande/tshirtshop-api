var Tax = require('../db/models/tax');
var response = require('./../utils/response.js');


/* Get All Taxes */
exports.getTaxes = function(req, res) {
  Tax.getTaxes().then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get Tax by ID */
exports.getTaxById = function(req, res) {
  Tax.getTaxById(req.params.tax_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};
