//JSON array that gives past orders
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