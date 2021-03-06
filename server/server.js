"use strict";

const Hapi = require('hapi');
const Glue = require('glue');
const manifest = require('./config/manifest.json');
const config = require('./config')(manifest);


Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) console.error('server.register err:', err);

  /* Force https on Heroku */
  if (process.env.NODE_ENV === 'production') {
    server.ext('onRequest', (request, reply) => {
      if (request.headers['x-forward-proto'] === 'http') {
        return reply('Forwarding to https')
          .redirect('https://' + request.headers.host + request.path)
          .code(301);
      }
      reply.continue();
    });
  }

  /* Vision templates */
  server.views({
    engines: { ejs: require('ejs') },
    relativeTo: __dirname,
    path: 'public'
  });

  server.start(() => {
    console.log("Server is listening on", server.info.host);
  });
});
