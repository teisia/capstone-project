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

router.get("/:id/tasks", function(req,res){
   tasks().select().where({trip_id: +req.params.id}).then(function(payload) {
     res.json(payload);
 })
});

router.post("/:id/tasks", function(req,res){
    var obj = {}
    obj.description= req.body.description,
    obj.due_date= req.body.due_date,
    obj.user_id= req.body.user_id,
    obj.trip_id= req.params.id,
  console.log(obj);
    tasks().insert(obj).then(function(){
      res.json({success: true});
  })
});

router.post("/:id/tasks/:task_id/edit", function(req,res) {
  console.log("EDIT STUFF *****");
  tasks().where("id", req.params.task_id).update(req.body).then(function(result){
    res.redirect("/" +req.params.id+ "/tasks");
  })
});

router.post("/:id/tasks/:task_id/delete", function(req,res) {
  tasks().where("id", req.params.task_id).del().then(function(){
    res.redirect("/" +req.params.id+ "/tasks");
  })
});


module.exports = router;
