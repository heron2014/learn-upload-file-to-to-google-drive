var fs = require('fs');

module.exports = function custom_handler(req, reply, tokens, profile) {
 
  fs.writeFileSync(__dirname + '/tokens.json', JSON.stringify(tokens),'utf8');

  return reply('ok');    
}

