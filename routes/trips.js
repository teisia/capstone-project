var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var moment = require('moment');

function trips() {
  return knex('trip');
};

function tripUser() {
  return knex('trip_user');
};


function tasks() {
  return knex('tasks');
};

function User() {
  return knex('user');
};

function messages() {
  return knex('messages');
}

router.get("/", function(req,res){
 trips().select().where({admin_id: req.cookies.user}).then(function(payload){
   User().select().then(function(payload2) {
   res.json(payload);
   res.json(payload2);
  })
 })
});

router.get("/:id", function(req,res){
 trips().select().where({id: req.params.id}).then(function(payload){
   User().select().then(function(payload2) {
     res.json(payload);
     res.json(payload2);
  })
 })
});

router.post("/", function(req,res){
  var obj = {}
  obj.title = req.body.title,
  obj.description= req.body.description,
  obj.trip_start= req.body.trip_start,
  obj.trip_end= req.body.trip_end
  obj.admin_id= req.cookies.user,
  trips().insert(obj).then(function(){
    res.json({success: true});
  })
});

router.post("/edit", function(req,res) {
  trips().where("id", req.body.id).update(req.body).then(function(result){
    res.redirect('/#/trips/'+req.body.id+'');
  })
});

router.post("/delete", function(req,res) {
  trips().where("id", req.body.id).del().then(function(){
    res.redirect('/#/dashboard');
  })
});


module.exports = router;
