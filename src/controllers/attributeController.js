

/* Get Attribute list */
exports.getAttributes = function(req, res) {
  res.render('index', { title: 'Get Attribute list' });
};

/* Get Attribute by ID */
exports.getAttributeById = function(req, res) {
  res.render('index', { title: 'Get Attribute by ID' });
};

/* Get Values Attribute from Atribute */
exports.getAttributeValues = function(req, res) {
  res.render('index', { title: 'Get Values Attribute from Atribute' });
};

/* Get all Attributes with Produt ID */
exports.getProductAttributes = function(req, res) {
  res.render('index', { title: 'Get Values Attribute from Atribute' });
};

