var Product = require('../db/models/product');
var response = require('./../utils/response.js');
var forms = require('../forms/forms');


/* Get All Products */
exports.getProducts = function(req, res) {
  Product.getProducts(
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      response.sendResponse(data, req, res);
  });
};

/* Search products */
exports.searchProducts = function(req, res) {
  var error = forms.validateForm(forms.searchConstraints, req.query, 'PRD');

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Product.searchProducts(
    req.query.query_string,
    req.query.all_words,
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      response.sendResponse(data, req, res);
  });
};

/* Product by ID */
exports.getProductById = function(req, res) {
  Product.getProductInfoById(req.params.product_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get a lit of Products of Categories */
exports.getCategoryProducts = function(req, res) {
  Product.getCategoryProducts(
    req.params.category_id,
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      response.sendResponse(data, req, res);
  });
};

/* Get a list of Products on Department */
exports.getDepartmentProducts = function(req, res) {
  Product.getDepartmentProducts(
    req.params.department_id,
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      response.sendResponse(data, req, res);
  });
};

/* Get details of a Product */
exports.getProductDetails = function(req, res) {
  Product.getProductDetailsById(req.params.product_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get locations of a Product */
exports.getProductLocations = function(req, res) {
  Product.getProductLocations(req.params.product_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get reviews of a Product */
exports.getProductReviews = function(req, res) {
  Product.getProductReviews(req.params.product_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Add Product Review */
exports.addProductReviews = function(req, res) {
  var error = forms.validateForm(forms.reviewConstraints, req.query, 'PRD');

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Product.addProductReviews(
    1 /* FIXME */, req.params.product_id, req.body.review, req.body.rating).then(function(data) {
    response.sendResponse(data, req, res);
  });
};
