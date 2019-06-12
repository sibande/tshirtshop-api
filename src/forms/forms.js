var validate = require("validate.js");


var loginConstraints = {
  email: {
    presence: {allowEmpty: false},
    email: true
  },
  password: {
    presence: {allowEmpty: false}
  }
};
exports.loginConstraints = loginConstraints;


var facebookLoginConstraints = {
  access_token: {
    presence: {allowEmpty: false}
  }
};
exports.facebookLoginConstraints = facebookLoginConstraints;


var registerConstraints = {
  name: {
    presence: {allowEmpty: false}
  },
  email: {
    presence: {allowEmpty: false},
    email: true
  },
  password: {
    presence: {allowEmpty: false}
  }
};
exports.registerConstraints = registerConstraints;


var customerConstraints = {
    name: {
      presence: {allowEmpty: false}
    },
    email: {
      presence: {allowEmpty: false},
      email: true
    },
    day_phone: {
      presence: false,
      format: {
	pattern: /(\+?\d{6,22})?/,
	message: "format invalid, only numeric values allowed"
      }
    },
    eve_phone: {
      presence: false,
      format: {
	pattern: /(\+?\d{6,22})?/,
	message: "format invalid, only numeric values allowed"
      }
    },
    mob_phone: {
      presence: false,
      format: {
	pattern: /(\+?\d{6,22})?/,
	message: "format invalid, only numeric values allowed"
      }
    },
    password: {
      presence: false
    }
};
exports.customerConstraints = customerConstraints;


var addressConstraints = {
    address_1: {
      presence: {allowEmpty: false}
    },
    city: {
      presence: {allowEmpty: false}
    },
    region: {
      presence: {allowEmpty: false}
    },
    postal_code: {
      presence: {allowEmpty: false}
    },
    country: {
      presence: {allowEmpty: false}
    },
    shipping_region_id: {
      presence: {allowEmpty: false},
      numericality: {onlyInteger: true}
    }
};
exports.addressConstraints = addressConstraints;


var creditCardConstraints = {
  credit_card: {
    presence: {allowEmpty: false}
  }
};
exports.creditCardConstraints = creditCardConstraints;


var orderConstraints = {
  cart_id: {
    presence: {allowEmpty: false}
  },
  shipping_id: {
    presence: {allowEmpty: false},
    numericality: {onlyInteger: true}
  },
  tax_id: {
    presence: {allowEmpty: false},
    numericality: {onlyInteger: true}
  }
};
exports.orderConstraints = orderConstraints;


var stripeConstraints = {
  stripeToken: {
    presence: {allowEmpty: false}
  },
  order_id: {
    presence: {allowEmpty: false},
    numericality: {onlyInteger: true}
  },
  description: {
    presence: {allowEmpty: false}
  },
  amount: {
    presence: {allowEmpty: false},
    numericality: {onlyInteger: true}
  }
};
exports.stripeConstraints = stripeConstraints;


function validateForm(constraints, data) {
  var errors = validate(data, constraints, {format: "detailed"});


  if (errors) {
    var error = errors[0];

    var errorResponse = {
      code: error.validator == 'presence' ? 'USR_02' : 'USR_03',
      message: error.error,
      field: error.attribute,
      status: 400
    };

    return errorResponse;
  }

  return false;
}


exports.validateForm = validateForm;
