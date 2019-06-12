var express = require('express');
var multer  = require('multer');
var upload = multer();

var router = express.Router();

var authMiddleware = require('../routes/middlewares/auth');

var stripeController = require('../controllers/stripeController');


/**
 * @swagger
 * tags:
 *   - name: stripe
 *     description: Everything about stripe
 */

/**
 * This method receive a front-end payment and create a chage
 *
 *
 * @swagger
 * paths:
 *   /stripe/charge:
 *     post:
 *       summary: This method receive a front-end payment and create a chage
 *       description: You can send a cart informations and payment token (https://stripe.com/docs/api/tokens).
 *       tags: [stripe]
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
 *                 stripeToken:
 *                   description: "The API token, you can use this example to get it: https://stripe.com/docs/stripe-js/elements/quickstart"
 *                   type: string
 *                 order_id:
 *                   description: The order ID recorded before (Check the Order Documentation)
 *                   type: integer
 *                 description:
 *                   description: Description of the order
 *                   type: string
 *                 amount:
 *                   description: "Amount in cents, only numbers like: 999"
 *                   type: integer
 *                 currency:
 *                   description: "Check here the options: https://stripe.com/docs/currencies, the default"
 *                   type: string
 *               required:
 *                 - stripeToken
 *                 - order_id
 *                 - description
 *                 - amount
 *       responses:
 *         200:
 *           description:  Object from Stripe
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
 *             Empty stripe token:
 *               code: USR_02
 *               message: Stripe token can't be blank
 *               field: stripeToken
 *               status: 400
 *             Empty order id:
 *               code: USR_02
 *               message: Order id can't be blank
 *               field: order_id
 *               status: 400
 *             Invalid order id:
 *               code: USR_03
 *               message: Order id is not a number
 *               field: order_id
 *               status: 400
 *             Empty description:
 *               code: USR_02
 *               message: Description can't be blank
 *               field: description
 *               status: 400
 *             Empty amount:
 *               code: USR_02
 *               message: Amount can't be blank
 *               field: amount
 *               status: 400
 *             Invalid amount:
 *               code: USR_03
 *               message: Amount is not a number
 *               field: amount
 *               status: 400
 */
router.post('/charge', [upload.none(), authMiddleware.verifyToken], stripeController.createCharge);


/**
 * Endpoint that provide a synchronization
 *
 *
 * @swagger
 * paths:
 *   /stripe/webhooks:
 *     post:
 *       summary: Endpoint that provide a synchronization
 *       description: "You need put this endpoint in the stripe webhooks (https://dashboard.stripe.com/account/webhooks), so get there the end-point secrete key."
 *       tags: [stripe]
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description:  This endpoint is used by Stripe.
 */
router.post('/webhooks', stripeController.handleWebhooks);

module.exports = router;
