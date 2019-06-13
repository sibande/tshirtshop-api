var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer();

var authMiddleware = require('../routes/middlewares/auth');

var productController = require('../controllers/productController');


/**
 * @swagger
 * tags:
 *   - name: products
 *     description: Everything about products
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
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
 *         image:
 *           type: string
 *           example: haute-couture.gif
 *         image_2:
 *           type: string
 *           example: haute-couture-2.gif
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductLocations:
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         category_name:
 *           type: string
 *           example: French
 *         department_id:
 *           type: integer
 *           example: 1
 *         department_name:
 *           type: string
 *           example: Regional
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       properties:
 *         name:
 *           type: string
 *           example: Example
 *         review:
 *           type: string
 *           example: Example
 *         rating:
 *           type: integer
 *           example: 5
 *         created_on:
 *           type: string
 *           example: "2019-02-17 13:57:29"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductComplete:
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
 *         image:
 *           type: string
 *           example: haute-couture.gif
 *         image_2:
 *           type: string
 *           example: haute-couture-2.gif
 *         thumbnail:
 *           type: string
 *           example: haute-couture-thumbnail.gif
 *         display:
 *           type: integer
 *           example: 0
 */


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


/**
 * Get All Products
 *
 *
 * @swagger
 * paths:
 *   /products:
 *     get:
 *       summary: Get All Products
 *       description: Get All Products
 *       tags: [products]
 *       produces:
 *         - application/json
 *       parameters:
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
 *         - in: query
 *           name: description_length
 *           schema:
 *             type: integer
 *           description: "Limit of the description, Default: 200."
 *       responses:
 *         200:
 *           description: Return the total of products and a list of Products in row.
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
 *                       $ref: '#/components/schemas/Product'
 */
router.get('/', productController.getProducts);


/**
 * Search products
 *
 *
 * @swagger
 * paths:
 *   /products/search:
 *     get:
 *       summary: Search products
 *       description: Search products
 *       tags: [products]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: query
 *           name: query_string
 *           required: true
 *           schema:
 *             type: string
 *           description: "Query to search"
 *         - in: query
 *           name: all_words
 *           schema:
 *             type: string
 *           description: "All words or no. Default: on"
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
 *         - in: query
 *           name: description_length
 *           schema:
 *             type: integer
 *           description: "Limit of the description, Default: 200."
 *       responses:
 *         200:
 *           description: Return the total of products and a list of Products in row.
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
 *                       $ref: '#/components/schemas/Product'
 */
router.get('/search', productController.searchProducts);


/**
 * Product by ID
 *
 *
 * @swagger
 * paths:
 *   /products/{product_id}:
 *     get:
 *       summary: Product by ID
 *       description: Product by ID
 *       tags: [products]
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
 *           description: Return a complete Product Object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProductComplete'
 *         404:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *           examples:
 *             Product not found:
 *               status: 404
 *               code: PRO_03
 *               message: The product with this ID does not exist.
 */
router.get('/:product_id([0-9]+)', productController.getProductById);


/**
 * Get a lit of Products of Categories
 *
 *
 * @swagger
 * paths:
 *   /products/inCategory/{category_id}:
 *     get:
 *       summary: Get a lit of Products of Categories
 *       description: Get a lit of Products of Categories
 *       tags: [products]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: category_id
 *           required: true
 *           schema:
 *             type: string
 *           description: "Category ID"
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
 *         - in: query
 *           name: description_length
 *           schema:
 *             type: integer
 *           description: "Limit of the description, Default: 200."
 *       responses:
 *         200:
 *           description: Return a list of Product Objects
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
 *                       $ref: '#/components/schemas/Product'
 */
router.get('/inCategory/:category_id([0-9]+)', productController.getCategoryProducts);


/**
 * Get a list of Products on Department
 *
 *
 * @swagger
 * paths:
 *   /products/inDepartment/{department_id}:
 *     get:
 *       summary: Get a list of Products on Department
 *       description: Get a list of Products on Department
 *       tags: [products]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: department_id
 *           required: true
 *           schema:
 *             type: string
 *           description: "Department ID"
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
 *         - in: query
 *           name: description_length
 *           schema:
 *             type: integer
 *           description: "Limit of the description, Default: 200."
 *       responses:
 *         200:
 *           description: Return a list of Product Objects
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
 *                       $ref: '#/components/schemas/Product'
 */
router.get('/inDepartment/:department_id([0-9]+)', productController.getDepartmentProducts);


/**
 * Get details of a Product
 *
 *
 * @swagger
 * paths:
 *   /products/{product_id}/details:
 *     get:
 *       summary: Get details of a Product
 *       description: Get details of a Product
 *       tags: [products]
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
 *           description: Return a Product Detail Object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProductDetail'
 *         404:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *           examples:
 *             Product not found:
 *               status: 404
 *               code: PRO_03
 *               message: The product with this ID does not exist.
 */
router.get('/:product_id([0-9]+)/details', productController.getProductDetails);


/**
 * Get locations of a Product
 *
 *
 * @swagger
 * paths:
 *   /products/{product_id}/locations:
 *     get:
 *       summary: Get locations of a Product
 *       description: Get locations of a Product
 *       tags: [products]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: product_id
 *           required: true
 *           schema:
 *             type: integer
 *           description: Product ID
 *       responses:
 *         200:
 *           description: Return locations of products.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ProductLocations'
 */
router.get('/:product_id([0-9]+)/locations', productController.getProductLocations);


/**
 * Get reviews of a Product
 *
 *
 * @swagger
 * paths:
 *   /products/{product_id}/reviews:
 *     get:
 *       summary: Get reviews of a Product
 *       description: Get reviews of a Product
 *       tags: [products]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: product_id
 *           required: true
 *           schema:
 *             type: integer
 *           description: Product ID
 *       responses:
 *         200:
 *           description: Return a list of reviews
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Review'
 */
router.get('/:product_id([0-9]+)/reviews', productController.getProductReviews);


/**
 * Add Product Review
 *
 *
 * @swagger
 * paths:
 *   /products/{product_id}/reviews:
 *     post:
 *       summary: Add Product Review
 *       description: Add Product Review
 *       tags: [products]
 *       produces:
 *         - application/json
 *       security:
 *         - ApiKeyAuth: []
 *       parameters:
 *         - in: path
 *           name: product_id
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   description: Product ID
 *                   type: integer
 *                 review:
 *                   description: Review text of product
 *                   type: string
 *                 rating:
 *                   description: Rating of product
 *                   type: integer
 *               required:
 *                 - product_id
 *                 - review
 *                 - rating
 *       responses:
 *         200:
 *           description: No data.
 *         400:
 *           description: Returns an error object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *           examples:
 *             User Key empty:
 *               status: 401
 *               code: AUT_01
 *               message: Authorization code is empty.
 *             User Key invalid:
 *               status: 401
 *               code: AUT_02
 *               message: Access Unauthorized.
 */
router.post('/:product_id([0-9]+)/reviews', [upload.none(), authMiddleware.verifyToken], productController.addProductReviews);


module.exports = router;
