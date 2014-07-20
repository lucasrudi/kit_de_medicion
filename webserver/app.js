  /**
   * Module dependencies.
   */

  var express = require('express'),
      router = require('./routes'),
      http = require('http'),
      mongo = require('./models/mongo-core'),
      mongoose = require('mongoose'),
      mongooseExtend = require('mongoose-schema-extend'),
      mongooseWhen = require('mongoose-when'),
      path = require('path'),
      messuresDaemon = require('./daemon');

  var app = express();
  
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  router.init(app);
  var server =http.createServer(app);
  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
  
  
  
process.on('SIGTERM', function () {
  if (server === undefined) return;
  server.close(function () {
    // Disconnect from cluster master
    process.disconnect && process.disconnect();
  });
});
