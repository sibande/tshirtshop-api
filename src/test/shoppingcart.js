var chai = require('chai');
var assert = require('chai').assert;

var chaiHttp = require('chai-http');

var app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("Shopping Cart", () => {

  // Generate a Unique Id
  describe("GET /shoppingcart/generateUniqueId", () => {
    it("Generate the unique cart id", (done) => {
      chai.request(app)
        .get('/shoppingcart/generateUniqueId')
        .end((err, res) => {
	  assert.equal(res.status, 200, 'respond with status 200 everytime, no reason for this to fail');
	  assert.property(res.body, 'cart_id', 'contains the cart id');
          done();
        });
    });

  });

});
