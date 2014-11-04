
/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var passport = require('passport');
var config = require('./config/index');

var app = express();
var port = process.env.PORT || 3000;

var useMongo = function(){
	var mongoose = require('mongoose');
	// Connect to mongodb
	var connect = function () {
	  var options = { server: { socketOptions: { keepAlive: 1 } } };
	  mongoose.connect(config.mongodb, options);
	};
	connect();

	mongoose.connection.on('error', console.log);
	mongoose.connection.on('disconnected', connect);
};



//if we need mongodb support?
if(config.useMongoDB)
	useMongo();


// Bootstrap mongodb models
if(config.useMongoDB)
	fs.readdirSync(__dirname + '/app/models/mongodb/').forEach(function (file) {
	  if (~file.indexOf('.js')) require(__dirname + '/app/models/mongodb/' + file);
	});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);
