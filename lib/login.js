exports.register = function (server, option, next) {

  server.route([
    {
      method: 'GET',
      path: '/login',
      config: {
        description: 'return a login page',
        auth: false,
        handler: function (request, reply) {
          var url = server.generate_google_oauth2_url();

          return reply.view('login', { url: url });
        }
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Login'
}