USE bamazon_db;
CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT,
    PRIMARY KEY (id)
);

ALTER TABLE products
MODIFY COLUMN price DECIMAL(10,2) NOT NULL;

SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot", "Electronics", 29.99, 150);