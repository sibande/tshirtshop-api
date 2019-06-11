var chai = require('chai');
var assert = require('chai').assert;

var chaiHttp = require('chai-http');

var app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("Customers", () => {

  // Customer login
  describe("POST /customers/login", () => {
    it("Login without providing an email", (done) => {
      chai.request(app)
        .post('/customers/login')
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the email is empty');
	  assert.equal(res.body.field, 'email', 'display failed field');
	  assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');
          done();
        });
    });

    it("Login with an invalid email", (done) => {
      chai.request(app)
        .post('/customers/login')
	.send({email: 'example'})
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the email is invalid');
	  assert.equal(res.body.field, 'email', 'display failed field');
	  assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid customer field');
          done();
        });
    });

    it("Login without providing a password", (done) => {
      chai.request(app)
        .post('/customers/login')
      	.send({email: 'example@example.com'})
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the password is empty');
	  assert.equal(res.body.field, 'password', 'display failed field');
	  assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');
          done();
        });
    });

    it("Login with an invalid email and password combination", (done) => {
      chai.request(app)
        .post('/customers/login')
	.send({email: new Date().getTime() + '@example.com', password: 'example' })
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the email is invalid');
	  assert.equal(res.body.code, 'USR_01', 'USR_01 code for an invalid customer field');
          done();
        });
    });

    it("Login with a valid email and password combination", (done) => {
      chai.request(app)
        .post('/customers/login')
    	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
        .end((err, res) => {
    	  assert.equal(res.status, 200, 'respond with status 400 when the email is invalid');
	  assert.property(res.body, 'customer', 'contains a customer object');
	  assert.property(res.body, 'accessToken', 'contains an access token');
	  assert.property(res.body, 'expires_in', 'contains an access token expiration time');
          done();
        });
    });

  });

  // Facebook login
  describe("POST /customers/facebook", () => {
    it("Login without providing an access token", (done) => {
      chai.request(app)
        .post('/customers/facebook')
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the access token is empty');
	  assert.equal(res.body.field, 'access_token', 'display failed field');
	  assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');
          done();
        });
    });

    it("Login with an invalid access token", (done) => {
      chai.request(app)
        .post('/customers/facebook')
        .send({access_token: 'test' + new Date().getTime()})
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the access token is invalid');
	  assert.equal(res.body.code, 'USR_01', 'USR_01 code for an invalid access token');
          done();
        });
    });

  });


  // Register customer
  describe("POST /customers", () => {
    it("Register without providing a name field", (done) => {
      chai.request(app)
        .post('/customers')
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the name is empty');
	  assert.equal(res.body.field, 'name', 'display failed field');
	  assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');
          done();
        });
    });

    it("Register without providing an email field", (done) => {
      chai.request(app)
        .post('/customers')
        .send({name: 'Example'})
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the email is empty');
	  assert.equal(res.body.field, 'email', 'display failed field');
	  assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');
          done();
        });
    });

    it("Register with an invalid email field", (done) => {
      chai.request(app)
        .post('/customers')
        .send({name: 'Example', email: 'example'})
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the email is invalid');
	  assert.equal(res.body.field, 'email', 'display failed field');
	  assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid customer field');
          done();
        });
    });


    it("Register without providing an password field", (done) => {
      chai.request(app)
        .post('/customers')
        .send({name: 'Example', email: 'example@example.com'})
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the password is empty');
	  assert.equal(res.body.field, 'password', 'display failed field');
	  assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');
          done();
        });
    });

    it("Register with an email that already exists", (done) => {
      chai.request(app)
        .post('/customers')
        .send({name: 'Example', email: process.env.TEST_USER_EMAIL, password: 'example'})
        .end((err, res) => {
	  assert.equal(res.status, 400, 'respond with status 400 when the email already exists');
	  assert.equal(res.body.field, 'email', 'display failed field');
	  assert.equal(res.body.code, 'USR_01', 'USR_01 code for an invalid customer field');
          done();
        });
    });

    
  });
  
});
