

/* Get Departments */
exports.getDepartments = function(req, res) {
  res.render('index', { title: 'Get Departments' });
};

/* Get Department by ID */
exports.getDepartmentById = function(req, res) {
  res.render('index', { title: 'Get Department by ID' });
};
