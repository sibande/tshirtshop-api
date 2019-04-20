

/* Get All Taxes */
exports.getTaxes = function(req, res) {
  res.render('index', { title: 'Get All Taxes' });
};

/* Get Tax by ID */
exports.getTaxById = function(req, res) {
  res.render('index', { title: 'Get Tax by ID' });
};
