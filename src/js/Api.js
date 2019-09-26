import conf from './Config';

const redirectToLogin = () => {
  window.location.assign(`${conf.dittNav.LOGINSERVICE}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

const fetchUnleashFeatures = (features) => {
  const fString = features.map(f => `feature=${f}`);
  const URL = `${conf.dittNav.CONTEXT_PATH}/api/feature`;
  return Promise.race([
    fetch(`${URL}?${fString.join('&')}`, { method: 'GET' }) // eslint-disable-line no-undef
      .then(r => r.json()),
    new Promise((_, reject) => setTimeout(() => {
      const message = `Couldnt wait for unleash longer than ${conf.UNLEASH_TIMEOUT} msec`;
      return reject(new Error(message));
    }, conf.UNLEASH_TIMEOUT))]);
};

const fetchJSONAndCheckForErrors = (url) => {
  return new Promise((res, rej) => {
    fetch(url, { method: 'GET', credentials: 'include' }) // eslint-disable-line no-undef
      .then((r) => {
        if (r.status === 401 || (r.status === 0 && !r.ok)) {
          redirectToLogin();
          return;
        }
        if (!r.ok) {
          rej(new Error('Error happened on requesting a resource'));
          return;
        }
        res(r.json());
      })
      .catch((e) => {
        rej(e);
      });
  });
};

const checkAuth = () => {
  return new Promise((res, rej) => {
    fetchJSONAndCheckForErrors(`${conf.INNLOGGINGSLINJE_AUTH}`)
      .then((r) => {
        if (!r.authenticated) {
          redirectToLogin();
          return;
        }
        res(r);
      })
      .catch((e) => {
        rej(e);
      });
  });
};

const sendJSONAndCheckForErrors = (tekst, url = `${conf.dittNav.DITTNAV_HENDELSER_URL}`) => {
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tekst,
      link: 'https://localhost/100',
    }),
  })
    .then((r) => r.status)
    .catch((e) => console.log(`ERROR: ${e}`));
};

const fetchPersonInfoAndServices = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITTNAV_API_URL}`);
const fetchSaker = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITTNAV_SAKER_URL}`);
const fetchMeldinger = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITNTAV_MELDINGER_URL}`);
const fetchSakstema = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITTNAV_SAKSTEMA_URL}`);
const fetchHendelser = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITTNAV_HENDELSER_URL}`);

export default {
  fetchUnleashFeatures,
  checkAuth,
  fetchPersonInfoAndServices,
  fetchSaker,
  fetchMeldinger,
  fetchHendelser,
  fetchSakstema,
  sendHendelser: sendJSONAndCheckForErrors,
};
