var Attribute = require('../db/models/attribute');


/* Get Attribute list */
exports.getAttributes = function(req, res) {
  Attribute.getAttributes().then(function(data) {
    res.json(data);
  });
};

/* Get Attribute by ID */
exports.getAttributeById = function(req, res) {
  Attribute.getAttributeById(req.params.attributeId).then(function(data) {
    res.json(data);
  });
};

/* Get Values Attribute from Atribute */
exports.getAttributeValues = function(req, res) {
  Attribute.getAttributeValues(req.params.attributeId).then(function(data) {
    res.json(data);
  });
};

/* Get all Attributes with Produt ID */
exports.getProductAttributes = function(req, res) {
  Attribute.getProductAttributes(req.params.productId).then(function(data) {
    res.json(data);
  });
};

