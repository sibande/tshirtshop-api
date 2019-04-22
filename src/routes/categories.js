var express = require('express');
var router = express.Router();

var categoryController = require('../controllers/categoryController');


/* Get Categories */
router.get('/', categoryController.getCategoryList);

/* Get Category by ID */
router.get('/:categoryId([0-9]+)', categoryController.getCategoryById);

/* Get Categories of a Product */
router.get('/inProduct/:productId([0-9]+)', categoryController.getProductCategories);

/* Get Categories of a Department */
router.get('/inDepartment/:departmentId([0-9]+)', categoryController.getDepartmentCategories);


module.exports = router;

