var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./connection');
var userModel = require('../models/user_model');
var app = require('../app');

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


const { check,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/login', function(req, res){

  res.render("login");

});

router.post('/login', [ check('loginemail').isEmail(), ], urlencodedParser, function(req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors");
    res.render('login', {
      errors: JSON.stringify(errors)
    });
  }
  else{

    console.log("No validation Errors");

    query = {email_id: req.body.loginemail};

    db.user_models.find(query, function(error, result){
      if(error){
        console.log("error");
      }
    });

  }
  // res.render('/chat');
});

router.get('/register', function(req, res){

  res.render("register", {errors: null});

});


router.post('/register', [

  check('firstname', "Enter the firstname correctly you Dick")
    .isAlpha()
    .isLength({min: 1, max: 50})
    .trim(),

  check('lastname', "Enter the lastname correctly you Dick")
    .isAlpha()
    .isLength({min: 1, max: 50})
    .trim(),

  check('email_id').isEmail(),

  check('password').isLength({min: 5}),

], urlencodedParser, function(req, res){

  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    res.render('register', {
      errors: JSON.stringify(errors)
    });
  }
  else{

    bcrypt.hash(req.body.password, salt, function(err, hash) {

      var newUser = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email_id: req.body.email_id,
        password: hash,
        reason: req.body.reason
      });

      newUser.save().then(function(){
        console.log("Record save successfully");
      });

      res.redirect('/users/login');

    });


  }

});

router.get('/chat', function(req, res){

  res.render("users", {firstname: "Nikhil"});

});


module.exports = router;
