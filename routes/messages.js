var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var moment = require('moment');

function trips() {
  return knex('trip');
};

function messages() {
  return knex('messages');
};

function User() {
  return knex('user_list');
};

router.get("/:id/messages", function(req,res){
  messages().select().where({trip_id: +req.params.id}).then(function(payload) {
    User().select().then(function(payload2) {
    res.json({payload: payload, payload2: payload2});
  })
 })
});

router.post("/:id/messages", function(req,res){
    var obj = {}
    obj.user_id= req.cookies.user,
    obj.trip_id= req.params.id,
    obj.message= req.body.message,
    obj.created_at= moment().calendar();
    messages().insert(obj).then(function(){
      res.json({success: true});
  })
});

router.post("/:id/messages/:message_id/edit", function(req,res) {
  messages().where("id", req.params.message_id).update(req.body).then(function(result){
    res.redirect("/" +req.params.id+ "/messages");
  })
});

router.post("/:id/messages/:message_id/delete", function(req,res) {
  messages().where("id", req.params.message_id).del().then(function(){
    res.redirect("/" +req.params.id+ "/messages");
  })
});


module.exports = router;
