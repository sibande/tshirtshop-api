var express = require('express');
var router = express.Router();

var authMiddleware = require('../routes/middlewares/auth');

var customerController = require('../controllers/customerController');


/* Update a customer */
router.put('/', [authMiddleware.verifyToken], customerController.updateCustomer);

/* Get a customer by ID. The customer is getting by Token. */
router.get('/', [authMiddleware.verifyToken], customerController.getCustomer);

/* Register a Customer */
router.post('/', customerController.registerCustomer);

/* Sign in in the Shopping. */
router.post('/login', customerController.loginCustomer);

/* Sign in with a facebook login token. */
router.post('/facebook', customerController.facebookLoginCustomer);

/* Update the address from customer */
router.put('/address', [authMiddleware.verifyToken], customerController.updateCustomerAddress);

/* Update credit card */
router.put('/creditCard', [authMiddleware.verifyToken], customerController.updateCustomerCreditCard);


module.exports = router;
