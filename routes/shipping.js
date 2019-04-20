var express = require('express');
var router = express.Router();

var shippingController = require('../controllers/shippingController');


/* Return shippings regions */
router.get('/regions', shippingController.getShippingRegions);

/* Return shippings regions */
router.get('/regions/:shippingRegionId([0-9]+)', shippingController.getShippingRegionById);


module.exports = router;
