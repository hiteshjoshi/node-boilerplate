
/*!
 * Module dependencies.
 */


var Home = {};

Home.Index = function(req,res){
	res.send("API is up and running.");
};

exports.boot = function (app,passport) {
  app.get('/',Home.Index);
};
