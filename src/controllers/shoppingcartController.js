var Shoppingcart = require('../db/models/shoppingcart');


/* Generete the unique CART ID */
exports.generateUniqueId = function(req, res) {
  Shoppingcart.generateUniqueId().then(function(data) {
    res.json(data);
  });
};

/* Add a Product in the cart */
exports.addProductToCart = function(req, res) {
  Shoppingcart.addProductToCart(
    req.body.cart_id, req.body.product_id, req.body.attributes).then(function(data) {
      res.json(data);
    });
};

/* Get List of Products in Shopping Cart */
exports.getCartProductList = function(req, res) {
  Shoppingcart.getCartProductList(req.params.cartId).then(function(data) {
    res.json(data);
  });
};

/* Update the cart by item */
exports.updateCartByItem = function(req, res) {
  Shoppingcart.updateCartByItem(req.params.itemId, req.body.quantity).then(function(data) {
    res.json(data);
  });
};

/* Empty cart */
exports.emptyCartById = function(req, res) {
  Shoppingcart.emptyCartById(req.params.cartId).then(function(data) {
    res.json(data);
  });
};

/* Move a product to cart */
exports.moveProductToCart = function(req, res) {
  Shoppingcart.moveProductToCart(req.params.itemId).then(function(data) {
    res.json(data);
  });
};

/* Return a total Amount from Cart */
exports.getCartTotalAmount = function(req, res) {
  Shoppingcart.getCartTotalAmount(req.params.cartId).then(function(data) {
    res.json(data);
  });
};

/* Save a Product for later */
exports.saveProductForLater = function(req, res) {
  Shoppingcart.saveProductForLater(req.params.itemId).then(function(data) {
    res.json(data);
  });
};

/* Get Products saved for later */
exports.getProductsSavedForLater = function(req, res) {
  Shoppingcart.getProductsSavedForLater(req.params.cartId).then(function(data) {
    res.json(data);
  });
};

/* Remove a product in the cart */
exports.removeProductFromCart = function(req, res) {
  Shoppingcart.removeProductFromCart(req.params.itemId).then(function(data) {
    res.json(data);
  });
};

