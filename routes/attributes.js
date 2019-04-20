var express = require('express');
var router = express.Router();

var attributeController = require('../controllers/attributeController');


/* Get Attribute list */
router.get('/', attributeController.getAttributes);

/* Get Attribute by ID */
router.get('/:attributeId([0-9]+)', attributeController.getAttributeById);

/* Get Values Attribute from Atribute */
router.get('/values/:attributeId([0-9]+)', attributeController.getAttributeValues);

/* Get all Attributes with Produt ID */
router.get('/inProduct/:productId([0-9]+)', attributeController.getProductAttributes);


module.exports = router;
