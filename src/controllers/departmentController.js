var Department = require('../db/models/department');
var response = require('./../utils/response.js');


/* Get Departments */
exports.getDepartmentList = function(req, res) {
  Department.getDepartmentList().then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get Department by ID */
exports.getDepartmentById = function(req, res) {
  Department.getDepartmentById(req.params.department_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};
