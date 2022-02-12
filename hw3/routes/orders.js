/**
 * Created By Aashish Anand
 * orders.js: meant to handle get and post requests from client side
 * Date created: 2/1/2022
 */

//JSON array that gives hard-coded values of topping and quantity
const orderArray = {
    "orderData": 
    [
        {
            topping: "cherry", 
            quantity: 3
        }, 
        {
            topping: "chocolate", 
            quantity: 5
        }, 
        {
            topping: "plain", 
            quantity: 2
        }
    ]
};

var express = require('express');
var router = express.Router();
var dbms = require('./dbms_promise');

/* GET orders data: hard-coded at the moment */
router.get('/', function(req, res, next) {
    res.json(orderArray);
});

/* Handling POST request for orderArray */
router.post('/', function(req, res, next) {
    //using dbms to handle real-time POST request
    var promiseCherry = dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE MONTH='" + req.body.selectedMonth + "' AND TOPPING='Cherry';");
    var promiseChocolate = dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE MONTH='" + req.body.selectedMonth + "' AND TOPPING='Chocolate';");
    var promisePlain = dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE MONTH='" + req.body.selectedMonth + "' AND TOPPING='Plain';");
    promiseCherry.then((cherry) => orderArray.orderData[0].quantity = cherry[0]).catch(orderArray.orderData[0].quantity = 0);
    promiseChocolate.then((chocolate) => orderArray.orderData[1].quantity = chocolate[0]).catch(orderArray.orderData[1].quantity = 0);
    promisePlain.then((plain) => orderArray.orderData[2].quantity = plain[0]).catch(orderArray.orderData[2].quantity = 0);
    res.json(orderArray);
})

module.exports = router;