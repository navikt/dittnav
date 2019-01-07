const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;


const APPRES_CMS_URL = 'http://appres.nav.no';

const DECORATOR_PATH = '/common-html/v4/navno';
const DECORATOR_FRAGMENT_HEADER_WITHMENU = true;
const DECORATOR_FRAGMENT_STYLES = true;
const DECORATOR_FRAGMENT_SCRIPTS = true;
const DECORATOR_FRAGMENT_FOOTER_WITH_MENU = true;
const DECORATOR_FRAGMENT_SKIP_LINKS = true;
const DECORATOR_FRAGMENT_MEGAMENU_RESOURCES = true;


const requestDecorator = callback =>
  request(
    `${
      APPRES_CMS_URL
    }${DECORATOR_PATH}?header-withmenu=${DECORATOR_FRAGMENT_HEADER_WITHMENU}&styles=${DECORATOR_FRAGMENT_STYLES}&scripts=${DECORATOR_FRAGMENT_SCRIPTS}&footer-withmenu=${DECORATOR_FRAGMENT_FOOTER_WITH_MENU}&skiplinks=${DECORATOR_FRAGMENT_SKIP_LINKS}&megamenu-resources=${DECORATOR_FRAGMENT_MEGAMENU_RESOURCES}`,
    callback,
  );

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      if (
        !error &&
                response.statusCode >= 200 &&
                response.statusCode < 400
      ) {
        const { document } = new JSDOM(body).window;
        const prop = 'innerHTML';

        const data = {
          NAV_SKIPLINKS: document.getElementById('skiplinks')[prop],
          NAV_SCRIPTS: document.getElementById('scripts')[prop],
          NAV_STYLES: document.getElementById('styles')[prop],
          NAV_HEADING: document.getElementById('header-withmenu')[prop],
          NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
          MEGAMENU_RESOURCES: document.getElementById('megamenu-resources')[prop],
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
