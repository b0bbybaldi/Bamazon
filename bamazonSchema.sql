DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iron Man's Helmet", "Electronics", 20.00, 10), ("Thor's Hammer", "Power Tools", 15.00, 10), ("Wonder Woman's Shield", "Toys", 5.00, 10), ("Batman's Belt", "Men's Apparel", 15.00, 10), ("Wolverine's Jacket", "Men's Apparel", 100.00, 10), ("Cinderella's Shoes", "Women's Apparel", 10.00, 20), ("Spider-man jumpsuit", "Customs", 50.00, 10), ("Hulk's Short", "Men's Apparel", 35.00, 10), ("Loki's Hair", "Cosmetics", 100.00, 100), ("Starlord's Spaceship", "Cars & Automotive Parts", 1000.00, 20);