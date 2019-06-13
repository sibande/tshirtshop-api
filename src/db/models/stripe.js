var mailgun = require("mailgun-js");
var stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

var db = require('../index');

var mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});


exports.chargeOrder = function(orderId, token, amount, description, currency, email) {

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
	var mailData = {
	  from: process.env.FROM_EMAIL_ADDRESS,
	  to: email,
	  subject: 'Payment successfully processed',
	  text: 'Payment for your order has been successfully processed.'
	};
	mg.messages().send(mailData, function (error, body) {
	});

	return data;
      }).catch(function(reason) {
        return {
          error: {
      	    status: 400,
      	    code: 'STP_03',
      	    message: reason
          }
        };
      });

  });


  
  var b = [orderId, status, comments, authCode, reference];


};
