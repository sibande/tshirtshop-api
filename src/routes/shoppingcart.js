var express = require('express');
var multer  = require('multer');
var upload = multer();

var router = express.Router();

var shoppingcartController = require('../controllers/shoppingcartController');


/**
 * @swagger
 * tags:
 *   - name: shoppingcart
 *     description: Everything about shopping cart
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     CartWithProduct:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Product'
 */


/**
 * Generete the unique cart id
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/generateUniqueId:
 *     get:
 *       summary: Generete the unique cart id
 *       description: Generete the unique cart id
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Json Object with unique Cart ID
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   cart_id:
 *                     type: string
 *                     example: 2PzavCD7BKG0
 */
router.get('/generateUniqueId', shoppingcartController.generateUniqueId);


/**
 * Add a Product in the cart
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/add:
 *     post:
 *       summary: Add a Product in the cart
 *       description: Add a Product in the cart
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 cart_id:
 *                   description: Cart ID
 *                   type: string
 *                 product_id:
 *                   description: Product ID
 *                   type: integer
 *                 attributes:
 *                   description: Attributes
 *                   type: string
 *               required:
 *                 - cart_id
 *                 - product_id
 *                 - attributes
 *       responses:
 *         200:
 *           description: Return a array of products in the cart
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CartWithProduct'
 *         400:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *           examples:
 *             User Key empty:
 *               status: 401
 *               code: AUT_01
 *               message: Authorization code is empty.
 *             User Key invalid:
 *               status: 401
 *               code: AUT_02
 *               message: Access Unauthorized.
 *             Empty cart id:
 *               code: CRT_02
 *               message: Cart id can't be blank
 *               field: cart_id
 *               status: 400
 *             Empty product id:
 *               code: CRT_02
 *               message: Product id can't be blank
 *               field: product_id
 *               status: 400
 *             Invalid product id:
 *               code: CRT_03
 *               message: Product id is not a number
 *               field: product_id
 *               status: 400
 *             Empty attributes:
 *               code: CRT_02
 *               message: Attributes can't be blank
 *               field: attributes
 *               status: 400
 */
router.post('/add', upload.none(), shoppingcartController.addProductToCart);


/**
 * Get List of Products in Shopping Cart
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/{cart_id}:
 *     get:
 *       summary: Get List of Products in Shopping Cart
 *       description: Get List of Products in Shopping Cart
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: cart_id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Return a array of products in the cart.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CartWithProduct'
 */
router.get('/:cart_id([a-zA-Z0-9]+)', shoppingcartController.getCartProductList);

/* Update the cart by item */

/**
 * Update the cart by item
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/update/{item_id}:
 *     put:
 *       summary: Update the cart by item
 *       description: Update the cart by item
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: item_id
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 quantity:
 *                   description: Item Quantity
 *                   type: integer
 *               required:
 *                 - quantity
 *       responses:
 *         200:
 *           description: Return a array of products in the cart.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CartWithProduct'
 *         400:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *           examples:
 *             Empty quantity:
 *               code: CRT_02
 *               message: Quantity can't be blank
 *               field: quantity
 *               status: 400
 *             Invalid quantity:
 *               code: CRT_03
 *               message: Quantity is not a number
 *               field: quantity
 *               status: 400
 */
router.put('/update/:item_id([0-9]+)', upload.none(), shoppingcartController.updateCartByItem);


/**
 * Empty cart
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/empty/{cart_id}:
 *     delete:
 *       summary: Empty cart
 *       description: Empty cart
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: cart_id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Return a empty Array.
 */
router.delete('/empty/:cart_id([a-zA-Z0-9]+)', shoppingcartController.emptyCartById);


/**
 * Move a product to cart
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/moveToCart/{item_id}:
 *     get:
 *       summary: Move a product to cart
 *       description: Move a product to cart
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: item_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: No data.
 */
router.get('/moveToCart/:item_id([0-9]+)', shoppingcartController.moveProductToCart);


/**
 * Return a total Amount from Cart
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/totalAmount/{cart_id}:
 *     get:
 *       summary: Return a total Amount from Cart
 *       description: Return a total Amount from Cart
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: cart_id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Return the total amount
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   total_amount:
 *                     type: string
 *                     example: "20.00"
 */
router.get('/totalAmount/:cart_id([a-zA-Z0-9]+)', shoppingcartController.getCartTotalAmount);


/**
 * Save a Product for later
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/saveForLater/{item_id}:
 *     get:
 *       summary: Save a Product for later
 *       description: Save a Product for later
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: item_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: No data.
 */
router.get('/saveForLater/:item_id([0-9]+)', shoppingcartController.saveProductForLater);

/* Get Products saved for later */
/**
 * Get Products saved for later
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/getSaved/{cart_id}:
 *     get:
 *       summary: Get Products saved for later
 *       description: Get Products saved for later
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: cart_id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Return a object of item salved.
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   item_id:
 *                     type: string
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Haute Couture
 *                   attributes:
 *                     type: string
 *                     example: "{}"
 *                   image:
 *                     type: string
 *                     example: haute-couture-thumbnail.gif
 *                   price:
 *                     type: string
 *                     example: "14.95"
 */
router.get('/getSaved/:cart_id([a-zA-Z0-9]+)', shoppingcartController.getProductsSavedForLater);


/**
 * Remove a product in the cart
 *
 *
 * @swagger
 * paths:
 *   /shoppingcart/removeProduct/{item_id}:
 *     delete:
 *       summary: Remove a product in the cart
 *       description: Remove a product in the cart
 *       tags: [shoppingcart]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: item_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: No data.
 */
router.delete('/removeProduct/:item_id([0-9]+)', shoppingcartController.removeProductFromCart);


module.exports = router;
