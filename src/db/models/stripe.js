var stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

var db = require('../index');


exports.chargeOrder = function(orderId, token, amount, description, currency) {

  return stripe.charges.create({
    amount: amount,
    currency: currency,
    description: description,
    source: token
  }).then(function(data) {
    var status = 2;
    if (data.status == 'succeeded') {
      status = 1;
    }
    var reference = data.id;

    return db.knex.raw(
      'CALL orders_update_order(?, ?, ?, ?, ?)',
      [orderId, status, description, token, reference]).then(function(callData) {
	return data;
      }).catch(function(reason) {
        return {
          error: {
      	    status: 400,
      	    code: 'USR_01',
      	    message: reason
          }
        };
      });

  });


  
  var b = [orderId, status, comments, authCode, reference];


};