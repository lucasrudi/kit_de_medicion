var request = require('request'),
    messure = require('../../models/messure'),
    config = require('../../config');

var home = function (req, res) {
  var viewData = {
    title: 'estacion espacial',
    section: 'home'
  };
  
  var endpoint = 'http://' + config.client.ADDRESS + ':' +config.client.PORT;
  console.log(endpoint);
  request(endpoint, function(error, response, body) {
    viewData.json = {};
    if (!error && response.statusCode == 200) {
      var metric = JSON.parse(body);
      viewData.json.Humedad = metric.Humedad;
      viewData.json.Temperatura = metric.Temperatura;
      viewData.json.created = new Date();
      
    } else {
      
      viewData.json.created = new Date();
      viewData.json.Temperatura = 12.4;
      viewData.json.Humedad = 15.7;
    }
    
    res.render('index', viewData);
  });
};

module.exports = home;