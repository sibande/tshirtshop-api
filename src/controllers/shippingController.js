var Shipping = require('../db/models/shipping');
var response = require('./../utils/response.js');


/* Return shippings regions */
exports.getShippingRegions = function(req, res) {
  Shipping.getShippingRegions().then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Return shippings regions */
exports.getShippingRegionById = function(req, res) {
  Shipping.getShippingRegionById(req.params.shipping_region_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};
