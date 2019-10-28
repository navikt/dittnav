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

const fetchJSON = (url) => new Promise((res, rej) => {
  fetch(url, { method: 'GET', credentials: 'include' })
    .then(r => {
      if (r.ok) {
        return r.json();
      }
      rej(r);
      return null;
    })
    .then(r => res(r))
    .catch(e => rej(e));
});

const checkAuth = () => new Promise((res, rej) => {
  fetchJSON(`${Config.INNLOGGINGSLINJE_AUTH}`)
    .then(r => {
      if (r.authenticated) {
        res(r);
      } else {
        rej(new Error('not authenticated'));
      }
    })
    .catch(e => rej(e));
});

const checkApiStatus = () => new Promise((res, rej) => {
  fetchJSON(`${Config.dittNav.DITTNAV_API_URL}`)
    .then(r => res(r))
    .catch(e => rej(e));
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

const fetchOppfolging = () => fetchJSON(`${Config.dittNav.DITTNAV_OPPFOLGING_URL}`);
const fetchMeldekort = () => fetchJSON(`${Config.dittNav.DITTNAV_MELDEKORT_URL}`);
const fetchPersonNavn = () => fetchJSON(`${Config.dittNav.DITTNAV_PERSON_NAVN_URL}`);
const fetchPersonIdent = () => fetchJSON(`${Config.dittNav.DITTNAV_PERSON_IDENT_URL}`);
const fetchSaker = () => fetchJSON(`${Config.dittNav.DITTNAV_SAKER_URL}`);
const fetchMeldinger = () => fetchJSON(`${Config.dittNav.DITTNAV_MELDINGER_URL}`);
const fetchSakstema = () => fetchJSON(Config.dittNav.DITTNAV_SAKSTEMA_URL);
const fetchHendelser = () => fetchJSON(`${Config.dittNav.DITTNAV_HENDELSER_URL}`);

export default {
  fetchUnleashFeatures,
  checkAuth,
  checkApiStatus,
  fetchOppfolging,
  fetchMeldekort,
  fetchPersonNavn,
  fetchPersonIdent,
  fetchSaker,
  fetchMeldinger,
  fetchHendelser,
  fetchSakstema,
  sendHendelser: sendJSONAndCheckForErrors,
  redirectToLogin,
};
