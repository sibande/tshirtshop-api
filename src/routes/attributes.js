var express = require('express');
var router = express.Router();

var attributeController = require('../controllers/attributeController');


/**
 * @swagger
 * tags:
 *   - name: attributes
 *     description: Everything about attributes
 */


/**
 * Get Attribute list
 *
 *
 * @swagger
 * paths:
 *   /attributes:
 *     get:
 *       summary: Get Attribute list
 *       description: Get Attribute list
 *       tags: [attributes]
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: List of Attribute Objects
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     attribute_id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Size
 */
router.get('/', attributeController.getAttributes);


/**
 * Get Attribute by ID
 *
 *
 * @swagger
 * paths:
 *   /attributes/{attribute_id}:
 *     get:
 *       summary: Get Attribute by ID
 *       description: Get Attribute by ID
 *       tags: [attributes]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: attribute_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Return a Object of Attribute
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   attribute_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Size
 */
router.get('/:attribute_id([0-9]+)', attributeController.getAttributeById);


/**
 * Get Values Attribute from Atribute
 *
 *
 * @swagger
 * paths:
 *   /attributes/values/{attribute_id}:
 *     get:
 *       summary: Get Values Attribute from Atribute
 *       description: Get Values Attribute from Atribute
 *       tags: [attributes]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: attribute_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Get Values Attribute from Atribute
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     attribute_value_id:
 *                       type: integer
 *                       example: 1
 *                     value:
 *                       type: string
 *                       example: S
 */
router.get('/values/:attribute_id([0-9]+)', attributeController.getAttributeValues);


/**
 * Get all Attributes with Produt ID
 *
 *
 * @swagger
 * paths:
 *   /attributes/inProduct/{product_id}:
 *     get:
 *       summary: Get all Attributes with Produt ID
 *       description: Get all Attributes with Produt ID
 *       tags: [attributes]
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
 *           description: Return a array of Values of Attribute Objects
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     attribute_name:
 *                       type: string
 *                       example: Size
 *                     attribute_value_id:
 *                       type: integer
 *                       example: 1
 *                     attribute_value:
 *                       type: string
 *                       example: S
 */
router.get('/inProduct/:product_id([0-9]+)', attributeController.getProductAttributes);


module.exports = router;
