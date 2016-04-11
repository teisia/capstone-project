var express = require('express');
var router = express.Router();
var request = require('request');
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');
var google = process.env.GOOGLE_SECRET;

function User() {
  return knex('user');
};

router.get("/sign-out", function(req,res){
 res.clearCookie('user');
   res.redirect('/');
});

router.get('/auth/google', function(req,res){
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.query.code,
    client_id: '746466032586-fkn4lk9v4pccpa005accokik9u2m13cb.apps.googleusercontent.com',
    client_secret: google,
    redirect_uri: 'https://plantogether.herokuapp.com/auth/google',
    grant_type: 'authorization_code'
  };

// exchange authorization code for access token.
request.post(accessTokenUrl, {json: true, form: params}, function(err, response, token){
  var accessToken = token.access_token;
  var headers = { Authorization: 'Bearer ' + accessToken};

// retreive profile information about the current user.
request.get({ url: peopleApiUrl, headers: headers, json: true}, function(err, response, profile){
  console.log(profile);
  if (profile.error){
    return res.status(500).send({message: profile.error.message});
  }
  // link user accounts.
  if (req.header('Authorization')){
    User().select().where({google_id: profile.sub}).first().then(function(result){
      console.log(result);
      if (result){
        console.log("user returned **********");
        console.log(result)
        return res.status(409).send({message: 'There is already a google account that belongs to you'});
      }
      var token = req.header('Authorization').split(' ')[1];
      var payload = jwt.decode(token, config.TOKEN_SECRET);
      console.log('Payload ****');
      console.log(payload.sub);
      console.log('******');
      User().select().where({google_id: payload.sub}).then(function(user){
        if (!user){
          return res.status(400).send({message: 'User Not Found'});
        }
        user.google = profile.sub;
        user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
        user.displayName = user.displayName || profile.name;
        user.save(function(){
          res.send({token: user});
          res.cookie('user', user.id)
        });
      });
    });
  } else {
    // create a new user account or return existing one
    User().select().where({google_id: profile.sub}).first().then(function(rest){
      console.log("here is my result")
      console.log(rest)
      if (rest){
        res.cookie('user', rest.id)
        console.log(rest.id);
        res.redirect('/#/dashboard'+rest.id);
        return res.send('You are now logged in!');
      }
      var user = {}
      user.google_id = profile.sub;
      user.picture = profile.picture.replace('sz=50', 'sz=200');
      user.first_name = profile.given_name;
      user.last_name = profile.family_name;
      user.email = profile.email;
      // Knex call to create user
    User().insert(user).then(function(response){
      User().select().where({google_id: user.google_id}).first().then(function(result) {
        res.cookie('user', result.id)
        res.redirect('/#/dashboard/'+result.id);
      })
    })
    });
  }
});
});
});


module.exports = router;
