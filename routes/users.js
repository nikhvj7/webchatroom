var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./connection');
var userModel = require('../models/user_model');
var app = require('../app');



var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodedParser, function(req, res){
  var newUser = new userModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email_id: req.body.email_id,
    password: req.body.password,
    reason: req.body.reason
  });

  newUser.save().then(function(){
    console.log("Record save successfully");
  });

  res.render("users");

});

router.get('/', function(req, res){

  res.render("users", {firstname: "Nikhil"});

});


module.exports = router;
