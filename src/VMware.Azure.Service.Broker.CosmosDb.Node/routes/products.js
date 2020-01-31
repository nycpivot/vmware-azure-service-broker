var express = require('express');
var db = require('../data/products-data');

var router = express.Router();

router.post('/', function(req, res, next) {
  db.createProducts(function(err, documents) {
    if(err) return next(err);
    res.send(documents);
  });
});

router.get('/', function(req, res, next) {
  db.getProducts(function(err, documents) {
    if(err) return next(err);
    res.send(documents);
  });
});

module.exports = router;