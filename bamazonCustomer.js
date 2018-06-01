var mysql = require("mysql");
var inquirer = require("inquirer");
var cli = require("cli");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon"
});

connection.connect(function(error) {
  if (error) throw error;
  //start();
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

      connection.query(qstr, {item_id: item}, function(err, data){
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

    // var offerdisplay =  function(){
      for(var i=0; i<data.length; i++){
        offers = "";
        offers += "ID: " + data[i].item_id + " ";
        offers += "Name: " + data[i].product_name + " ";
        offers += "Category: " + data[i].department_name + " ";
        offers += "Price ($): " + data[i].price + " ";
        console.log(offers)
      }
    prompt();
    // }
      
    // const table = cTable.getTable([{
      // console.log(offerdisplay)
    // }])

      // console.log(table);

  })
}

function start(){

  inventory();

}

start();

