var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function trips() {
  return knex('trip');
};

function tasks() {
  return knex('tasks');
};

function User() {
  return knex('user');
};

function tripD() {
  return knex('tripDetails')
}

router.get("/:id/tripD", function(req,res){
   tripD().select().where({trip_id: +req.params.id}).then(function(payload) {
     res.json(payload);
 })
});

module.exports = router;
