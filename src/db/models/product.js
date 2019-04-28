var db = require('../index');


exports.getProducts = function(page, limit, descriptionLength) {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  descriptionLength = parseInt(descriptionLength) || 200;
  var startItem = (page - 1) * limit;

  return db.knex.raw('CALL catalog_count_products_on_catalog();', []).then(function(data) {
    var productsCount = data[0][0][0]['products_on_catalog_count'];
    return db.knex.raw(
      'CALL catalog_get_products_on_catalog(?, ?, ?);',
      [descriptionLength, limit, startItem]).then(function(data) {
	data = data[0][0];
	return {count: productsCount, rows: data};
      }).catch(function(reason) {
	return {};
      });
  });
};

exports.searchProducts = function(searchString, allWords, page, limit, descriptionLength) {
  if (searchString === undefined || searchString === '') {  // Query string is a required field
    return Promise.resolve({
      error: {
	status: 400,
	code: 'PRO_01',
	message: 'A search string is required.'
      }
    });
  }
  
  allWords = allWords === 'yes' ? allWords : 'no';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  descriptionLength = parseInt(descriptionLength) || 200;
  var startItem = (page - 1) * limit;
  return db.knex.raw(
    'CALL catalog_count_search_result(?, ?);', [searchString, allWords]).then(function(data) {
      var productsCount = data[0][0][0]['count(*)'];
      return db.knex.raw(
	'CALL catalog_search(?, ?, ?, ?, ?);',
	[searchString, allWords, descriptionLength, limit, startItem]).then(function(data) {
	  data = data[0][0];
	  return {count: productsCount, rows: data};
	}).catch(function(reason) {
	  return {};
	});
    });
};

exports.getProductDetailsById = function(productId) {
  return db.knex.raw('CALL catalog_get_product_details(?);', [productId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The product with this ID does not exist.';
    }
    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'PRO_01',
	message: reason
      }
    };
  });
};

exports.getProductInfoById = function(productId) {
  return db.knex.raw('CALL catalog_get_product_info(?);', [productId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The product with this ID does not exist.';
    }
    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'PRO_01',
	message: reason
      }
    };
  });
};

exports.getCategoryProducts = function(categoryId, page, limit, descriptionLength) {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  descriptionLength = parseInt(descriptionLength) || 200;
  var startItem = (page - 1) * limit;
  return db.knex.raw(
    'CALL catalog_count_products_in_category(?);', [categoryId]).then(function(data) {
      var productsCount = data[0][0][0]['categories_count'];

      return db.knex.raw(
	'CALL catalog_get_products_in_category(?, ?, ?, ?);',
	[categoryId, descriptionLength, limit, startItem]).then(function(data) {
	  data = data[0][0];
	  return {count: productsCount, rows: data};
	}).catch(function(reason) {
	  return {};
	});
    });
};

exports.getDepartmentProducts = function(departmentId, page, limit, descriptionLength) {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  descriptionLength = parseInt(descriptionLength) || 200;
  var startItem = (page - 1) * limit;

  return db.knex.raw(
    'CALL catalog_count_products_on_department(?);', [departmentId]).then(function(data) {
      var productsCount = data[0][0][0]['products_on_department_count'];

      return db.knex.raw(
	'CALL catalog_get_products_on_department(?, ?, ?, ?);',
	[departmentId, descriptionLength, limit, startItem]).then(function(data) {
	  data = data[0][0];
	  return {count: productsCount, rows: data};
	}).catch(function(reason) {
	  return {};
	});
    });
};

exports.getProductLocations = function(productId) {
  return db.knex.raw('CALL catalog_get_product_locations(?);', [productId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {};
  });
};

exports.getProductReviews = function(productId) {
  return db.knex.raw('CALL catalog_get_product_reviews(?);', [productId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {};
  });
};

exports.addProductReviews = function(customerId, productId, review, rating) {
  return db.knex.raw(
    'CALL catalog_create_product_review(?, ?, ?, ?);',
    [customerId, productId, review, rating]).then(function(data) {
      data = data[0][0];
      return ;
    }).catch(function(reason) {
      return {};
    });
};


