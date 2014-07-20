var request = require('request'),
    messure = require('./models/messure'),
    config = require('./config');
setInterval(function(){
  requestinfo();
}, 5000);

var requestinfo = function() {
     var options = {'url':'http://' + config.client.ADDRESS + config.client.PORT, 'timeout':30};
    request(options, function(error, response, body) {
      var json = {};
      json.created = new Date();
      if (!error && response.statusCode == 200) {
        json = body;
      } else {
        json.Temperatura = Math.floor(Math.random() * 30) + 9 ;
        json.Humedad = Math.floor(Math.random() * 100) + 0 ;
      }
      var messureValue = new messure(json);
      messureValue.save();
    });
}

module.exports = requestinfo();
