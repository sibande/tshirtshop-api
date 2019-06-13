var Category = require('../db/models/category');
var response = require('./../utils/response.js');


/* Get Categories */
exports.getCategoryList = function(req, res) {
  Category.getCategoryList().then(function(data) {
    response.sendResponse(data, req, res);
  });

};

/* Get Category by ID */
exports.getCategoryById = function(req, res) {
  Category.getCategoryById(req.params.category_id).then(function(data) {
    response.sendResponse(data, req, res);
  });

};

/* Get Categories of a Product */
exports.getProductCategories = function(req, res) {
  Category.getProductCategories(req.params.product_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};

/* Get Categories of a Department */
exports.getDepartmentCategories = function(req, res) {
  Category.getDepartmentCategories(req.params.department_id).then(function(data) {
    response.sendResponse(data, req, res);
  });
};
