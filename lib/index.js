
var Hapi = require('hapi');
var Handlebars = require('handlebars');
var Inert = require('inert');
var Vision = require('vision');
var HapiAuthGoogle = require('hapi-auth-google');

var Assets = require('./assets.js');
var Home = require('./home.js');
var GoogleAuthHAndler = require('./google_auth_handler.js');
var Login = require('./login.js');
var Upload = require('./upload.js');

exports.init = function (port, next) {
  var server = new Hapi.Server();
  server.connection({port: port});

  var scopes = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ];

  var opts = {
    REDIRECT_URL: '/googleauth',  // must match google app redirect URI
    scope: scopes,
    handler: GoogleAuthHAndler
  };

  var plugins = [
    {register: HapiAuthGoogle, options: opts},
    Inert,
    Vision,
    Assets,
    Home,
    Login,
    Upload
  ];

  server.register(plugins, function (err) {
    if (err) {
      next(err)
    }

    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname + '/../views/',
      path: '.',
      layout: 'default',
      layoutPath: 'layout'
    });

    server.start(function (err) {
      return next(err, server);
    });
  });
};