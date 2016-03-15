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
  // const fileBase64 = Fs.readFileSync(__dirname + '/../../../cv.pdf', 'base64');
  // console.log(fileBase64);
  // Fs.writeFileSync('./cvpdfBase64', fileBase64, 'utf8')
  // reply('ok')
  const fileBase64 = Fs.readFileSync(__dirname + '/../../../base642', 'utf8')
  const binary = new Buffer(fileBase64, 'base64');
  Fs.writeFileSync(__dirname + '/../../../binary.docx', binary);
  const params = {
    uploadType: "media",
    media: {
      body: binary,
    },
    resource: {
      name: 'toadtest.docx',
      description: 'This is a cool file',
    }
  };

  Drive.files.create(params, function(error, response) {
    console.log('error', error);
    console.log('response', response);
    reply.view('file', {fileId: response.id});
  })
}
