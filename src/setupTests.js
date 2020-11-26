window.env = {
  TJENESTER_URL: 'http://localhost:9222',
  NAVNO_URL: 'http://localhost:9222',
  ARBEIDSGIVER_LOGIN_URL: 'sbl',
  LOGIN_URL: 'http://localhost:5000',
  ARBEIDSSOKERREGISTRERING_URL: 'http://localhost:9222/veiledearbeidssoker/mistet-jobben/registrering',
  CONTEXT_PATH: '/dittnav',
};

global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies
