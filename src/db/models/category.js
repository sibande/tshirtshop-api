var db = require('../index');

exports.getCategoryList = function() {
  return db.knex.raw('CALL catalog_get_categories();').then(function(data) {
    data = data[0][0];
    return {count: data.length, rows: data};
  }).catch(function(reason) {
    return {};
  });
};

exports.getCategoryById = function(categoryId) {
  return db.knex.raw('CALL catalog_get_category_details(?);', [categoryId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The category with this ID does not exist.';
    }
    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'CAT_01',
	message: reason
      }
    };
  });
};

exports.getProductCategories = function(productId) {
  return db.knex.raw('CALL catalog_get_categories_for_product(?);', [productId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {};
  });
};

exports.getDepartmentCategories = function(departmentId) {
  return db.knex.raw('CALL catalog_get_department_categories(?);', [departmentId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {};
  });
};

