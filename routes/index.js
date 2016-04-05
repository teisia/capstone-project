var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function createToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET)
}

function verifyToken(user) {
  return jwt.verify(user, process.env.TOKEN_SECRET)
}



module.exports = router;
