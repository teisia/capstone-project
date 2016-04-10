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
    obj.url= req.body.url,
    tripD().insert(obj).then(function(){
      res.json({success: true});
  })
});

router.post("/:id/tripD/:tripd_id/edit", function(req,res) {
  tripD().where("id", req.params.tripd_id).update(req.body).then(function(result){
    res.redirect("/" +req.params.id+ "/tripD");
  })
});

router.post("/:id/tripD/:tripd_id/delete", function(req,res) {
  tripD().where("id", req.params.tripd_id).del().then(function(){
    res.redirect("/" +req.params.id+ "/tripD");
  })
});




module.exports = router;
