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
  console.log(trip_collection);
  
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
  trips().select('*').from ('trips').leftJoin('trip_user', function() {
    this.on('id', '=', 'trip_id')
     User().select('*').from('user').leftJoin('trip_user', function() {
       this.on('id', '=', 'user_id')
  trips().select().then(function(payload){
    User().select().then(function(payload2) {
      tripUser().select().where({trip_id: req.params.id}).then(function(payload3) {
        res.json({payload: payload, payload2: payload2, payload3: payload3});
      })
     })
    })
   })
  })
})


module.exports = router;
