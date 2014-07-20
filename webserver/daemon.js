var request = require('request'),
    messure = require('./models/messure'),
    config = require('./config');
setInterval(function(){
  requestinfo();
}, 5000);

var requestinfo = function() {
     var options = {'url':'http://' + config.client.ADDRESS + ':' + config.client.PORT, 'timeout':5000};
     console.log(options);
     request(options, function(error, response, body) {
      var json = {};
      json.created = new Date();
      if (!error && response.statusCode == 200) {
        var jsonData = JSON.parse(body);
        console.log(jsonData.Temperatura);
        console.log(parseFloat(jsonData.Temperatura));
        json.Temperatura = parseFloat(jsonData.Temperatura);
        json.Humedad = parseFloat(jsonData.Humedad);
        var messureValue = new messure(json);
        messureValue.save();

      }
    });
}

module.exports = requestinfo();
