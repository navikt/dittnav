const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

const DECORATOR_URL = 'https://www.nav.no/dekoratoren';

const requestDecorator = callback => request(
  DECORATOR_URL,
  callback,
);

const getDecorator = () => new Promise((resolve, reject) => {
  const callback = (error, response, body) => {
    if (!error && response.statusCode >= 200 && response.statusCode < 400) {
      const { document } = new JSDOM(body).window;

      const data = {
        scripts: document.getElementById('scripts'),
        styles: document.getElementById('styles'),
        header: document.getElementById('header-withmenu'),
        footer: document.getElementById('footer-withmenu'),
      };
      resolve(data);
    } else {
      // todo better logging
      reject(new Error(error));
    }
  };

  requestDecorator(callback);
});

module.exports = getDecorator;
