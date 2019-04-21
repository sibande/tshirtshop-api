var express = require('express');
var router = express.Router();

var orderController = require('../controllers/orderController');

/* Create a Order */
router.post('/', orderController.createOrder);

/* Get Info about Order */
router.get('/:orderId([0-9]+)', orderController.getOrderInfo);

/* Get orders by Customer */
router.get('/inCustomer', orderController.getCustomerOrders);

/* Get Info about Order */
router.get('/shortDetail/:orderId([0-9]+)', orderController.getOrderDetails);


module.exports = router;
