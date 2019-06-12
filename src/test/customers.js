
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
    	  assert.equal(res.status, 200, 'respond with status 200 when the email is invalid');
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


  // Get customer
  describe("GET /customer", () => {

    it("Get a customer without a User-Key header", (done) => {
      chai.request(app)
        .get('/customer')
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is empty');
	  assert.equal(res.body.code, 'AUT_01', 'AUT_01 code for an empty User-Key header');
          done();
        });
    });

    it("Get a customer without an invalid User-Key header", (done) => {
      chai.request(app)
        .get('/customer')
	.set('User-Key', 'Bearer ' + new Date().getTime())
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is invalid');
	  assert.equal(res.body.code, 'AUT_02', 'AUT_02 code for an invalid User-Key header');
          done();
        });
    });


    it("Get a customer with a valid User-Key header", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Get customer
	  chai.request(app)
            .get('/customer')
	    .set('User-Key', res.body.accessToken)
            .end((err, res) => {
	      assert.equal(res.status, 200, 'respond with status 200 when the User-Key header is valid');
	      assert.property(res.body, 'customer_id', 'contains a customer ID');
              done();
            });
	});
    });

    

  });


  // Update customer
  describe("PUT /customer", () => {

    it("Update a customer without a User-Key header", (done) => {
      chai.request(app)
        .put('/customer')
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is empty');
	  assert.equal(res.body.code, 'AUT_01', 'AUT_01 code for an empty User-Key header');
          done();
        });
    });

    it("Update a customer without an invalid User-Key header", (done) => {
      chai.request(app)
        .put('/customer')
	.set('User-Key', 'Bearer ' + new Date().getTime())
        .end((err, res) => {
	  assert.equal(res.status, 401, 'respond with status 401 when the User-Key header is invalid');
	  assert.equal(res.body.code, 'AUT_02', 'AUT_02 code for an invalid User-Key header');
          done();
        });
    });

    it("Update a customer with an empty name", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the name is empty');
	      assert.equal(res.body.field, 'name', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');

              done();
            });
	});
    });

    it("Update a customer with an empty email", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
	    .send({name: 'Example'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the email is empty');
	      assert.equal(res.body.field, 'email', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required customer field');

              done();
            });
	});
    });

    
    it("Update a customer with an invalid email", (done) => {
      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
	    .send({name: 'Example', email: 'example'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the email is invalid');
	      assert.equal(res.body.field, 'email', 'display failed field');
	      assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid customer field');
              done();
            });
	});
    });

    it("Update a customer with an invalid day phone", (done) => {
      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
	    .send({name: 'Example', email: process.env.TEST_USER_EMAIL, day_phone: 'invalid'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the day phone is invalid');
	      assert.equal(res.body.field, 'day_phone', 'display failed field');
	      assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid customer field');
              done();
            });
	});
    });

    it("Update a customer with an invalid eve phone", (done) => {
      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
	    .send({name: 'Example', email: process.env.TEST_USER_EMAIL, eve_phone: 'invalid'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the eve phone is invalid');
	      assert.equal(res.body.field, 'eve_phone', 'display failed field');
	      assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid customer field');
              done();
            });
	});
    });

    it("Update a customer with an invalid mob phone", (done) => {
      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
	    .send({name: 'Example', email: process.env.TEST_USER_EMAIL, mob_phone: 'invalid'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the mob phone is invalid');
	      assert.equal(res.body.field, 'mob_phone', 'display failed field');
	      assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid customer field');
              done();
            });
	});
    });


    it("Update a customer with a valid name and email", (done) => {
      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
	    .send({name: 'Example', email: process.env.TEST_USER_EMAIL})
            .end((err, res) => {
	      assert.equal(res.status, 200, 'respond with status 200 on success');
	      assert.property(res.body, 'customer_id', 'contains a customer_id');
              done();
            });
	});
    });

    it("Update a customer with a valid name, email, day_phone, eve_phone, and mob_phone", (done) => {
      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customer')
	    .set('User-Key', res.body.accessToken)
	    .send({
	      name: 'Example',
	      email: process.env.TEST_USER_EMAIL,
	      day_phone: '+27110000000',
	      eve_phone: '+27210000000',
	      mob_phone: '+27720000000'
	    }).end((err, res) => {
	      assert.equal(res.status, 200, 'respond with status 200 on success');
	      assert.property(res.body, 'customer_id', 'contains a customer_id');
              done();
            });
	});
    });

  });

  // Update customer
  describe("PUT /customers/address", () => {

    it("Update a address with an empty address 1 field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the address 1 is empty');
	      assert.equal(res.body.field, 'address_1', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required address field');

              done();
            });
	});
    });


    it("Update a address with an empty city field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({address_1: 'Example Address 1'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the city is empty');
	      assert.equal(res.body.field, 'city', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required address field');

              done();
            });
	});
    });

    it("Update a address with an empty region field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({address_1: 'Example Address 1', city: 'Pretoria'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the region is empty');
	      assert.equal(res.body.field, 'region', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required address field');

              done();
            });
	});
    });

    it("Update a address with an empty postal_code field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({address_1: 'Example Address 1', city: 'Pretoria', region: 'Gauteng'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the postal_code is empty');
	      assert.equal(res.body.field, 'postal_code', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required address field');

              done();
            });
	});
    });


    it("Update a address with an empty country field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({address_1: 'Example Address 1', city: 'Pretoria', region: 'Gauteng', postal_code: '0001'})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the country is empty');
	      assert.equal(res.body.field, 'country', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required address field');
              done();
            });
	});
    });

    it("Update a address with an empty shipping_region_id field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({
	      address_1: 'Example Address 1',
	      city: 'Pretoria',
	      region: 'Gauteng',
	      postal_code: '0001',
	      country: 'South Africa'
	    }).end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the shipping region ID is empty');
	      assert.equal(res.body.field, 'shipping_region_id', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required address field');
              done();
            });
	});
    });

    it("Update a address with an invalid shipping_region_id field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({
	      address_1: 'Example Address 1',
	      city: 'Pretoria',
	      region: 'Gauteng',
	      postal_code: '0001',
	      shipping_region_id: 'invalid',
	      country: 'South Africa'
	    }).end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the shipping region ID is invalid');
	      assert.equal(res.body.field, 'shipping_region_id', 'display failed field');
	      assert.equal(res.body.code, 'USR_03', 'USR_03 code for an invalid address field');
              done();
            });
	});
    });

    it("Update a address with valid details", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/address')
	    .set('User-Key', res.body.accessToken)
	    .send({
	      address_1: 'Example Address 1',
	      city: 'Pretoria',
	      region: 'Gauteng',
	      postal_code: '0001',
	      shipping_region_id: '3',
	      country: 'South Africa'
	    }).end((err, res) => {
    	      assert.equal(res.status, 200, 'respond with status 200 when the email is invalid');
	      assert.property(res.body, 'customer_id', 'contains a customer ID');
              done();
            });
	});
    });


  });


    // Update customer
  describe("PUT /customers/creditCard", () => {

    it("Update a credit card with an empty field", (done) => {

      // Login first
      chai.request(app)
	.post('/customers/login')
	.send({email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD})
	.end((err, res) => {
	  // Update customer
	  chai.request(app)
            .put('/customers/creditCard')
	    .set('User-Key', res.body.accessToken)
	    .send({})
            .end((err, res) => {
	      assert.equal(res.status, 400, 'respond with status 400 when the credit card field is empty');
	      assert.equal(res.body.field, 'credit_card', 'display failed field');
	      assert.equal(res.body.code, 'USR_02', 'USR_02 code for a required address field');

              done();
            });
	});
    });

  });

  
});
