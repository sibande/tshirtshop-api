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

-- Create shopping_cart_add_product stored procedure
DROP PROCEDURE IF EXISTS shopping_cart_add_product $$

CREATE PROCEDURE shopping_cart_add_product(IN inCartId CHAR(32),
  IN inProductId INT, IN inAttributes VARCHAR(1000))
BEGIN
  DECLARE productQuantity INT;

  -- Obtain current shopping cart quantity for the product
  SELECT quantity
  FROM   shopping_cart
  WHERE  cart_id = inCartId
         AND product_id = inProductId
         AND attributes = inAttributes
  INTO   productQuantity;

  -- Create new shopping cart record, or increase quantity of existing record
  IF productQuantity IS NULL THEN
    INSERT INTO shopping_cart(item_id, cart_id, product_id, attributes,
                              quantity, added_on)
           VALUES (NULL, inCartId, inProductId, inAttributes, 1, NOW());
  ELSE
    UPDATE shopping_cart
    SET    quantity = quantity + 1, buy_now = true
    WHERE  cart_id = inCartId
           AND product_id = inProductId
           AND attributes = inAttributes;
  END IF;
END$$

-- Create catalog_count_products_on_catalog stored procedure
DROP PROCEDURE IF EXISTS catalog_count_products_on_catalog $$

CREATE PROCEDURE catalog_count_products_on_catalog()
BEGIN
  SELECT COUNT(*) AS products_on_catalog_count
  FROM   product;
END$$

-- Create catalog_get_products_on_catalog stored procedure
DROP PROCEDURE IF EXISTS catalog_get_products_on_catalog $$

CREATE PROCEDURE catalog_get_products_on_catalog(
  IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  PREPARE statement FROM
    "SELECT   product_id, name,
              IF(LENGTH(description) <= ?,
                 description,
                 CONCAT(LEFT(description, ?),
                        '...')) AS description,
              price, discounted_price, thumbnail
     FROM     product
     ORDER BY display DESC
     LIMIT    ?, ?";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inStartItem;
  SET @p4 = inProductsPerPage;

  EXECUTE statement USING @p1, @p2, @p3, @p4;
END$$

-- Create catalog_count_products_on_department stored procedure
DROP PROCEDURE IF EXISTS catalog_count_products_on_department $$

CREATE PROCEDURE catalog_count_products_on_department(IN inDepartmentId INT)
BEGIN
  SELECT DISTINCT COUNT(*) AS products_on_department_count
  FROM            product p
  INNER JOIN      product_category pc
                    ON p.product_id = pc.product_id
  INNER JOIN      category c
                    ON pc.category_id = c.category_id
  WHERE           (p.display = 2 OR p.display = 3)
                  AND c.department_id = inDepartmentId;
END$$

-- Create catalog_get_products_on_department stored procedure
DROP PROCEDURE IF EXISTS catalog_get_products_on_department $$

CREATE PROCEDURE catalog_get_products_on_department(
  IN inDepartmentId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  PREPARE statement FROM
    "SELECT DISTINCT p.product_id, p.name,
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
     ORDER BY        p.display DESC
     LIMIT           ?, ?";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inDepartmentId;
  SET @p4 = inStartItem;
  SET @p5 = inProductsPerPage;

  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5;
END$$


-- Create shopping_cart_get_products stored procedure
DROP PROCEDURE IF EXISTS shopping_cart_get_products $$

CREATE PROCEDURE shopping_cart_get_products(IN inCartId CHAR(32))
BEGIN
  SELECT     sc.item_id, p.name, sc.attributes,
             COALESCE(NULLIF(p.discounted_price, 0), p.price) AS price,
             sc.quantity, sc.product_id,
	     p.thumbnail AS image,	
             COALESCE(NULLIF(p.discounted_price, 0),
                      p.price) * sc.quantity AS subtotal
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND sc.buy_now ORDER BY sc.item_id ASC;
END$$


-- Create orders_get_order_short_details stored procedure
DROP PROCEDURE IF EXISTS orders_get_order_short_details $$

CREATE PROCEDURE orders_get_order_short_details(IN inOrderId INT)
BEGIN
  SELECT      o.order_id, o.total_amount, o.created_on,
              o.shipped_on, o.status, c.name, c.customer_id
  FROM        orders o
  INNER JOIN  customer c
                ON o.customer_id = c.customer_id
  WHERE       o.order_id = inOrderId;
END$$


-- Create orders_get_order_info stored procedure
DROP PROCEDURE IF EXISTS orders_get_order_info $$

CREATE PROCEDURE orders_get_order_info(IN inOrderId INT)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on, o.shipped_on,
             o.status, o.comments, o.customer_id, o.auth_code,
             o.reference, o.shipping_id, s.shipping_type, s.shipping_cost,
             o.tax_id, t.tax_type, t.tax_percentage, c.customer_id
  FROM       orders o
  INNER JOIN  customer c
               ON o.customer_id = c.customer_id
  INNER JOIN tax t
               ON t.tax_id = o.tax_id
  INNER JOIN shipping s
               ON s.shipping_id = o.shipping_id
  WHERE      o.order_id = inOrderId;
END$$



-- Create shopping_cart_get_saved_products stored procedure
DROP PROCEDURE IF EXISTS shopping_cart_get_saved_products $$

CREATE PROCEDURE shopping_cart_get_saved_products(IN inCartId CHAR(32))
BEGIN
  SELECT     sc.item_id, p.name, sc.attributes, p.thumbnail as image,
             COALESCE(NULLIF(p.discounted_price, 0), p.price) AS price
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND NOT sc.buy_now;
END$$


-- Create customer_update_account stored procedure
DROP PROCEDURE IF EXISTS customer_update_account $$

CREATE PROCEDURE customer_update_account(IN inCustomerId INT,
  IN inName VARCHAR(50), IN inEmail VARCHAR(100),
  IN inPassword VARCHAR(50), IN inDayPhone VARCHAR(100),
  IN inEvePhone VARCHAR(100), IN inMobPhone VARCHAR(100))
BEGIN

  IF inPassword IS NULL OR inPassword = '' THEN
    -- Don't update password
    UPDATE customer
    SET    name = inName, email = inEmail,
         day_phone = inDayPhone,
         eve_phone = inEvePhone, mob_phone = inMobPhone
    WHERE  customer_id = inCustomerId;
  ELSE
    UPDATE customer
    SET    name = inName, email = inEmail,
         password = inPassword, day_phone = inDayPhone,
         eve_phone = inEvePhone, mob_phone = inMobPhone
    WHERE  customer_id = inCustomerId;
  END IF;
END$$


-- Create catalog_get_products_on_department stored procedure
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
     WHERE           c.department_id = ?
     GROUP BY        p.product_id
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


