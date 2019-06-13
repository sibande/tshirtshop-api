var Attribute = require('../db/models/attribute');
var response = require('./../utils/response.js');


/* Get Attribute list */
exports.getAttributes = function(req, res) {
  Attribute.getAttributes().then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get Attribute by ID */
exports.getAttributeById = function(req, res) {
  Attribute.getAttributeById(req.params.attribute_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get Values Attribute from Atribute */
exports.getAttributeValues = function(req, res) {
  Attribute.getAttributeValues(req.params.attribute_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get all Attributes with Produt ID */
exports.getProductAttributes = function(req, res) {
  Attribute.getProductAttributes(req.params.product_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

