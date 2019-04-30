var express = require('express');

const { check } = require('express-validator/check');

var multer  = require('multer');
var upload = multer();

var router = express.Router();

var authMiddleware = require('../routes/middlewares/auth');

var customerController = require('../controllers/customerController');


/* Get a customer by ID. The customer is getting by Token. */
router.get('/', [authMiddleware.verifyToken], customerController.getCustomer);

/* Register a Customer */
router.post('/', upload.none(), [
  check('email').isEmail(),
  check('name').isLength({min: 1}),
  check('password').isLength({min: 1})
], customerController.registerCustomer);

/* Sign in in the Shopping. */
router.post('/login', upload.none(), [
  check('email').isEmail(),
  check('password').isLength({min: 1})
], customerController.loginCustomer);

/* Sign in with a facebook login token. */
router.post('/facebook', upload.none(), customerController.facebookLoginCustomer);

/* Update the address from customer */
router.put('/address', [upload.none(), authMiddleware.verifyToken], customerController.updateCustomerAddress);

/* Update credit card */
router.put('/creditCard', [authMiddleware.verifyToken], customerController.updateCustomerCreditCard);


module.exports = router;
