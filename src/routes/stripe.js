var express = require('express');
var router = express.Router();

var stripeController = require('../controllers/stripeController');


/* This method receive a front-end payment and create a chage. */
router.post('/charge', stripeController.createCharge);

/* Endpoint that provide a synchronization */
router.post('/webhooks', stripeController.handleWebhooks);

module.exports = router;
