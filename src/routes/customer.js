var express = require('express');

var multer  = require('multer');
var upload = multer();

var router = express.Router();

var authMiddleware = require('../routes/middlewares/auth');

var customerController = require('../controllers/customerController');


/* Update a customer */
router.put('/', [upload.none(), authMiddleware.verifyToken], customerController.updateCustomer);

/* Get a customer by ID. The customer is getting by Token. */
router.get('/', [authMiddleware.verifyToken], customerController.getCustomer);


module.exports = router;
