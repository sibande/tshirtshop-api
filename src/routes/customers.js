var express = require('express');

const { check } = require('express-validator/check');

var multer  = require('multer');
var upload = multer();

var router = express.Router();

var authMiddleware = require('../routes/middlewares/auth');

var customerController = require('../controllers/customerController');


/**
 * @swagger
 * tags:
 *   - name: customers
 *     description: Everything about customers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       properties:
 *         code:
 *           type: string
 *           example: USR_2
 *         message:
 *           type: string
 *           example: Example field is required
 *         field:
 *           type: string
 *           example: example
 *         status:
 *           type: integer
 *           example: 400
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       properties:
 *         customer_id:
 *           type: integer
 *           example: 11
 *         name:
 *           type: string
 *           example: John Doe,
 *         email:
 *           type: string
 *           example: example@example.com
 *         credit_card:
 *           type: string
 *           example: XXXXXXXX5100,
 *         address_1:
 *           type: string
 *           example: Stand 1 Ext 1
 *         address_2:
 *           type: string
 *           example: Ext 1
 *         city:
 *           type: string
 *           example: Pretoria
 *         region:
 *           type: string
 *           example: Gauteng
 *         postal_code:
 *           type: string
 *           example: 0001
 *         country:
 *           type: string
 *           example: South Africa
 *         shipping_region_id:
 *           type: integer
 *           example: 4
 *         day_phone:
 *           type: string
 *           example: +27210000000
 *         eve_phone:
 *           type: string
 *           example: +27110000000
 *         mob_phone:
 *           type: string
 *           example: +27620000000
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerRegister:
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         accessToken:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiJKb3NlIDMgU2liYW5kZSIsImVtYWlsIjoibWUzQHNpYmFuZGUuY29tIiwiaWF0IjoxNTYwMjA5OTY5LCJleHAiOjE1NjAyOTYzNjl9.EOHFtLArwwMWpM-G_FgRBYnIj0Bl4cNVpqqGciirZqc
 *         expires_in:
 *           type: string
 *           example: 24h
 */



/* Get a customer by ID. The customer is getting by Token. */
router.get('/', [authMiddleware.verifyToken], customerController.getCustomer);


/**
 * Register a Customer
 *
 *
 * @swagger
 *
 * paths:
 *   /customers:
 *     post:
 *       summary: Register a Customer
 *       description: Register a Customer
 *       tags: [customers]
 *       produces:
 *         - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   description: User's name.
 *                   type: string
 *                 email:
 *                   description: User's email.
 *                   type: string
 *                 password:
 *                   description: User's password.
 *                   type: string
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *       responses:
 *         200:
 *           description: Return a Customer object with credentials
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CustomerRegister'
 *         400:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.post('/', upload.none(), [
  check('email').isEmail(),
  check('name').isLength({min: 1}),
  check('password').isLength({min: 1})
], customerController.registerCustomer);


/**
 * Customer Login
 *
 *
 * @swagger
 *
 * paths:
 *   /customers/login:
 *     post:
 *       summary: Sign in for shopping
 *       description: Customer Login
 *       tags: [customers]
 *       produces:
 *         - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   description: User's email.
 *                   type: string
 *                 password:
 *                   description: User's password.
 *                   type: string
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         200:
 *           description: Return a Customer object with credentials
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CustomerRegister'
 *         400:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.post('/login', upload.none(), [
  check('email').isEmail(),
  check('password').isLength({min: 1})
], customerController.loginCustomer);


/**
 * Customer Login with Facebook
 *
 *
 * @swagger
 * paths:
 *   /customers/facebook:
 *     post:
 *       summary: Sign in with a facebook login token
 *       description: Customer Login with Facebook
 *       tags: [customers]
 *       produces:
 *         - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   description: Token generated from your facebook login.
 *                   type: string
 *               required:
 *                 - access_token
 *       responses:
 *         200:
 *           description: Return a Customer object with credentials
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CustomerRegister'
 *         400:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *           examples:
 *             Not JSON body:
 *               error:
 *                 code: json_parse_error
 *                 detail: Valid JSON object is expected
 *             Invalid parameter value:
 *               error:
 *                 code: invalid_parameter_value
 */
router.post('/facebook', upload.none(), customerController.facebookLoginCustomer);

/* Update the address from customer */
router.put('/address', [upload.none(), authMiddleware.verifyToken], customerController.updateCustomerAddress);

/* Update credit card */
router.put('/creditCard', [authMiddleware.verifyToken], customerController.updateCustomerCreditCard);


module.exports = router;
