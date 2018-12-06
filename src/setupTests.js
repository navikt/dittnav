window.dittnav = {
  REG_STATUS_LINK: 'reg_status',
  SAKSOVERSIKT_URL: '/saksoversikt',
  SERVICES_URL: 'https://mytesturl.nav.no',
  MIN_INNBOKS_URL: 'http://localhost:35000/mininnboks',
  ARBEIDSGIVER_LOGIN_URL: 'sbl',
  LOGINSERVICE: '/dittnav-api/local/cookie',
  CONTEXT_PATH: '/dittnav-nais',
};

global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies
