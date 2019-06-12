var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer();

var authMiddleware = require('../routes/middlewares/auth');

var orderController = require('../controllers/orderController');


/**
 * @swagger
 * tags:
 *   - name: orders
 *     description: Everything about orders
 */


/**
 * Create a Order
 *
 *
 * @swagger
 * paths:
 *   /orders:
 *     post:
 *       summary: Create a Order
 *       description: Create a Order
 *       tags: [orders]
 *       produces:
 *         - application/json
 *       security:
 *         - ApiKeyAuth: []
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
 *                 shipping_id:
 *                   description: Shipping ID
 *                   type: integer
 *                 tax_id:
 *                   description: Tax ID
 *                   type: string
 *               required:
 *                 - cart_id
 *                 - shipping_id
 *                 - tax_id
 *       responses:
 *         200:
 *           description: Return the Order ID
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   orderId:
 *                     type: integer
 *                     example: 1
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
 *               code: USR_02
 *               message: Cart id can't be blank
 *               field: cart_id
 *               status: 400
 *             Empty shipping id:
 *               code: USR_02
 *               message: Shipping id can't be blank
 *               field: shipping_id
 *               status: 400
 *             Invalid shipping id:
 *               code: USR_03
 *               message: Shipping id is not a number
 *               field: shipping_id
 *               status: 400
 *             Empty tax id:
 *               code: USR_02
 *               message: Tax id can't be blank
 *               field: tax_id
 *               status: 400
 *             Invalid tax id:
 *               code: USR_03
 *               message: Tax id is not a number
 *               field: tax_id
 *               status: 400
 */
router.post('/', [upload.none(), authMiddleware.verifyToken], orderController.createOrder);

/* Get Info about Order */

/**
 * Get Info about Order
 *
 *
 * @swagger
 * paths:
 *   /orders/{order_id}:
 *     get:
 *       summary: Get Info about Order
 *       description: Get Info about Order
 *       tags: [orders]
 *       produces:
 *         - application/json
 *       security:
 *         - ApiKeyAuth: []
 *       parameters:
 *         - in: path
 *           name: order_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Return a object of Order.
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   order_id:
 *                     type: integer
 *                     example: 1
 *                   total_amount:
 *                     type: string
 *                     example: "14.95"
 *                   created_on:
 *                     type: string
 *                     example: "2019-06-12T10:24:31.000Z"
 *                   shipped_on:
 *                     type: string
 *                     example: "2019-06-12T10:24:31.000Z"
 *                   status:
 *                     type: integer
 *                     example: 1
 *                   comments:
 *                     type: string
 *                     example: "Order # 18"
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   auth_code:
 *                     type: string
 *                     example: tok_1EkUYxE8uV3JQbVkVh1WLWNg"
 *                   reference:
 *                     type: string
 *                     example: "ch_1EkUYzE8uV3JQbVkbkZkkglW"
 *                   shipping_id:
 *                     type: integer
 *                     example: 4
 *                   shipping_type:
 *                     type: string
 *                     example: "By air (7 days, $25)"
 *                   shipping_cost:
 *                     type: string
 *                     example: 25
 *                   tax_id:
 *                     type: integer
 *                     example: 2
 *                   tax_type:
 *                     type: string
 *                     example: "No Tax"
 *                   tax_percentage:
 *                     type: integer
 *                     example: 0
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
 */
router.get('/:order_id([0-9]+)', [authMiddleware.verifyToken], orderController.getOrderInfo);


/**
 * Get orders by Customer
 *
 *
 * @swagger
 * paths:
 *   /orders/inCustomer:
 *     get:
 *       summary: Get orders by Customer
 *       description: Get orders by Customer
 *       tags: [orders]
 *       produces:
 *         - application/json
 *       security:
 *         - ApiKeyAuth: []
 *       responses:
 *         200:
 *           description: Return a array of Orders
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Customer'
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
 */
router.get('/inCustomer', [authMiddleware.verifyToken], orderController.getCustomerOrders);

/**
 * Get Info about Order
 *
 *
 * @swagger
 * paths:
 *   /orders/shortDetail/{order_id}:
 *     get:
 *       summary: Get Info about Order
 *       description: Get Info about Order
 *       tags: [orders]
 *       produces:
 *         - application/json
 *       security:
 *         - ApiKeyAuth: []
 *       parameters:
 *         - in: path
 *           name: order_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Return a object of Order.
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   order_id:
 *                     type: integer
 *                     example: 1
 *                   total_amount:
 *                     type: string
 *                     example: "14.95"
 *                   created_on:
 *                     type: string
 *                     example: "2019-06-12T10:24:31.000Z"
 *                   shipped_on:
 *                     type: string
 *                     example: "2019-06-12T10:24:31.000Z"
 *                   status:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Test"
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
 */
router.get('/shortDetail/:orderId([0-9]+)', [authMiddleware.verifyToken], orderController.getOrderDetails);


module.exports = router;
