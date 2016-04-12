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
  return knex('user_list');
};

function messages() {
  return knex('messages');
}

router.get("/", function(req,res){
 trips().select().where({admin_id: req.cookies.user}).then(function(payload){
   User().select().then(function(payload2) {
   res.json({payload: payload, payload2: payload2});
  })
 })
});

router.get("/invited", function(req,res){
 tripUser().select().where({user_id: req.cookies.user}).then(function(payload){
  trip_collection = [];
  for (var i = 0; i < payload.length; i++) {
    trip_collection.push(parseInt(payload[i].trip_id));
  }
  trips().whereIn('id', trip_collection).then(function(new_stuff){
    res.json(new_stuff);
  })
 })
});

router.get("/:id", function(req,res){
  trips().select().where({id: req.params.id}).then(function(payload){
      User().select().then(function(payload2) {
        res.json({payload: payload, payload2: payload2});
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
  obj.image = req.body.image,
  trips().insert(obj).returning('*').then(function(result){
    res.json(result);
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

router.post("/:id/members", function(req, res) {
  var obj = {}
  console.log(req.body);
  obj.trip_id = req.params.id,
  obj.user_id = req.body.user_id,
  tripUser().insert(obj).then(function(){
    res.json({success: true});
  })
})

router.get("/:id/members", function(req, res) {
  tripUser().select().where({trip_id: req.params.id}).then(function(payload){
   user_collection = [];
   for (var i = 0; i < payload.length; i++) {
     user_collection.push(parseInt(payload[i].user_id));
   }
   User().whereIn('id', user_collection).then(function(new_stuff){
     res.json(new_stuff);
   })
  })
})


module.exports = router;
