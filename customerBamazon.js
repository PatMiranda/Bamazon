var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "Ledger88",
    database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("this is the id "+ connection.threadId);
    showStore();
    // purchaseItems();
});


function showStore (){
    var inventory = "SELECT*FROM products";
    connection.query(inventory, function(err, data){
        var storeShelf = "";
        for (i = 0; i < data.length; i++){
            storeShelf = "Item ID: " + data[i].item_id + "\n Product Name: " + data[i].product_name +
            "\n Department: " + data[i].department_name + "\n Price: " + data[i].price + "\n Quantity: " +
            data[i].stock_quantity;
            console.log(storeShelf);
            
        }
        purchaseItems();
    });
}
var itemId;
function purchaseItems (){
    inquirer.prompt({
        type: "input",
        name: "item_id",
        message: "Please enter the Item ID which you would like to purchase(1-10).",
        filter: Number
    }).then(function(input){
         itemId = input.item_id;
        if (itemId > 12 || itemId < 1){
            console.log("Please select an ID with a number between 1 and 10.");
            purchaseItems();
        } else {
            inquirer.prompt({
                type: "input",
                name: "quantity",
                message: "How many units would you like to purchase?",
                filter: Number
            }).then(function(input){
               
                var quantity = input.quantity;
                var query = "SELECT*FROM products WHERE item_id = " + itemId;

                connection.query(query, function(err, data){
                    var productData = data[0];
                    var stockQuantity = productData.stock_quantity;
                    console.log("This is product data " + JSON.stringify(productData));
                    if (err) throw err;

                    if (quantity > stockQuantity){
                        console.log("We're sorry, we do not have enough to fill your order. We currently have " +stockQuantity + " copies of " + productData.product_name);
                        showStore();
                    }

                    if (quantity <= stockQuantity){
                        var newStock = stockQuantity - quantity;
                        console.log("We have enough product in stock. You have ordered " + quantity + " copies of " + productData.product_name);
                        console.log("You're total is $" + productData.price * quantity);
                        var updateQuery = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newStock
                                },
                                {
                                    item_id : itemId
                                }

                            ]
                        );
                    newPurchase();
                    } 
                });
            });
        }
        });
    }

    function newPurchase(){
        inquirer.prompt({
            type: "checkbox",
            message: "Would you like to continue shopping with us?",
            name: "continue",
            choices: ["yes", "no"]
        }).then(function(input){
            if (input.continue == "yes"){
                showStore();
            }
            if (input.continue == "no"){
                console.log("GoodBye!");
                connection.end();
            }
        });
    }