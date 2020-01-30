var express = require('express');
var db = require('../data/customers-sql');

var router = express.Router();

router.post('/', function(req, res, next) {
  db.create(function(err, rowCount) {
    if(err) return next(err);
    res.send(`Added ${rowCount} records.`);
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.get(function(err, rowCount, rows) {
    if(err) return next(err);
    res.send(rows);
  })
});

module.exports = router;