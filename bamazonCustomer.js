var mysql = require("mysql");
var inquirer = require("inquirer");
// var cli = require("cli");
// var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon"
});


function validateIn(val){
  var int = Number.isInteger(parseFloat(val));
  var sign = Math.sign(val);

  if(int && (sign === 1)){
    return true;
  }else{
    return "Please enter an integer."
  }
}

function transact() {
  inquirer
    .prompt([{
      type: "input",
      name: "item_id",
      message: "Enter an ID for a product you would like to purchase",
      validate: validateIn,
      filter: Number
    },
    {
      type: "input",
      name: "quantity",
      message: "How many would you like to have?",
      validate: validateIn,
      filter: Number
    }]).then(function(input) {

      var item = input.item_id;
      var quantity = input.quantity;

      var queryString = "SELECT * FROM products WHERE ?";

      connection.query(queryString, {item_id: item}, function(error, data){
        if (error) throw error;

        if(data.length === 0){
          console.log("\n Invalid ID \n");
          inventoryDisp();
        }else{
          var prodData = data[0];

          if(quantity < prodData.stock_quantity){
            console.log("\n Congratz this item is available! \n")
            var updateQ = "UPDATE products SET stock_quantity = " + (prodData.stock_quantity - quantity) + " WHERE item_id = " + item;
          
            connection.query(updateQ, function(error, data){
              if (error) throw error;
              console.log("\n Your order had been placed for a total of: " + prodData.price * quantity+"\n");
              connection.end();
            })
          }else{
            console.log("\n Sorry the item is out of stock... \n")
            inventoryDisp();
          }
        }
      })
    });
}

function inventoryDisp(){

  queryString = "SELECT * FROM products";

  connection.query(queryString, function(error, data){
    if (error) throw error;

    console.log("\n Inventory Available:\n")

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
    transact();
    // }
      
    // const table = cTable.getTable([{
      // console.log(offerdisplay)
    // }])

      // console.log(table);

  })
}

function start(){

  inventoryDisp();

}

start();

