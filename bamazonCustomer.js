var mysql = require("mysql");
var inquirer = require("inquirer");
var cli = require("cli");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "sellOrBuy",
      type: "rawlist",
      message: "Would you like to [SELL] or [BUY] a product?",
      choices: ["SELL", "BUY"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.sellOrBuy.toUpperCase() === "SELL") {
        sellProduct();
      }
      else {
        buyProduct();
      }
    });
}

// function to handle posting new items up for auction
function sellProduct() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to submit?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your auction in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price for this item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO auctions SET ?",
        {
          product_name: answer.product_name,
          department_name: answer.department_name,
          price: answer.price,
          stock_quantity: answer.stock_quantity
        },
        function(err) {
          if (err) throw err;
          console.log("You product has been made available to buyers online!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function buyProduct() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What product would you like to buy?"
        },
        {
          name: "buy",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.payment === parseInt(answer.buy * answer.price)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                quantity: answer.quantity - answer.buy 
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Product Bought, we will be drone shipping it soon!");
              start();
            }
          );
        }
      });
  });
}
