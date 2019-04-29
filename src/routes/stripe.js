var express = require('express');
var multer  = require('multer');
var upload = multer();

var router = express.Router();

var authMiddleware = require('../routes/middlewares/auth');

var stripeController = require('../controllers/stripeController');


/* This method receive a front-end payment and create a chage. */
router.post('/charge', [upload.none(), authMiddleware.verifyToken], stripeController.createCharge);

/* Endpoint that provide a synchronization */
router.post('/webhooks', stripeController.handleWebhooks);

module.exports = router;
