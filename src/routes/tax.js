var express = require('express');
var router = express.Router();

var taxController = require('../controllers/taxController');


/**
 * @swagger
 * tags:
 *   - name: taxes
 *     description: Everything about taxes
 */


/**
 * Get All Taxes
 *
 *
 * @swagger
 * paths:
 *   /tax:
 *     get:
 *       summary: Get All Taxes
 *       description: Get All Taxes
 *       tags: [taxes]
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: A Array of Object Tax
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     tax_id:
 *                       type: integer
 *                       example: 1
 *                     tax_type:
 *                       type: string
 *                       example: Sales Tax at 8.5%
 *                     tax_percentage:
 *                       type: string
 *                       example: 0.50
 */
router.get('/', taxController.getTaxes);

/**
 * Get Tax by ID
 *
 *
 * @swagger
 * paths:
 *   /tax/{tax_id}:
 *     get:
 *       summary: Get Tax by ID
 *       description: Get Tax by ID
 *       tags: [taxes]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: tax_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: A object of Tax
 *           content:
 *             application/json:
 *               schema:
 *                 properties:
 *                   tax_id:
 *                     type: integer
 *                     example: 1
 *                   tax_type:
 *                     type: string
 *                     example: Sales Tax at 8.5%
 *                   tax_percentage:
 *                     type: string
 *                     example: 0.50
 */
router.get('/:tax_id([0-9]+)', taxController.getTaxById);


module.exports = router;
