var randomstring = require("randomstring");

var db = require('../index');


exports.generateUniqueId = function() {
  var uniqueId =  randomstring.generate(12);

  return db.knex.raw(
    'SELECT cart_id FROM shopping_cart WHERE cart_id = ? LIMIT 1;', [uniqueId]).then(function(data) {

      if (data[0].length === 0) {
	// Uniqueid is valid
	return {cart_id: uniqueId};  // FIXME cache value
      }

      return exports.generateUniqueId();
    }).catch(function(reason) {

      return {
	error: {
	  status: 400,
	  code: 'CRT_01',
	  message: reason
	}
      };
    });
};

exports.getCartProductList = function(cartId) {
  return db.knex.raw('CALL shopping_cart_get_products(?);', [cartId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};

exports.addProductToCart = function(cartId, productId, attributes) {
  try {
    attributes = JSON.parse(attributes);
  } catch {
    attributes = {};
  }
  attributes = JSON.stringify(attributes);

  return db.knex.raw(
    'CALL shopping_cart_add_product(?, ?, ?);',
    [cartId, productId, attributes]).then(function(data) {
      return exports.getCartProductList(cartId);
    }).catch(function(reason) {
      return {
	error: {
	  status: 400,
	  code: 'CRT_01',
	  message: reason
	}
      };
    });
};

exports.updateCartByItem = function(itemId, quantity) {
  return db.knex.raw('CALL shopping_cart_update(?, ?);', [itemId, quantity]).then(function(data) {
    return db.knex.raw(
      'SELECT cart_id FROM shopping_cart WHERE item_id = ? LIMIT 1;', [itemId]).then(function(data) {
	return exports.getCartProductList(data[0][0].cart_id);
      });
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};

exports.emptyCartById = function(cartId) {
  return db.knex.raw('CALL shopping_cart_empty(?);', [cartId]).then(function(data) {
    return ;
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};


exports.moveProductToCart = function(itemId) {
  return db.knex.raw('CALL shopping_cart_move_product_to_cart(?);', [itemId]).then(function(data) {
    return ;
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};

exports.saveProductForLater = function(itemId) {
  return db.knex.raw('CALL shopping_cart_save_product_for_later(?);', [itemId]).then(function(data) {
    return ;
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};

exports.getProductsSavedForLater = function(cartId) {
  return db.knex.raw('CALL shopping_cart_get_saved_products(?);', [cartId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};


exports.getCartTotalAmount = function(cartId) {
  return db.knex.raw('CALL shopping_cart_get_total_amount(?);', [cartId]).then(function(data) {
    data = data[0][0];
    return data;
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};


exports.removeProductFromCart = function(itemId) {
  return db.knex.raw('CALL shopping_cart_remove_product(?);', [itemId]).then(function(data) {
    return ;
  }).catch(function(reason) {
    return {
      error: {
	status: 400,
	code: 'CRT_01',
	message: reason
      }
    };
  });
};
