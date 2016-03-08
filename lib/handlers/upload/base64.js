require('env2')('.env');

const Boom         = require('boom');
const Fs           = require('fs');
const Google       = require('googleapis');
const OAuth2       = Google.auth.OAuth2;
const Oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
const tokens = require(__dirname + '/../../tokens.json');
console.log(tokens);
Oauth2Client.setCredentials(tokens);
const Drive = Google.drive({ version: 'v3', auth: Oauth2Client });



module.exports = function(request, reply, next) {
  // reply(Boom.badData('Aie!'));

  //load a file in base64
  const fileBase64 = Fs.readFileSync(__dirname + '/../../../image.png', 'base64');
  const binary = new Buffer(fileBase64, 'base64');
  const params = {
    uploadType: "media",
    media: {
      body: binary,
    },
    resource: {
      name: 'chess',
      description: 'This is a cool file',
    }
  };

  Drive.files.create(params, function(error, response) {
    console.log('error', error);
    console.log('response', response);
    reply.view('file', {fileId: response.id});
  })
}
