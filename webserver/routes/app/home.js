var request = require('request'),
    messure = require('../../models/messure'),
    config = require('../../config');

var home = function (req, res) {
  var viewData = {
    title: 'estacion espacial',
    section: 'home'
  };
  
  request('http://' + config.client.ADDRESS + config.client.PORT, function(error, response, body) {
    console.log(error);
    if (!error && response.statusCode == 200) {
      viewData.json = body;
      viewData.json.created = new Date();
      
    }
    res.render('index', viewData);
  });
  

};

module.exports = home;