var mysql = require("mysql");
var inquirer = require("inquirer");
var cli = require("cli");
var console.table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function prompt() {
  inquirer
    .prompt({
      type: "input",
      name: "item_id",
      message: "Enter an ID for a product you would like to purchase",
    },
    {
      type: "input",
      name: "quantity",
      message: "How many would you like to have?",
    }).then(function(answer) {

      var item = input.item_id;
      var quantity = input.quantity;

      var qstr = "SELECT * FROM products WHERE ?";

      connection.query(qstr, {item-id: item}, function(err, data){
        if(data.length === 0){
          console.log("Invalid ID");
          inventory();
        }else{
          var pdata = data[0];

          if(quantity <= pdata.stock_quantity){
            console.log("Congratz this item is available!")
            var updateqstr = "UPDATE products SET stock_quantity = " + pdata.stock_quantity - quantity + " WHERE item_id = " + item;
          
            connection.query(updateqstr, function(error, data){
              if (error) throw error;
              console.log("Your order had been placed for a total of: " + pdata.price * quantity);
              connection.end();
            })
          }else{
            console.log("Sorry the item is out of stock...")
            inventory();
          }
        }
      })
    });
}

function inventory(){

  qstr = "SELECT * FROM products";

  connection.query(qstr, function(error, data){
    if (error) throw error;

    console.log("Inventory Available:\n")

    var offers = "";

    var offerdisplay =  function(){
      for(var i=0; i<data.length; i++){
        offers = "";
        offers += "ID: " + data[i].item_id + "/n";
        offers += "Name: " + data[i].product_name + "/n";
        offers += "Category: " + data[i].department_name + "/n";
        offers += "Price ($): " + data[i].price + "/n";
      }
      prompt();
    }

    const table = cTable.getTable([{
      offerdisplay
    }])

      console.log(table);

  })
}

function start(){

  inventory();

}

start();


// function sellProduct() {
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "price",
//         type: "input",
//         message: "What is the price for this item?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           product_name: answer.product_name,
//           department_name: answer.department_name,
//           price: answer.price,
//           stock_quantity: answer.stock_quantity
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("You product has been made available to buyers online!");
//           start();
//         }
//       );
//     });
// }

// function buyProduct() {
//   connection.query("SELECT * FROM products", function(err, results) {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What product would you like to buy?"
//         },
//         {
//           name: "buy",
//           type: "input",
//           message: "How many would you like to buy?"
//         }
//       ])
//       .then(function(answer) {
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         if (chosenItem.payment === parseInt(answer.buy * answer.price)) {
//           connection.query(
//             "UPDATE products SET ? WHERE ?",
//             [
//               {
//                 quantity: answer.quantity - answer.buy 
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Product Bought, we will be drone shipping it soon!");
//               start();
//             }
//           );
//         }
//       });
//   });
// }
