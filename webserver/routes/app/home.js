var request = require('request'),
    messure = require('../../models/messure'),
    config = require('../../config');

var home = function (req, res) {
  var viewData = {
    title: 'estacion espacial',
    section: 'home'
  };
  
  messure.findOne({}).sort('-created').exec( function(err, doc) {
    viewData.json = doc;
    res.render('index', viewData);
  });
};

module.exports = home;