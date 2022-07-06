const express = require('express');
const router = express.Router();

var Foo = [
    { "name": "Todo1"},
    { "name": "Todo2"},
    { "name": "Todo3"},
    { "name": "Todo4"},
    { "name": "Todo5"},
    { "name": "Todo6"},
    { "name": "Todo7"},
    { "name": "Todo8"},
    { "name": "Todo9"},
    { "name": "Todo10"}
];

router.get('/', (req, res) => {
    if(Foo) {
        res.status(200).json(Foo);
    } else {
        res.status(404).json({"message": "nothing found"});
    }
});

router.get('/:todoName', (req, res) => {
    var todoName = req.params.todoName;
    let obj = Foo.find(o => o.name === todoName);
    
    if (obj) {
        res.status(200).json(obj);
    } else {
        res.status(404).json({"message": `todo with name ${todoName} not found`})
    }
});


module.exports = router;