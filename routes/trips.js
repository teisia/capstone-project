var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');

function createToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET)
}

function verifyToken(user) {
  return jwt.verify(user, process.env.TOKEN_SECRET)
}

function trips() {
  return knex('trip');
};

function tripD() {
  return knex('trip_details');
};

function tasks() {
  return knex('tasks');
};

function user() {
  return knex('user');
};


module.exports = router;
