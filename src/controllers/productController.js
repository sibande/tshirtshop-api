var Product = require('../db/models/product');


/* Get All Products */
exports.getProducts = function(req, res) {
  Product.getProducts(
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      res.json(data);
  });
};

/* Search products */
exports.searchProducts = function(req, res) {
  Product.searchProducts(
    req.query.query_string,
    req.query.all_words,
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      res.json(data);
  });
};

/* Product by ID */
exports.getProductById = function(req, res) {
  Product.getProductInfoById(req.params.productId).then(function(data) {
    res.json(data);
  });
};

/* Get a lit of Products of Categories */
exports.getCategoryProducts = function(req, res) {
  Product.getCategoryProducts(
    req.params.categoryId,
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      res.json(data);
  });
};

/* Get a list of Products on Department */
exports.getDepartmentProducts = function(req, res) {
  Product.getDepartmentProducts(
    req.params.departmentId,
    req.query.page,
    req.query.limit,
    req.query.description_length).then(function(data) {
      res.json(data);
  });
};

/* Get details of a Product */
exports.getProductDetails = function(req, res) {
  Product.getProductDetailsById(req.params.productId).then(function(data) {
    res.json(data);
  });
};

/* Get locations of a Product */
exports.getProductLocations = function(req, res) {
  Product.getProductLocations(req.params.productId).then(function(data) {
    res.json(data);
  });
};

/* Get reviews of a Product */
exports.getProductReviews = function(req, res) {
  Product.getProductReviews(req.params.productId).then(function(data) {
    res.json(data);
  });
};

/* Add Product Review */
exports.addProductReviews = function(req, res) {
  Product.addProductReviews(
    1 /* FIXME */, req.params.productId, req.body.review, req.body.rating).then(function(data) {
    res.json(data);
  });
};
