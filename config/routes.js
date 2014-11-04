
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var config = require('config');
var fs = require('fs');
/**
 * Expose
 */

module.exports = function (app, passport) {


  //Boot all the controllers
  fs.readdirSync(config.root + '/app/controllers/').forEach(function (file) {
    if (~file.indexOf('.js')) require(config.root + '/app/controllers/' + file).boot(app,passport);
  });

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).send({ error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).send({
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
