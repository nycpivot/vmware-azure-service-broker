var express = require('express');
var db = require('../data/orders-cosmos');

var router = express.Router();

router.post('/', function(req, res, next) {
  db.createOrders(function(err, documents) {
    if(err) return next(err);
    res.send(documents);
  });
});

router.get('/', function(req, res, next) {
  db.getOrders(function(err, documents) {
    if(err) return next(err);
    res.send(documents);
  });
});

module.exports = router;