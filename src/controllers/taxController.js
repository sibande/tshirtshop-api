var Tax = require('../db/models/tax');

/* Get All Taxes */
exports.getTaxes = function(req, res) {
  Tax.getTaxes().then(function(data) {
    res.json(data);
  });
};

/* Get Tax by ID */
exports.getTaxById = function(req, res) {
  Tax.getTaxById(req.params.taxId).then(function(data) {
    res.json(data);
  });
};
