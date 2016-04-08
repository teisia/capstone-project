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

router.get("/", function(req,res){
 trips().select().then(function(payload){
   res.json(payload);
 })
});

router.get("/:id", function(req,res){
 trips().select().where({id: req.params.id}).then(function(payload){
     res.json(payload);
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
  console.log('**********');
  console.log(req.body);
  trips().where("id", req.body.id).del().then(function(){
    res.redirect('/#/dashboard');
  })
});


module.exports = router;
