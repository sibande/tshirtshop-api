-- Change DELIMITER to $$
DELIMITER $$

-- Create tax_get_taxes stored procedure
DROP PROCEDURE IF EXISTS tax_get_taxes $$

CREATE PROCEDURE tax_get_taxes()
BEGIN
  SELECT tax_id, tax_type, tax_percentage
  FROM   tax
  ORDER BY tax_id;
END$$

-- Create tax_get_tax_details stored procedure
DROP PROCEDURE IF EXISTS tax_get_tax_details $$

CREATE PROCEDURE tax_get_tax_details(IN inTaxId INT)
BEGIN
  SELECT tax_id, tax_type, tax_percentage
  FROM   tax
  WHERE  tax_id = inTaxId;
END$$


-- Create catalog_get_categories stored procedure
DROP PROCEDURE IF EXISTS catalog_get_categories $$

CREATE PROCEDURE catalog_get_categories()
BEGIN
  SELECT   category_id, name, description, department_id
  FROM     category
  ORDER BY category_id;
END$$

-- Create catalog_get_category_details stored procedure
DROP PROCEDURE IF EXISTS catalog_get_category_details $$

CREATE PROCEDURE catalog_get_category_details(IN inCategoryId INT)
BEGIN
  SELECT category_id, name, description, department_id
  FROM   category
  WHERE  category_id = inCategoryId;
END$$

-- Create catalog_get_departments_list stored procedure
DROP PROCEDURE IF EXISTS catalog_get_departments_list $$

CREATE PROCEDURE catalog_get_departments_list()
BEGIN
  SELECT department_id, name, description
  FROM department
  ORDER BY department_id;
END$$

-- Create catalog_get_department_details stored procedure
DROP PROCEDURE IF EXISTS catalog_get_department_details $$

CREATE PROCEDURE catalog_get_department_details(IN inDepartmentId INT)
BEGIN
  SELECT department_id, name, description
  FROM   department
  WHERE  department_id = inDepartmentId;
END$$

-- Create catalog_get_products_on_department stored procedure
-- Issue with DISTINCT https://stackoverflow.com/a/5391642
DROP PROCEDURE IF EXISTS catalog_get_products_on_department $$

CREATE PROCEDURE catalog_get_products_on_department(
  IN inDepartmentId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  PREPARE statement FROM
    "SELECT p.product_id, p.name,
                     IF(LENGTH(p.description) <= ?,
                        p.description,
                        CONCAT(LEFT(p.description, ?),
                               '...')) AS description,
                     p.price, p.discounted_price, p.thumbnail
     FROM            product p
     INNER JOIN      product_category pc
                       ON p.product_id = pc.product_id
     INNER JOIN      category c
                       ON pc.category_id = c.category_id
     WHERE           (p.display = 2 OR p.display = 3)
                     AND c.department_id = ?
     GROUP BY p.product_id
     ORDER BY        p.display DESC
     LIMIT           ?, ?";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inDepartmentId;
  SET @p4 = inStartItem;
  SET @p5 = inProductsPerPage;

  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5;
END$$


-- Change back DELIMITER to ;
DELIMITER ;
