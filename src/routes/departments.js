var express = require('express');
var router = express.Router();

var departmentController = require('../controllers/departmentController');

/**
 * @swagger
 * tags:
 *   - name: departments
 *     description: Everything about departments
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       properties:
 *         department_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Regional
 *         description:
 *           type: string
 *           example: "Proud of your country? Wear a T-shirt with a national symbol stamp!"
 */


/**
 * Get Departments
 *
 *
 * @swagger
 * paths:
 *   /departments:
 *     get:
 *       summary: Get Departments
 *       description: Get Departments
 *       tags: [departments]
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: A Array of Object Department
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   count:
 *                     type: integer
 *                     example: 20
 *                   rows:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Department'
 */
router.get('/', departmentController.getDepartmentList);


/**
 * Get Department by ID
 *
 *
 * @swagger
 * paths:
 *   /departments/{department_id}:
 *     get:
 *       summary: Get Department by ID
 *       description: Get Department by ID
 *       tags: [departments]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: department_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: A object of Department
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Department'
 *         404:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.get('/:department_id([0-9]+)', departmentController.getDepartmentById);


module.exports = router;
