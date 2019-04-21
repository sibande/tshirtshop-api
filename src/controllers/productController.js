

/* Get All Products */
exports.getProducts = function(req, res) {
  res.render('index', { title: 'Get All Products' });
};

/* Search products */
exports.searchProducts = function(req, res) {
  res.render('index', { title: 'Search products' });
};

/* Product by ID */
exports.getProductById = function(req, res) {
  res.render('index', { title: 'Product by ID' });
};

/* Get a lit of Products of Categories */
exports.getCategoryProducts = function(req, res) {
  res.render('index', { title: 'Get a lit of Products of Categories' });
};

/* Get a list of Products on Department */
exports.getDepartmentProducts = function(req, res) {
  res.render('index', { title: 'Get a list of Products on Department' });
};

/* Get details of a Product */
exports.getProductDetails = function(req, res) {
  res.render('index', { title: 'Get details of a Product' });
};

/* Get locations of a Product */
exports.getProductLocations = function(req, res) {
  res.render('index', { title: 'Get locations of a Product' });
};

/* Get reviews of a Product */
exports.getProductReviews = function(req, res) {
  res.render('index', { title: 'Get reviews of a Product' });
};

/* Add Product Review */
exports.addProductReviews = function(req, res) {
  res.render('index', { title: 'Add Product Review' });
};
