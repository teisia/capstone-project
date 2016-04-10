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

router.post("/:id/tripD", function(req,res){
    var obj = {}
    obj.detail= req.body.detail,
    obj.user_id= req.body.user_id,
    obj.trip_id= req.params.id,
    tripD().insert(obj).then(function(){
      res.json({success: true});
  })
});
/*
router.post("/:id/tasks/:task_id/edit", function(req,res) {
  tasks().where("id", req.params.task_id).update(req.body).then(function(result){
    res.redirect("/" +req.params.id+ "/tasks");
  })
});

router.post("/:id/tasks/:task_id/delete", function(req,res) {
  tasks().where("id", req.params.task_id).del().then(function(){
    res.redirect("/" +req.params.id+ "/tasks");
  })
});*/



module.exports = router;
