var db = require('../index');


exports.getTaxes = function() {
  return db.knex.raw('CALL tax_get_taxes();').then(function(data) {
    data = data[0][0];
    return {count: data.length, rows: data};
  }).catch(function(reason) {
    return {};
  });
};

exports.getTaxById = function(taxId) {
  return db.knex.raw('CALL tax_get_tax_details(?);', [taxId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The tax with this ID does not exist.';
    }
    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'TAX_01',
	message: reason
      }
    };
  });
};
