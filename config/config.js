
/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;



var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..'),
  useMongoDB : true,
  useMySql : true
};

/**
 * Expose
 */

module.exports = {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults),
  mongo:useMongoDB,
  mysql:useMySql
}[process.env.NODE_ENV || 'development'];
