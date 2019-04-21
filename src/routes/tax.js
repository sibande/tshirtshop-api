var express = require('express');
var router = express.Router();

var taxController = require('../controllers/taxController');


/* Get All Taxes */
router.get('/', taxController.getTaxes);

/* Get Tax by ID */
router.get('/:taxId([0-9]+)', taxController.getTaxById);


module.exports = router;
