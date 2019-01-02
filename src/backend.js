import React from 'react';
import ReactDOMServer from 'react-dom/server';

import NavApp from 'frontshell';
import App from './js/App';

const path = require('path');
const express = require('express');
const request = require('request');
const https = require('https');
const fs = require('fs');

const loadMessages = () => ({ nb: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/translations/nb.json'))), en: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/translations/nb.json'))) });

const httpsOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
};

const PORT = 80;
const CONTEXT_PATH = '/dittnav';
const ENV_URL = 'https://person-z.nav.no'; // todo: den pekker på localhost i /etc/hosts
// const ENV_URL = `http://localhost:${PORT}`;
const API_URL = 'https://person-q.nav.no';

const html = app => `
<html>

<head>
<link href="https://appres-q1.nav.no/_public/shared/bilder/favicon.ico?_ts=151292348c8" rel="shortcut icon" type="image/x-icon">
<link href="https://appres-q1.nav.no/_public/appressurser/built-appres-v4/styles/css/app-decorator-v4.css?_ts=165af098f60" rel="stylesheet"><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script async="" src="https://www.googletagmanager.com/gtm.js?id=GTM-PM9RP3"></script><script id="navnoScr" loginurl="https://tjenester-q1.nav.no/dittnav/" logouturl="https://tjenester-q0.nav.no/test-logout/" authserviceurl="https://tjenester-q1.nav.no/innloggingslinje-api/auth" src="https://appres-q1.nav.no/_public/beta.nav.no/built-navno/js/navno/navno-url.js?_ts=165c2555d38"></script>
<script src="https://appres-q1.nav.no/_public/appressurser/built-appres-v4/js/innloggingslinjen.min.js?_ts=165af099348"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/dittnav/static/css/main.69476f7f.chunk.css" rel="stylesheet">
</head>

<body>
    <div class="pagewrapper">
        <div id="app">${app}</div>
    </div>
</body>

</html>`;

const api = {
  fetchInfo: cookie => new Promise((resolve, reject) => {
    request(
      {
        url: `${API_URL}/dittnav-api/person/personinfo`,
        headers: {
          'User-Agent': 'diittnav',
          Cookie: cookie,
        },
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(response.statusCode));
        }
      },
    );
  }),
};

const server = express();

const getApp = (data, viewPath) => (
  <NavApp defaultSprak="nb" messages={loadMessages()}>
    <App data={data} path={viewPath} />
  </NavApp>
);

const renderer = (req, res) => {
  api
    .fetchInfo(req.headers.cookie)
    .then((json) => {
      res.send(html(ReactDOMServer.renderToString(getApp(json, req.path))));
    })
    .catch((e) => {
      if (e.message === '401') {
        res.redirect(
          `https://loginservice-q.nav.no/login?redirect=${ENV_URL}/dittnav/`,
        );
      } else {
        res.status(401).send('Helaas pindakaas'); //  todo
      }
    });
};

server.use(
  `${CONTEXT_PATH}/static`,
  express.static('build/static', { index: false }),
);

server.get(CONTEXT_PATH, renderer);
server.get(`${CONTEXT_PATH}/`, renderer);
server.get(`${CONTEXT_PATH}/postkasse`, renderer);
server.get(`${CONTEXT_PATH}/login`, renderer);

https.createServer(httpsOptions, server).listen(443, () => {
  console.log(`Auth on port: ${PORT}`);
});
