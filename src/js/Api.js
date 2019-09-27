import Config from './Config';

const redirectToLogin = () => {
  window.location.assign(`${Config.dittNav.LOGINSERVICE}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

const fetchUnleashFeatures = (features) => {
  const fString = features.map(f => `feature=${f}`);
  const URL = `${Config.dittNav.CONTEXT_PATH}/api/feature`;
  return Promise.race([
    fetch(`${URL}?${fString.join('&')}`, { method: 'GET' }) // eslint-disable-line no-undef
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

const checkAuth = () => new Promise((res, rej) => {
  fetchJSONAndReturnErrors(`${Config.INNLOGGINGSLINJE_AUTH}`)
    .then((r) => {
      if (r.authenticated) {
        res(r);
      } else {
        redirectToLogin();
      }
    })
    .catch(rej);
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
};
