var Shipping = require('../db/models/shipping');


/* Return shippings regions */
exports.getShippingRegions = function(req, res) {
  Shipping.getShippingRegions().then(function(data) {
    res.json(data);
  });
};

/* Return shippings regions */
exports.getShippingRegionById = function(req, res) {
  Shipping.getShippingRegionById(req.params.shippingRegionId).then(function(data) {
    res.json(data);
  });
};
