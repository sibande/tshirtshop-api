var express = require('express');
var router = express.Router();

var categoryController = require('../controllers/categoryController');


/**
 * @swagger
 * tags:
 *   - name: categories
 *     description: Everything about categories
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: French
 *         description:
 *           type: string
 *           example: "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!"
 *         department_id:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryBasic:
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         department_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: French
 */




/**
 * Get Categories
 *
 *
 * @swagger
 * paths:
 *   /categories:
 *     get:
 *       summary: Get Categories
 *       description: Get Categories
 *       tags: [categories]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: query
 *           name: order
 *           schema:
 *             type: string
 *           description: "Sorting a field. Allowed fields: 'category_id', 'name'."
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: "Inform the page. Starting with 1. Default: 1"
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: "Limit per page, Default: 20."
 *       responses:
 *         200:
 *           description: Return a list with count (total categories) and the rows of Categories
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
 *                       $ref: '#/components/schemas/Category'
 */
router.get('/', categoryController.getCategoryList);


/**
 * Get Category by ID
 *
 *
 * @swagger
 * paths:
 *   /categories/{category_id}:
 *     get:
 *       summary: Get Category by ID
 *       description: Get Category by ID
 *       tags: [categories]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: category_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Return a object of Category
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Category'
 *         404:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.get('/:category_id([0-9]+)', categoryController.getCategoryById);


/**
 * Get Categories of a Product
 *
 *
 * @swagger
 * paths:
 *   /categories/inProduct/{product_id}:
 *     get:
 *       summary: Get Categories of a Product
 *       description: Get Categories of a Product
 *       tags: [categories]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: product_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Return a array of Category Objects
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CategoryBasic'
 *         404:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.get('/inProduct/:product_id([0-9]+)', categoryController.getProductCategories);


/**
 * Get Categories of a Department
 *
 *
 * @swagger
 * paths:
 *   /categories/inDepartment/{department_id}:
 *     get:
 *       summary: Get Categories of a Department
 *       description: Get Categories of a Department
 *       tags: [categories]
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
 *           description: Return a array of Category Objects
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Category'
 *         404:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.get('/inDepartment/:department_id([0-9]+)', categoryController.getDepartmentCategories);


module.exports = router;

