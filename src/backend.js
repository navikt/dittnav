import React from 'react';
import ReactDOMServer from 'react-dom/server';

import NavApp from 'frontshell';
import App from './js/App';


const path = require('path');
const express = require('express');
const request = require('request');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
const getDecorator = require('./decorator.js');
dotenv.config();

const css = fs.readdirSync('./dist/static/css').reduce(file => file);

const loadMessages = () => ({ nb: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/translations/nb.json'))), en: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/translations/nb.json'))) });

const ifDev = () => process.env.NODE_ENV && process.env.NODE_ENV === 'development';

function getHttpsOptions() {
  return ifDev() ? {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
  } : {};
}

function getPort() {
  return process.env.DITTNAV_PORT ? process.env.DITTNAV_PORT : 443; // 443 in dev mode
  //return process.env.DITTNAV_PORT ? process.env.DITTNAV_PORT : 8080; // 443 in dev mode
}


function getApiUrl(host) {
  if (host.indexOf('person-') > -1) {
    return 'https://person-q.nav.no';
  }
  return 'https://person.nav.no';
}

const PORT = getPort();
const { CONTEXT_PATH } = process.env;

const html = (fragments, app) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    ${fragments.NAV_SCRIPTS}
    ${fragments.NAV_STYLES}
    ${fragments.MEGAMENU_RESOURCES}
    <link href="${fragments.CONTEXT_PATH}/static/css/${fragments.css}" rel="stylesheet">
  </head>
  <body>
    <div class="pagewrapper">
    ${fragments.NAV_SKIPLINKS}
    ${fragments.NAV_HEADING}
      <div id="app">${app}</div>
    </div>
    ${fragments.NAV_FOOTER}
  </body>
</html>`;

const api = {
  fetchInfo: (cookie, host) => new Promise((resolve, reject) => {
    request(
      {
        url: `${getApiUrl(host)}/dittnav-api/person/personinfo`,
        headers: {
          'User-Agent': 'diittnav',
          Cookie: cookie,
        },
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
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

getDecorator()
  .then((fragments) => {
    const renderer = (req, res) => {
      const { cookie, host } = req.headers;
      api
        .fetchInfo(cookie, host)
        .then((json) => {
          const fr = Object.assign(fragments, {
            CONTEXT_PATH,
            css,
          });
          res.send(html(fr, ReactDOMServer.renderToString(getApp(json, req.path))));
        })
        .catch((e) => {
          if (e.message === '401') {
            res.redirect(
              `https://loginservice-q.nav.no/login?redirect=https://${req.headers.host}/dittnav/`,
            );
          } else {
            console.log(e);
            res.status(401).send('Helaas pindakaas'); //  todo
          }
        });
    };

    server.use(
      `${CONTEXT_PATH}/static`,
      express.static('dist/static', { index: false }),
    );

    server.get(CONTEXT_PATH, renderer);
    server.get(`${CONTEXT_PATH}/`, renderer);
    server.get(`${CONTEXT_PATH}/postkasse`, renderer);
    server.get(`${CONTEXT_PATH}/login`, renderer);

    https.createServer(getHttpsOptions(), server).listen(PORT, () => {
      console.log(`Started on port: ${PORT}`);
    });
  }, error => console.log(`Failed to render app ${error}`));
