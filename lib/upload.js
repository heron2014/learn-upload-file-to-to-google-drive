'use strict';

require('env2')('.env');
var google       = require('googleapis');
var OAuth2       = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
var tokens = require('./tokens.json');
oauth2Client.setCredentials(tokens);
var drive = google.drive({ version: 'v2', auth: oauth2Client });

const Base64Handler = require('./handlers/upload/base64');

var fs = require('fs');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'GET',
    path: '/upload',
    config: {
      description: 'return upload page',
      handler: function (request, reply) {

        var file = fs.readFileSync(__dirname + '/../cv.pdf', 'base64');

        drive.files.insert({
          resource: {
            title: 'Test2',
            mimeType: 'text/plain'
          },
          media: {
            mimeType: 'text/plain',
            body: 'hello World Again'
          }
        }, function (err, response) {
          console.log(err);
          return reply('upload');
        });

      }
    }
  },

  {
    method: 'GET',
    path: '/upload/base64',
    config: {
      description: 'upload a file encoded with base64',
      handler: Base64Handler
    }
  }

  ])

  return next();
};

exports.register.attributes = {
  name: 'Upload'
};
