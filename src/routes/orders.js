var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer();

var authMiddleware = require('../routes/middlewares/auth');

var orderController = require('../controllers/orderController');

/* Create a Order */
router.post('/', [upload.none(), authMiddleware.verifyToken], orderController.createOrder);

/* Get Info about Order */
router.get('/:orderId([0-9]+)', [authMiddleware.verifyToken], orderController.getOrderInfo);

/* Get orders by Customer */
router.get('/inCustomer', [authMiddleware.verifyToken], orderController.getCustomerOrders);

/* Get Info about Order */
router.get('/shortDetail/:orderId([0-9]+)', [authMiddleware.verifyToken], orderController.getOrderDetails);


module.exports = router;
