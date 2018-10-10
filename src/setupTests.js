window.dittnavSettings = {
  REG_STATUS_LINK: 'reg_status',
  SAKSOVERSIKT_URL: '/saksoversikt',
  SERVICES_URL: 'https://mytesturl.nav.no',
  MIN_INNBOKS_URL: 'http://localhost:35000/mininnboks',
  LOGIN_URL: '/dittnav-api/local/cookie',
};

global.fetch = require('jest-fetch-mock');
