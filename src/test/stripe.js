var chai = require('chai');
var assert = require('chai').assert;

var chaiHttp = require('chai-http');

var app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("Stripe", () => {


  it("Charge order on stripe with an empty stripe token", (done) => {

    // Login first
    chai.request(app)
      .post('/customers/login')
      .send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
      .end((err, res) => {
	// Charge order
	chai.request(app)
          .post('/stripe/charge')
	  .set('User-Key', res.body.accessToken)
	  .send({})
          .end((err, res) => {
	    assert.equal(res.status, 400, 'respond with status 400 when the stripe token field is empty');
	    assert.equal(res.body.field, 'stripeToken', 'display failed field');
	    assert.equal(res.body.code, 'STP_02', 'STP_02 code for a required stripe field');

            done();
          });
      });
  });


  it("Charge order on stripe with an empty order id", (done) => {

    // Login first
    chai.request(app)
      .post('/customers/login')
      .send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
      .end((err, res) => {
	// Charge order
	chai.request(app)
          .post('/stripe/charge')
	  .set('User-Key', res.body.accessToken)
	  .send({stripeToken: new Date().getTime()})
          .end((err, res) => {
	    assert.equal(res.status, 400, 'respond with status 400 when the order id field is empty');
	    assert.equal(res.body.field, 'order_id', 'display failed field');
	    assert.equal(res.body.code, 'STP_02', 'STP_02 code for a required stripe field');

            done();
          });
      });
  });


  it("Charge order on stripe with an invalid order id", (done) => {

    // Login first
    chai.request(app)
      .post('/customers/login')
      .send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
      .end((err, res) => {
	// Charge order
	chai.request(app)
          .post('/stripe/charge')
	  .set('User-Key', res.body.accessToken)
	  .send({stripeToken: new Date().getTime(), order_id: 'invalid'})
          .end((err, res) => {
	    assert.equal(res.status, 400, 'respond with status 400 when the order id field is invalid');
	    assert.equal(res.body.field, 'order_id', 'display failed field');
	    assert.equal(res.body.code, 'STP_03', 'STP_03 code for a required stripe field');

            done();
          });
      });
  });


  it("Charge order on stripe with an empty description", (done) => {

    // Login first
    chai.request(app)
      .post('/customers/login')
      .send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
      .end((err, res) => {
	// Charge order
	chai.request(app)
          .post('/stripe/charge')
	  .set('User-Key', res.body.accessToken)
	  .send({stripeToken: new Date().getTime(), order_id: 1})
          .end((err, res) => {
	    assert.equal(res.status, 400, 'respond with status 400 when the description field is empty');
	    assert.equal(res.body.field, 'description', 'display failed field');
	    assert.equal(res.body.code, 'STP_02', 'STP_02 code for a required stripe field');

            done();
          });
      });
  });


  it("Charge order on stripe with an empty amount", (done) => {

    // Login first
    chai.request(app)
      .post('/customers/login')
      .send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
      .end((err, res) => {
	// Charge order
	chai.request(app)
          .post('/stripe/charge')
	  .set('User-Key', res.body.accessToken)
	  .send({stripeToken: new Date().getTime(), order_id: 1, description: new Date().getTime()})
          .end((err, res) => {
	    assert.equal(res.status, 400, 'respond with status 400 when the amount field is empty');
	    assert.equal(res.body.field, 'amount', 'display failed field');
	    assert.equal(res.body.code, 'STP_02', 'STP_02 code for a required stripe field');

            done();
          });
      });
  });

  it("Charge order on stripe with an invalid amount", (done) => {

    // Login first
    chai.request(app)
      .post('/customers/login')
      .send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
      .end((err, res) => {
	// Charge order
	chai.request(app)
          .post('/stripe/charge')
	  .set('User-Key', res.body.accessToken)
	  .send({stripeToken: new Date().getTime(), order_id: 1, description: new Date().getTime(), amount: 'invalid'})
          .end((err, res) => {
	    assert.equal(res.status, 400, 'respond with status 400 when the amount field is invalid');
	    assert.equal(res.body.field, 'amount', 'display failed field');
	    assert.equal(res.body.code, 'STP_03', 'STP_03 code for an invalid stripe field');

            done();
          });
      });
  });


});
