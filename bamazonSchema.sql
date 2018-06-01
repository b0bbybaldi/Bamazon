DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  category VARCHAR(45) NOT NULL,
  price INT default 0,
  quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (item_name, category, price, quantity)
VALUES ("Iron Man's Helmet", "Electronics", 20, 1), ("Thor's Hammer", "Power Tools", 15, 1), ("Wonder Woman's Shield", "Toys", 5, 1);