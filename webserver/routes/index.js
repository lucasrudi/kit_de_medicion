var express = require('express'),
    configuration = require('../config');
  
module.exports.init = function (app) {

  // Routes
  var Routes = {
    api: {}
  };

  // API Prefix
  var ApiPrefix = '/api/v1/';
  
  Routes.home = require('./app/home');
  app.get('/', Routes.home);
  //set authentication routes

};