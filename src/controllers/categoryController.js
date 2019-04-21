var Category = require('../db/models/category');


/* Get Categories */
exports.getCategoryList = function(req, res) {
  Category.getCategoryList().then(function(data) {
    res.json(data);
  });

};

/* Get Category by ID */
exports.getCategoryById = function(req, res) {
  Category.getCategoryById(req.params.categoryId).then(function(data) {
    res.json(data);
  });

};

/* Get Categories of a Product */
exports.getProductCategories = function(req, res) {
  Category.getProductCategories(req.params.productId).then(function(data) {
    res.json(data);
  });
};

/* Get Categories of a Department */
exports.getDepartmentCategories = function(req, res) {
  Category.getDepartmentCategories(req.params.departmentId).then(function(data) {
    res.json(data);
  });
};
