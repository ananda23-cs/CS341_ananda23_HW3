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

/* GET orders data: hard-coded at the moment */
router.get('/', function(req, res, next) {
    res.json(orderArray);
});

/* Handling POST request for orderArray */
router.post('/', function(req, res, next) {
    res.json(orderArray);
})

module.exports = router;