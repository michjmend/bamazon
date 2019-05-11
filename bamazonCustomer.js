var mysql = require("mysql");
var inquirer = require("inquirer");
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mm050891",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  // run the allItems function after the connection is made to prompt the user
  allItems();
  console.log('Welcome to BAMAZON!');
  console.log("-----------------------------------");
});

// function which prompts the user for what action they should take
function allItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log('Here is a list of all of the items available for sale. What would you like to order?')
    console.log("-----------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    start();
  });
}
// The app should then prompt users with two messages.
function start() {
  inquirer.prompt([
    {
      name: "IdNumber",
      type: "input",
      // The first should ask them the ID of the product they would like to buy.
      message: "Please enter the ID number of the item you'd like to purchase.",
    },
    {
      name: "QuantityNumber",
      type: "input",
      // The second message should ask how many units of the product they would like to buy.
      message: "Awesome! How many would you like?"
    }
  ]).then(function(answer) {
    var query = "SELECT id, stock_quantity FROM products WHERE ?";
    connection.query(query, { id: answer.IdNumber }, function(err, res) {
      if(err){console.log(err)};
      // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
      if (answer.QuantityNumber <= res[0].stock_quantity) {
        // However, if your store does have enough of the product, you should fulfill the customer's order.
        console.log("-----------------------------------");
        // Once the update goes through, show the customer the total cost of their purchase.
        var totalCost = parseFloat(res[0].price * answer.QuantityNumber);
        console.log('Order is complete! Your total for this purchase is: $' + totalCost);
        stockUpdate(answer.IdNumber, answer.QuantityNumber);
      } else {
        insufficientQuantity();
        };
    });
  });
}
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
function insufficientQuantity() {
  console.log('-----------------------------------\nSorry, we are either out of stock or have less than the quantity you have chosen!\nPlease choose another item and/or quantity.\n-----------------------------------');
  start();
}
 // This means updating the SQL database to reflect the remaining quantity.
function stockUpdate(id, qty) {
  //UPDATE products SET stock_quantity = stock_quantity - 3 WHERE id = 1
      var query = "UPDATE products SET stock_quantity = stock_quantity - " + qty + " WHERE id = " + id;
      connection.query(query, function(err, res) {
        if(res.affectedRows == 1){//SUCCESS
          allItems();
        };
      });
}
