var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function trips() {
  return knex('trip');
};

function messages() {
  return knex('messages');
};

function User() {
  return knex('user');
};

router.get("/:id/messages", function(req,res){
  messages().select().where({trip_id: +req.params.id}).then(function(payload) {
    res.json(payload);
 })
});

router.post("/:id/messages", function(req,res){
    var obj = {}
    obj.user_id= req.body.user_id,
    obj.trip_id= req.params.id,
    obj.message= req.body.message,
    messages().insert(obj).then(function(){
      res.json({success: true});
  })
});

router.post("/:id/messages/:message_id/edit", function(req,res) {
  messages().where("id", req.params.message_id).update(req.body).then(function(result){
    res.redirect("/" +req.params.id+ "/messages");
  })
});



module.exports = router;
