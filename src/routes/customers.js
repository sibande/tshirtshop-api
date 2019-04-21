var express = require('express');
var router = express.Router();

var customerController = require('../controllers/customerController');


/* Update a customer */
router.put('/', customerController.updateCustomer);

/* Get a customer by ID. The customer is getting by Token. */
router.get('/', customerController.getCustomer);

/* Register a Customer */
router.post('/', customerController.registerCustomer);

/* Sign in in the Shopping. */
router.post('/login', customerController.loginCustomer);

/* Sign in with a facebook login token. */
router.post('/facebook', customerController.facebookLoginCustomer);

/* Update the address from customer */
router.put('/address', customerController.updateCustomerAddress);

/* Update credit card */
router.put('/creditCard', customerController.updateCustomerCreditCard);


module.exports = router;
