var express = require('express');

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
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: USER-KEY
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
 *           example: "0001"
 *         country:
 *           type: string
 *           example: South Africa
 *         shipping_region_id:
 *           type: integer
 *           example: 4
 *         day_phone:
 *           type: string
 *           example: "+27210000000"
 *         eve_phone:
 *           type: string
 *           example: "+27110000000"
 *         mob_phone:
 *           type: string
 *           example: "+27620000000"
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
 *           examples:
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
 *             Empty password:
 *               code: USR_02
 *               message: Password can't be blank
 *               field: password
 *               status: 400
 *             Email already exists:
 *               status: 400
 *               field: email
 *               code: USR_01
 *               message: The email already exists.
 */
router.post('/', upload.none(), customerController.registerCustomer);


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
 *           examples:
 *             Empty email field:
 *               code: USR_2
 *               message: Email can't be blank
 *               field: email
 *               status: 400
 *             Email invalid:
 *               code: USR_3
 *               message: Email is not a valid email
 *               field: email
 *               status: 400
 *             Empty password field:
 *               code: USR_02
 *               message: Password can't be blank
 *               field: password
 *               status: 400
 *             Invalid email and password combination:
 *               status: 400
 *               code: USR_01
 *               message: Email or Password is invalid.
 */
router.post('/login', upload.none(), customerController.loginCustomer);


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
 *             Empty access token:
 *               code: USR_02
 *               message: Access token can't be blank
 *               field: access_token
 *               status: 400
 *             Invalid access token:
 *               status: 400
 *               code: USR_01,
 *               message: Facebook login failed.
 */
router.post('/facebook', upload.none(), customerController.facebookLoginCustomer);


/**
 * Update the address from customer
 *
 *
 * @swagger
 * paths:
 *   /customers/address:
 *     put:
 *       summary: Update the address from customer
 *       description: Update the address from customer
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
 *                 address_1:
 *                   description: Address 1
 *                   type: string
 *                 address_2:
 *                   description: Address 2
 *                   type: string
 *                 city:
 *                   description: City.
 *                   type: string
 *                 region:
 *                   description: Region
 *                   type: string
 *                 postal_code:
 *                   description: Postal Code
 *                   type: string
 *                 country:
 *                   description: Country
 *                   type: string
 *                 shipping_region_id:
 *                   description: Shipping Region ID.
 *                   type: integer
 *               required:
 *                 - address_1
 *                 - city
 *                 - region
 *                 - postal_code
 *                 - country
 *                 - shipping_region_id
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
 *             Empty address 1:
 *               code: USR_02
 *               message: Address 1 can't be blank
 *               field: address_1
 *               status: 400
 *             Empty city:
 *               code: USR_02
 *               message: City can't be blank
 *               field: city
 *               status: 400
 *             Empty region:
 *               code: USR_02
 *               message: Region can't be blank
 *               field: region
 *               status: 400
 *             Empty postal code:
 *               code: USR_02
 *               message: Postal code can't be blank
 *               field: postal_code
 *               status: 400
 *             Empty country:
 *               code: USR_02
 *               message: Country can't be blank
 *               field: country
 *               status: 400
 *             Empty shipping region id:
 *               code: USR_02
 *               message: Shipping region id can't be blank
 *               field: shipping_region_id
 *               status: 400
 *             Invalid shipping region id:
 *               code: USR_03
 *               message: Shipping region id is not a number
 *               field: shipping_region_id
 *               status: 400
 */
router.put('/address', [upload.none(), authMiddleware.verifyToken], customerController.updateCustomerAddress);


/**
 * Update credit card
 *
 *
 * @swagger
 * paths:
 *   /customers/creditCard:
 *     put:
 *       summary: Update credit card
 *       description: Update credit card
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
 *                 credit_card:
 *                   description: Credit Card
 *                   type: string
 *               required:
 *                 - credit_card
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
 *             Empty credit card:
 *               code: USR_02
 *               message: Credit card can't be blank
 *               field: credit_card
 *               status: 400
 */
router.put('/creditCard', [authMiddleware.verifyToken], customerController.updateCustomerCreditCard);


module.exports = router;
