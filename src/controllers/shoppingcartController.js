var Shoppingcart = require('../db/models/shoppingcart');
var response = require('./../utils/response.js');
var forms = require('../forms/forms');


/* Generete the unique CART ID */
exports.generateUniqueId = function(req, res) {
  Shoppingcart.generateUniqueId().then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Add a Product in the cart */
exports.addProductToCart = function(req, res) {
  var error = forms.validateForm(forms.cartConstraints, req.body, 'CRT');

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Shoppingcart.addProductToCart(
    req.body.cart_id, req.body.product_id, req.body.attributes).then(function(data) {
      response.sendResponse(data, req, res);
    });
};

/* Get List of Products in Shopping Cart */
exports.getCartProductList = function(req, res) {
  Shoppingcart.getCartProductList(req.params.cart_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Update the cart by item */
exports.updateCartByItem = function(req, res) {
  var error = forms.validateForm(forms.updateItemConstraints, req.body, 'CRT');

  if (error !== false) {
    return response.sendErrorResponse(error, req, res);
  }

  Shoppingcart.updateCartByItem(req.params.item_id, req.body.quantity).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Empty cart */
exports.emptyCartById = function(req, res) {
  Shoppingcart.emptyCartById(req.params.cart_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Move a product to cart */
exports.moveProductToCart = function(req, res) {
  Shoppingcart.moveProductToCart(req.params.item_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Return a total Amount from Cart */
exports.getCartTotalAmount = function(req, res) {
  Shoppingcart.getCartTotalAmount(req.params.cart_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Save a Product for later */
exports.saveProductForLater = function(req, res) {
  Shoppingcart.saveProductForLater(req.params.item_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get Products saved for later */
exports.getProductsSavedForLater = function(req, res) {
  Shoppingcart.getProductsSavedForLater(req.params.cart_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Remove a product in the cart */
exports.removeProductFromCart = function(req, res) {
  Shoppingcart.removeProductFromCart(req.params.item_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

