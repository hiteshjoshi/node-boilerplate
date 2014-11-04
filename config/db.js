
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


module.exports = {
	useMongo : useMongo
};