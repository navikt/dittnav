import Config from './globalConfig';

const redirectToLogin = () => {
  window.location.assign(`${Config.dittNav.LOGINSERVICE}`);
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
  fetchJSON(`${Config.INNLOGGINGSLINJE_AUTH}?ts=${Date.now()}`)
    .then(r => {
      if (r.authenticated) {
        res(r);
      } else {
        rej(new Error('not authenticated'));
      }
    })
    .catch(() => rej(new Error('not authenticated')));
});

const checkApiStatus = () => new Promise((res, rej) => {
  fetchJSON(`${Config.dittNav.DITTNAV_API_AUTH_URL}`)
    .then(r => res(r))
    .catch(e => rej(e));
});

const postJSONAndCheckForErrors = (url, content) => {
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((r) => r.status)
    // eslint-disable-next-line no-console
    .catch((e) => console.log(`ERROR: ${e}`));
};

const fetchOppfolging = () => fetchJSON(`${Config.dittNav.DITTNAV_OPPFOLGING_URL}`);
const fetchOppfolgingNyKilde = () => fetchJSON(`${Config.dittNav.DITTNAV_NY_OPPFOLGING_URL}`);
const fetchMeldekort = () => fetchJSON(`${Config.dittNav.DITTNAV_MELDEKORT_URL}`);
const fetchPersonNavn = () => fetchJSON(`${Config.dittNav.DITTNAV_PERSON_NAVN_URL}`);
const fetchPersonIdent = () => fetchJSON(`${Config.dittNav.DITTNAV_PERSON_IDENT_URL}`);
const fetchSaker = () => fetchJSON(`${Config.dittNav.DITTNAV_SAKER_URL}`);
const fetchMeldinger = () => fetchJSON(`${Config.dittNav.DITTNAV_MELDINGER_URL}`);
const fetchSakstema = () => fetchJSON(Config.dittNav.DITTNAV_SAKSTEMA_URL);
const fetchHendelser = () => fetchJSON(`${Config.dittNav.DITTNAV_HENDELSER_URL}`);

export default {
  checkAuth,
  checkApiStatus,
  fetchOppfolging,
  fetchOppfolgingNyKilde,
  fetchMeldekort,
  fetchPersonNavn,
  fetchPersonIdent,
  fetchSaker,
  fetchMeldinger,
  fetchHendelser,
  fetchSakstema,
  postHendelser: postJSONAndCheckForErrors,
  redirectToLogin,
};
