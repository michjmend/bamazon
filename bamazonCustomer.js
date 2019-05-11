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

// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
connection.connect(function(err) {
  if (err) throw err;
  // run the allItems function after the connection is made to prompt the user
  allItems();
});

// function which prompts the user for what action they should take
function allItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log('Welcome to BAMAZON! Here is a list of all of the items available for sale:')
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    start();
  });
}
// The app should then prompt users with two messages.
function start() {
  inquirer
    .prompt(
      {
        name: "idNumber",
        type: "input",
        // The first should ask them the ID of the product they would like to buy.
        message: "What would you like to buy? Choose the item you would like to purchase by inputting the ID number of that item.",
      },
      {
        name: "quantity",
        type: "input",
        // The second message should ask how many units of the product they would like to buy.
        message: "Awesome! How many would you like?",
      }
    ) .then(function(answer) {
      // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
    });
}
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
