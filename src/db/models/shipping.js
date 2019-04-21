var db = require('../index');


exports.getShippingRegions = function() {
  return db.knex.raw('CALL customer_get_shipping_regions();').then(function(data) {
    data = data[0][0];
    return {count: data.length, rows: data};
  }).catch(function(reason) {
    return {};
  });
};

exports.getShippingRegionById = function(shippingRegionId) {
  return db.knex.raw('CALL orders_get_shipping_info(?);', [shippingRegionId]).then(function(data) {
    console.log(data[0]);
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The shipping region with this ID does not exist.';
    }
    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'REG_01',
	message: reason
      }
    };
  });
};

