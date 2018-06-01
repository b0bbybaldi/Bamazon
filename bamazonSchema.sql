DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iron Man's Helmet", "Electronics", 20, 1), ("Thor's Hammer", "Power Tools", 15, 1), ("Wonder Woman's Shield", "Toys", 5, 1), ("Batman's Belt", "Men's Apparel", 15, 1), ("Wolverine's Jacket", "Men's Apparel", 100, 1), ("Cinderella's Shoes", "Women's Apparel", 1, 2), ("Spider-man jumpsuit", "Customs", 50, 1), ("Hulk's Short", "Men's Apparel", 35, 10), ("Loki's Hair", "Cosmetics", 100, 100), ("Starlord's Spaceship", "Cars & Automotive Parts", 1000, 2);