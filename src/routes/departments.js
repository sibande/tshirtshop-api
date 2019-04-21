var express = require('express');
var router = express.Router();

var departmentController = require('../controllers/departmentController');


/* Get Departments */
router.get('/', departmentController.getDepartmentList);

/* Get Department by ID */
router.get('/:departmentId([0-9]+)', departmentController.getDepartmentById);


module.exports = router;
