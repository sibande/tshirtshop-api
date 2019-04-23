var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var categoriesRouter = require('./routes/categories');
var departmentsRouter = require('./routes/departments');
var attributesRouter = require('./routes/attributes');
var productsRouter = require('./routes/products');
var customersRouter = require('./routes/customers');
var ordersRouter = require('./routes/orders');
var shoppingcartRouter = require('./routes/shoppingcart');
var shippingRouter = require('./routes/shipping');
var stripeRouter = require('./routes/stripe');
var taxRouter = require('./routes/tax');

var authMiddleware = require('./routes/middlewares/auth');

var app = express();

// CORS
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// // https://stackoverflow.com/a/12008719

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authMiddleware.extractToken);


app.get('/facebook_test', function (req, res) {
  var fs = require("fs");

  fs.readFile('/home/turing/test_facebook.html', function (err, data) {
    res.send(data.toString());
  });

});


app.use('/categories', categoriesRouter);
app.use('/departments', departmentsRouter);
app.use('/attributes', attributesRouter);
app.use('/products', productsRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/shoppingcart', shoppingcartRouter);
app.use('/shipping', shippingRouter);
app.use('/stripe', stripeRouter);
app.use('/tax', taxRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
