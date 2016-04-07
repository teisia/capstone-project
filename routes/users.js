var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function User() {
  return knex('user');
};

router.get('/', function(req, res, next) {
  User().select().then(function(payload){
    res.json(payload);
  })
});

module.exports = router;
