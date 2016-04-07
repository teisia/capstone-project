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

module.exports = router;
