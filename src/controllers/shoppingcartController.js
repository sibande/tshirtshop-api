

/* Generete the unique CART ID */
exports.generateUniqueId = function(req, res) {
  res.render('index', { title: 'Generete the unique CART ID' });
};

/* Add a Product in the cart */
exports.addProductToCart = function(req, res) {
  res.render('index', { title: 'Add a Product in the cart' });
};

/* Get List of Products in Shopping Cart */
exports.getCartProductList = function(req, res) {
  res.render('index', { title: 'Get List of Products in Shopping Cart' });
};

/* Update the cart by item */
exports.updateCartByItem = function(req, res) {
  res.render('index', { title: 'Update the cart by item' });
};

/* Empty cart */
exports.emptyCartById = function(req, res) {
  res.render('index', { title: 'Empty cart' });
};

/* Move a product to cart */
exports.moveProductToCart = function(req, res) {
  res.render('index', { title: 'Move a product to cart' });
};

/* Return a total Amount from Cart */
exports.getCartTotalAmount = function(req, res) {
  res.render('index', { title: 'Return a total Amount from Cart' });
};

/* Save a Product for later */
exports.saveProductForLater = function(req, res) {
  res.render('index', { title: 'Save a Product for later' });
};

/* Get Products saved for later */
exports.getProductsSavedForLater = function(req, res) {
  res.render('index', { title: 'Get Products saved for later' });
};

/* Remove a product in the cart */
exports.removeProductFromCart = function(req, res) {
  res.render('index', { title: 'Remove a product in the cart' });
};

