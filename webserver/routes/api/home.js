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
    viewData.json = {};
    if (!error && response.statusCode == 200) {
      viewData.json = body;
      viewData.json.created = new Date();
      
    } else {
      
      viewData.json.created = new Date();
      viewData.json.Temperatura = 12;
      viewData.json.Humedad = 15;
    }
    res.send(viewData.json, 200);
  });
};

module.exports = home;