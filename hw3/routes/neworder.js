var express = require('express');
var router = express.Router();
var dbms = require('./dbms');

const now = new Date();

router.post('/', function (req, res, next){
    var month = now.toLocaleDateString(undefined, {month: 'short'}).toUpperCase();
    var day = now.getDate();
    var newQuantity = req.body.quantity;
    var newFlavor = req.body.flavor;
    var newNotes = req.body.notes;
    dbms.dbquery("SELECT MAX(ORDERID) FROM ORDERS;", 
        function (err,res){
            var newOrderID = res[0]["MAX(ORDERID)"] + 1;
            console.log("Processing new order ID #" + newOrderID);
            console.log(newQuantity, newFlavor, newNotes);
            dbms.dbquery("INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) VALUES (" + newOrderID + ", '" + month + "', " + day + ", " + newQuantity + ", '" + newFlavor + "', '" + newNotes + "');", null);
        }
        
    );
});

module.exports = router;