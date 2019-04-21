


exports.getCategoryList = function(req, res) {
  res.render('index', { title: 'Get Categories.' });
};

exports.getCategoryById = function(req, res) {
  res.render('index', { title: 'Get Category by ID.' });
};

exports.getProductCategories = function(req, res) {
  res.render('index', { title: 'Get Categories of a Product' });
};

exports.getDepartmentCategories = function(req, res) {
  res.render('index', { title: 'Get Categories of a Department' });
};
