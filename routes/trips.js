var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function trips() {
  return knex('trip');
};

function tripD() {
  return knex('trip_details');
};

function tasks() {
  return knex('tasks');
};

function User() {
  return knex('user');
};

router.get("/", function(req,res){
 trips().select().then(function(payload){
   res.json(payload);
 })
});

router.get("/:id", function(req,res){
 trips().where({id: req.params.id}).then(function(payload){
   res.json(payload);
 })
});


module.exports = router;
