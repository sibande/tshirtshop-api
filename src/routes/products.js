var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       properties:
 *         product_id:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: Haute Couture
 *         description:
 *           type: string
 *           example: This stamp publicized the dress making industry. Use it to celebrate the T-shirt industry!
 *         price:
 *           type: string
 *           example: "15.99"
 *         discounted_price:
 *           type: string
 *           example: "14.95"
 *         thumbnail:
 *           type: string
 *           example: haute-couture-thumbnail.gif
 */


/* Get All Products */
router.get('/', productController.getProducts);

/* Search products */
router.get('/search', productController.searchProducts);

/* Product by ID */
router.get('/:productId([0-9]+)', productController.getProductById);

/* Get a lit of Products of Categories */
router.get('/inCategory/:categoryId([0-9]+)', productController.getCategoryProducts);

/* Get a list of Products on Department */
router.get('/inDepartment/:departmentId([0-9]+)', productController.getDepartmentProducts);

/* Get details of a Product */
router.get('/:productId([0-9]+)/details', productController.getProductDetails);

/* Get locations of a Product */
router.get('/:productId([0-9]+)/locations', productController.getProductLocations);

/* Get reviews of a Product */
router.get('/:productId([0-9]+)/reviews', productController.getProductReviews);

/* Add Product Review */
router.post('/:productId([0-9]+)/reviews', productController.addProductReviews);


module.exports = router;
