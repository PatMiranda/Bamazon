DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NULL,
department_name VARCHAR(30) NULL,
price DEC (10,2) NULL ,
stock_quantity INT (10) null,
PRIMARY KEY (item_id)
);
 SELECT * FROM products;
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Catan", "Games", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("Star Wars Armada", "Games", 79.99, 100);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("Legend of Drizzt", "Games", 69.99, 100);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("Chess", "Games", 39.99, 100);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("Forbidden Island", "Games", 29.99, 100);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("King of Plagues", "Books", 19.99, 60);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("History of Rome", "Books", 49.99, 30);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("Leviathon Wakes", "Books", 16.99, 100);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("Fear the Sky", "Books", 21.99, 100);
 
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES("Fear the Future", "Books", 22.99, 100);