var db = require('../index');


exports.getDepartmentList = function() {
  return db.knex.raw('CALL catalog_get_departments();').then(function(data) {
    data = data[0][0];
    return {count: data.length, rows: data};
  }).catch(function(reason) {
    return {};
  });
};

exports.getDepartmentById = function(departmentId) {
  return db.knex.raw('CALL catalog_get_department_details(?);', [departmentId]).then(function(data) {
    data = data[0][0];
    if (data.length === 0) {  // Not found
      throw 'The department with this ID does not exist.';
    }
    return data[0];
  }).catch(function(reason) {
    return {
      error: {
	status: 404,
	code: 'DEP_01',
	message: reason
      }
    };
  });
};

