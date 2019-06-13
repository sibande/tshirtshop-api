var express = require('express');
var router = express.Router();

var shippingController = require('../controllers/shippingController');


/**
 * @swagger
 * tags:
 *   - name: shipping
 *     description: Everything about shipping
 */


/**
 * Return shippings regions
 *
 *
 * @swagger
 * paths:
 *   /shipping/regions:
 *     get:
 *       summary: Return shippings regions
 *       description: Return shippings regions
 *       tags: [shipping]
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Return a list of Shippings Regions
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     shipping_region_id:
 *                       type: integer
 *                       example: 1
 *                     shipping_region:
 *                       type: string
 *                       example: Please select
 */
router.get('/regions', shippingController.getShippingRegions);


/**
 * Get shipping by shipping region ID
 *
 *
 * @swagger
 * paths:
 *   /shipping/regions/{shipping_region_id}:
 *     get:
 *       summary: Get shipping by shipping region ID
 *       description: Get shipping by shipping region ID
 *       tags: [shipping]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: shipping_region_id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: An object of the shipping region
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     shipping_id:
 *                       type: integer
 *                       example: 1
 *                     shipping_type:
 *                       type: string
 *                       example: "Next Day Delivery ($20)"
 *                     shipping_cost:
 *                       type: string
 *                       example: "20"
 *                     shipping_region_id:
 *                       type: string
 *                       example: 2
 */
router.get('/regions/:shipping_region_id([0-9]+)', shippingController.getShippingRegionById);


module.exports = router;
