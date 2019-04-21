var db = require('../index');


exports.getAttributes = function() {
  return db.knex.raw('CALL catalog_get_attributes();').then(function(data) {
    data = data[0][0];
    return {count: data.length, rows: data};
  }).catch(function(reason) {
    return {};
  });
};

exports.getAttributeById = function(attributeId) {
  return db.knex.raw('CALL catalog_get_attribute_details(?);', [attributeId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The attribute with this ID does not exist.';
    }
    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'ATT_01',
	message: reason
      }
    };
  });
};

exports.getAttributeValues = function(attributeId) {
  return db.knex.raw('CALL catalog_get_attribute_values(?);', [attributeId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {};
  });
};

exports.getProductAttributes = function(productId) {
  return db.knex.raw('CALL catalog_get_product_attributes(?);', [productId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {};
  });
};
