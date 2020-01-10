window.dittnav = {
  SERVICES_URL: 'https://mytesturl.nav.no',
  ARBEIDSGIVER_LOGIN_URL: 'sbl',
  LOGINSERVICE: '/dittnav-legacy-api/local/cookie',
  CONTEXT_PATH: '/dittnav',
};

global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies
