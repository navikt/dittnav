const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

// const DECORATOR_URL = 'https://www.nav.no/person';
// const DECORATOR_PATH = '/nav-dekoratoren';

const DECORATOR_URL = 'http://appres.nav.no';
const DECORATOR_PATH = '/common-html/v4/navno';

const DECORATOR_FRAGMENT_HEADER_WITHMENU = true;
const DECORATOR_FRAGMENT_STYLES = true;
const DECORATOR_FRAGMENT_SCRIPTS = true;
const DECORATOR_FRAGMENT_FOOTER_WITH_MENU = true;
const DECORATOR_FRAGMENT_SKIP_LINKS = true;
const DECORATOR_FRAGMENT_MEGAMENU_RESOURCES = true;

const decoratedUrl = `${
  DECORATOR_URL
}${DECORATOR_PATH}?header-withmenu=${DECORATOR_FRAGMENT_HEADER_WITHMENU}&styles=${DECORATOR_FRAGMENT_STYLES}&scripts=${DECORATOR_FRAGMENT_SCRIPTS}&footer-withmenu=${DECORATOR_FRAGMENT_FOOTER_WITH_MENU}&skiplinks=${DECORATOR_FRAGMENT_SKIP_LINKS}&megamenu-resources=${DECORATOR_FRAGMENT_MEGAMENU_RESOURCES}`;

const requestDecorator = callback => request(
  decoratedUrl,
  callback,
);

const getDecorator = () => new Promise((resolve, reject) => {
  const callback = (error, response, body) => {
    if (
      !error &&
      response.statusCode >= 200 &&
      response.statusCode < 400
    ) {
      const { document } = new JSDOM(body).window;

      const data = {
        skiplinks: document.getElementById('skiplinks'),
        scripts: document.getElementById('scripts'),
        styles: document.getElementById('styles'),
        header: document.getElementById('header-withmenu'),
        footer: document.getElementById('footer-withmenu'),
        megamenu: document.getElementById('megamenu-resources'),
      };
      resolve(data);
    } else {
      // todo better logging
      reject(new Error(error));
    }
  };

  console.log(`Fetching legacy decorator fragments: ${decoratedUrl}`);
  requestDecorator(callback);
});

module.exports = getDecorator;
