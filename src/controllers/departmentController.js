var Department = require('../db/models/department');


/* Get Departments */
exports.getDepartmentList = function(req, res) {
  Department.getDepartmentList().then(function(data) {
    res.json(data);
  });
};

/* Get Department by ID */
exports.getDepartmentById = function(req, res) {
  Department.getDepartmentById(req.params.departmentId).then(function(data) {
    res.json(data);
  });
};
