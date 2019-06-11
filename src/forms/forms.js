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
