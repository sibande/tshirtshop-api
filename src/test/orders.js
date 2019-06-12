var chai = require('chai');
var assert = require('chai').assert;

var chaiHttp = require('chai-http');

var app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("Orders", () => {

  // Create an order
  describe("POST /orders", () => {

  
    it("Create an order without a User-Key header", (done) => {
      chai.request(app)
        .post('/orders')
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is empty');
	  assert.equal(res.body.code, 'AUT_01', 'AUT_01 code for an empty User-Key header');
          done();
        });
    });

    it("Create an order without an invalid User-Key header", (done) => {
      chai.request(app)
        .post('/orders')
	.set('User-Key', 'Bearer ' + new Date().getTime())
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is invalid');
	  assert.equal(res.body.code, 'AUT_02', 'AUT_02 code for an invalid User-Key header');
          done();
        });
    });


    it("Create an order with an empty cart id", (done) => {

      // Login first
      chai.request(app)
        .post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Create order
	  chai.request(app)
            .post('/orders')
	    .set('User-Key', res.body.accessToken)
	    .send({})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the cart id field is empty');
	      assert.equal(res.body.field, 'cart_id', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required order field');

              done();
            });
	});
    });

    it("Create an order with an empty shipping id", (done) => {

      // Login first
      chai.request(app)
        .post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Create order
	  chai.request(app)
            .post('/orders')
	    .set('User-Key', res.body.accessToken)
	    .send({cart_id: 'example'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the shipping id field is empty');
	      assert.equal(res.body.field, 'shipping_id', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required order field');

              done();
            });
	});
    });


    it("Create an order with an invalid shipping id", (done) => {

      // Login first
      chai.request(app)
        .post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Create order
	  chai.request(app)
            .post('/orders')
	    .set('User-Key', res.body.accessToken)
	    .send({cart_id: 'example', shipping_id: 'example'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the shipping id field is invalid');
	      assert.equal(res.body.field, 'shipping_id', 'display failed field');
	      assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid order field');

              done();
            });
	});
    });


    it("Create an order with an empty tax id", (done) => {

      // Login first
      chai.request(app)
        .post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Create order
	  chai.request(app)
            .post('/orders')
	    .set('User-Key', res.body.accessToken)
	    .send({cart_id: 'example', shipping_id: 1})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the tax id field is empty');
	      assert.equal(res.body.field, 'tax_id', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required order field');

              done();
            });
	});
    });

    it("Create an order with an invalid tax id", (done) => {

      // Login first
      chai.request(app)
        .post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Create order
	  chai.request(app)
            .post('/orders')
	    .set('User-Key', res.body.accessToken)
	    .send({cart_id: 'example', shipping_id: 1, tax_id: 'example'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the tax id field is invalid');
	      assert.equal(res.body.field, 'tax_id', 'display failed field');
	      assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid order field');

              done();
            });
	});
    });


  });


  // Get an order
  describe("GET /orders/{order_id}", () => {

    it("Get an order without a User-Key header", (done) => {
      chai.request(app)
        .get('/orders/1')
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is empty');
	  assert.equal(res.body.code, 'AUT_01', 'AUT_01 code for an empty User-Key header');
          done();
        });
    });

    it("Get an order without an invalid User-Key header", (done) => {
      chai.request(app)
        .get('/orders/1')
	.set('User-Key', 'Bearer ' + new Date().getTime())
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is invalid');
	  assert.equal(res.body.code, 'AUT_02', 'AUT_02 code for an invalid User-Key header');
          done();
        });
    });

  });
});
  
