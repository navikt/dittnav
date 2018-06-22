require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./src/build/decorator');
const createEnvSettingsFile = require('./src/build/env');

const server = express();

server.set('views', `${__dirname}/build`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

createEnvSettingsFile(path.resolve(`${__dirname}/build/static/js/settings.js`));

server.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

const renderApp = decoratorFragments =>
  new Promise((resolve, reject) => {
    server.render('index.html', decoratorFragments, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });

const startServer = (html) => {
  server.use('/static/js', express.static(path.resolve(__dirname, 'build/static/js')));

  server.use(
    '/static/css',
    express.static(path.resolve(__dirname, 'build/static/css')),
  );

  server.use(
    '/static/media',
    express.static(path.resolve(__dirname, 'build/static/media')),
  );

  server.get('/health/isAlive', (req, res) => res.sendStatus(200));
  server.get('/health/isReady', (req, res) => res.sendStatus(200));

  server.get(/^\/(?!.*static).*$/, (req, res) => {
    res.send(html);
  });

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
  .then(renderApp, error => logError('Failed to get decorator', error))
  .then(startServer, error => logError('Failed to render app', error));
