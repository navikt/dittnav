import Config from './Config';

const redirectToLogin = () => {
  window.location.assign(`${Config.dittNav.LOGINSERVICE}&redirect=${window.location.href}`);
};

const fetchUnleashFeatures = (features) => {
  const fString = features.map(f => `feature=${f}`);
  const URL = `${Config.dittNav.CONTEXT_PATH}/api/feature`;
  return Promise.race([
    fetch(`${URL}?${fString.join('&')}`, { method: 'GET' })
      .then(r => r.json()),
    new Promise((_, reject) => setTimeout(() => {
      const message = `Couldnt wait for unleash longer than ${Config.UNLEASH_TIMEOUT} msec`;
      return reject(new Error(message));
    }, Config.UNLEASH_TIMEOUT))]);
};

const fetchJSONAndReturnErrors = (url) => new Promise((res, rej) => {
  fetch(url, { method: 'GET', credentials: 'include' })
    .then(r => (r.ok
      ? res(r.json())
      : rej(new Error(r.status.toString()))))
    .catch(rej);
});

const fetchJSONAndCheckForErrors = (url) => {
  return new Promise((res, rej) => {
    fetch(url, { method: 'GET', credentials: 'include' }) // eslint-disable-line no-undef
      .then((r) => {
        if (r.status === 401 || (r.status === 0 && !r.ok)) {
          // redirectToLogin();
          console.log(r.status);
          return;
        }
        if (!r.ok) {
          rej(new Error('Error happened on requesting a resource'));
          return;
        }
        res(r);
      })
      .catch((e) => {
        rej(e);
      });
  });
};

const checkAuth = () => new Promise((res, rej) => {
  fetchJSONAndCheckForErrors(`${Config.INNLOGGINGSLINJE_AUTH}`)
    .then((r) => {
      if (!r.authenticated) {
        rej(r.json());
      } else {
        res(r.json());
      }
    })
    .catch((e) => {
      rej(e);
    });
});

const sendJSONAndCheckForErrors = (tekst, url = `${Config.dittNav.DITTNAV_HENDELSER_URL}`) => {
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
    // eslint-disable-next-line no-console
    .catch((e) => console.log(`ERROR: ${e}`));
};

const fetchPersonInfoAndServices = () => fetchJSONAndReturnErrors(`${Config.dittNav.DITTNAV_API_URL}`);
const fetchSaker = () => fetchJSONAndReturnErrors(`${Config.dittNav.DITTNAV_SAKER_URL}`);
const fetchMeldinger = () => fetchJSONAndReturnErrors(`${Config.dittNav.DITTNAV_MELDINGER_URL}`);
const fetchSakstema = () => fetchJSONAndReturnErrors(Config.dittNav.DITTNAV_SAKSTEMA_URL);
const fetchHendelser = () => fetchJSONAndReturnErrors(`${Config.dittNav.DITTNAV_HENDELSER_URL}`);

export default {
  fetchUnleashFeatures,
  checkAuth,
  fetchPersonInfoAndServices,
  fetchSaker,
  fetchMeldinger,
  fetchHendelser,
  fetchSakstema,
  sendHendelser: sendJSONAndCheckForErrors,
  redirectToLogin,
};
