var express = require('express');
var multer  = require('multer');
var upload = multer();

var router = express.Router();

var shoppingcartController = require('../controllers/shoppingcartController');


/* Generete the unique CART ID */
router.get('/generateUniqueId', shoppingcartController.generateUniqueId);

/* Add a Product in the cart */
router.post('/add', upload.none(), shoppingcartController.addProductToCart);

/* Get List of Products in Shopping Cart */
router.get('/:cartId([a-zA-Z0-9]+)', shoppingcartController.getCartProductList);

/* Update the cart by item */
router.put('/update/:itemId([0-9]+)', upload.none(), shoppingcartController.updateCartByItem);

/* Empty cart */
router.delete('/empty/:cartId([a-zA-Z0-9]+)', shoppingcartController.emptyCartById);

/* Move a product to cart */
router.get('/moveToCart/:itemId([0-9]+)', shoppingcartController.moveProductToCart);

/* Return a total Amount from Cart */
router.get('/totalAmount/:cartId([a-zA-Z0-9]+)', shoppingcartController.getCartTotalAmount);

/* Save a Product for later */
router.get('/saveForLater/:itemId([0-9]+)', shoppingcartController.saveProductForLater);

/* Get Products saved for later */
router.get('/getSaved/:cartId([a-zA-Z0-9]+)', shoppingcartController.getProductsSavedForLater);

/* Remove a product in the cart */
router.delete('/removeProduct/:itemId([0-9]+)', shoppingcartController.removeProductFromCart);


module.exports = router;
