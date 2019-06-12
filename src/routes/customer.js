var express = require('express');

var multer  = require('multer');
var upload = multer();

var router = express.Router();

var authMiddleware = require('../routes/middlewares/auth');

var customerController = require('../controllers/customerController');


/**
 * Update a customer
 *
 *
 * @swagger
 * paths:
 *   /customer:
 *     put:
 *       summary: Update a customer
 *       description: Update a customer
 *       tags: [customers]
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
 *                 name:
 *                   description: Customer's name.
 *                   type: string
 *                 email:
 *                   description: Customer's email.
 *                   type: string
 *                 password:
 *                   description: Customer's password.
 *                   type: string
 *                 day_phone:
 *                   description: Customer's day phone.
 *                   type: string
 *                 eve_phone:
 *                   description: Customer's eve phone.
 *                   type: string
 *                 mob_phone:
 *                   description: Customer's mob phone.
 *                   type: string
 *               required:
 *                 - name
 *                 - email
 *       responses:
 *         200:
 *           description: Return a Customer object
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
 *             Empty name:
 *               code: USR_02
 *               message: Name can't be blank
 *               field: name
 *               status: 400
 *             Empty email:
 *               code: USR_02
 *               message: Email can't be blank
 *               field: email
 *               status: 400
 *             Invalid email:
 *               code: USR_03
 *               message: Email is not a valid email
 *               field: email
 *               status: 400
 *             Invalid day phone:
 *               code: USR_03
 *               message: Day phone format invalid, only numeric values allowed
 *               field: day_phone
 *               status: 400
 *             Invalid eve phone:
 *               code: USR_03
 *               message: Eve phone format invalid, only numeric values allowed
 *               field: eve_phone
 *               status: 400
 *             Invalid mob phone:
 *               code: USR_03
 *               message: Mob phone format invalid, only numeric values allowed
 *               field: mob_phone
 *               status: 400
 */
router.put('/', [upload.none(), authMiddleware.verifyToken], customerController.updateCustomer);

/**
 * Get a customer by ID. The customer is getting by Token.
 *
 *
 * @swagger
 * paths:
 *   /customer:
 *     get:
 *       summary: Get a customer
 *       description: Get a customer
 *       tags: [customers]
 *       produces:
 *         - application/json
 *       security:
 *         - ApiKeyAuth: []
 *       responses:
 *         200:
 *           description: Return a Customer object
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
router.get('/', [authMiddleware.verifyToken], customerController.getCustomer);


module.exports = router;
