/**
 * Created By Aashish Anand
 * orders.js: meant to handle get and post requests from client side
 * Date created: 2/1/2022
 */
var express = require('express');
var router = express.Router();
//var dbms = require('./dbms');
var dbms = require('./dbms_local'); //For debugging purposes only

//JSON array that gives hard-coded values of topping and quantity
var orderArray = {
    "orderData": 
    [
        {
            topping: "Cherry", 
            quantity: 3
        }, 
        {
            topping: "Chocolate", 
            quantity: 5
        }, 
        {
            topping: "Plain", 
            quantity: 2
        }
    ]
};

/* GET orders data: hard-coded at the moment */
router.get('/', function(req, res, next) {
    res.json(orderArray);
});

/* Handling POST request for orderArray */
router.post('/', function(req, res, next) {
    //using dbms to handle real-time POST request
    //console.log(req.body.selectedMonth);

    //obtains real-life cherry cheesecake orders by month
    dbms.dbquery("SELECT SUM(QUANTITY) AS CherryNum FROM ORDERS WHERE MONTH='" + req.body.selectedMonth.toUpperCase() + "' AND TOPPING='Cherry';",
        function(err, result) {
            if( result[0].CherryNum ){
                orderArray.orderData[0].quantity = result[0].CherryNum;
            }
            else{
                orderArray.orderData[0].quantity = 0;
            }
        });

    //obtains real-life chocolate cheesecake orders by month
    dbms.dbquery("SELECT SUM(QUANTITY) AS ChocoNum FROM ORDERS WHERE MONTH='" + req.body.selectedMonth.toUpperCase() + "' AND TOPPING='Chocolate';",
        function(err, result) {
            if( result[0].ChocoNum )
                orderArray.orderData[1].quantity = result[0].ChocoNum;
            else
                orderArray.orderData[1].quantity = 0;
        });

    //obtains real-life plain cheesecake orders by month
    dbms.dbquery("SELECT SUM(QUANTITY) AS PlainNum FROM ORDERS WHERE MONTH='" + req.body.selectedMonth.toUpperCase() + "' AND TOPPING='Plain';",
        function(err, result) {
            if( result[0].PlainNum )
                orderArray.orderData[2].quantity = result[0].PlainNum;
            else
                orderArray.orderData[2].quantity = 0;
            res.json(orderArray);
        });

})

module.exports = router;