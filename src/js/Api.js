import Config from './globalConfig';

const redirectToLogin = () => {
  window.location.assign(`${Config.dittNav.LOGINSERVICE}`);
};

const redirectToNavNo = () => {
  window.location.assign(`${Config.dittNav.NAVNO_URL}`);
};

const tokenExpiresSoon = (headers) => (
  headers.get('x-token-expires-soon')
);

const fetchJSON = (url) => new Promise((resolve, reject) => {
  fetch(url, { method: 'GET', credentials: 'include' })
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(json => [json, response.headers]);
      }
      reject(response);
      return null;
    })
    .then(([content, headers]) => {
      resolve([content, headers]);
    })
    .catch(e => reject(e));
});

const checkAuth = () => new Promise((resolve, reject) => {
  fetchJSON(`${Config.INNLOGGINGSLINJE_AUTH}?ts=${Date.now()}`)
    .then(([response]) => {
      if (response.authenticated) {
        resolve(response);
      } else {
        reject(new Error('not authenticated'));
      }
    })
    .catch(() => reject(new Error('not authenticated')));
});

const checkApiStatus = () => new Promise((resolve, reject) => {
  fetchJSON(`${Config.dittNav.DITTNAV_API_AUTH_URL}`)
    .then(([response]) => resolve(response))
    .catch(e => reject(e));
});

const postJSON = (url, content) => new Promise((resolve, reject) => {
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then(response => response.headers)
    .then((headers) => resolve(headers))
    .catch((e) => reject(e));
});

const fetchOppfolging = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_OPPFOLGING_URL}`)
);

const fetchMeldekort = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_MELDEKORT_URL}`)
);

const fetchPersonNavn = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_PERSON_NAVN_URL}`)
);

const fetchPersonIdent = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_PERSON_IDENT_URL}`)
);

const fetchSaker = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_SAKER_URL}`)
);

const fetchMeldinger = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_MELDINGER_URL}`)
);

const fetchSakstema = () => (
  fetchJSON(Config.dittNav.DITTNAV_SAKSTEMA_URL)
);

const fetchInnlogging = () => (
  fetchJSON(`${Config.INNLOGGINGSLINJE_AUTH}`)
);

const fetchBeskjeder = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_BESKJED}`)
);

const fetchOppgaver = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_OPPGAVE}`)
);

const fetchInnbokser = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_INNBOKS}`)
);

const fetchInaktiveBeskjeder = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_BESKJED_INAKTIV}`)
);

const fetchInaktiveOppgaver = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_OPPGAVE_INAKTIV}`)
);

const fetchInaktiveInnbokser = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_INNBOKS_INAKTIV}`)
);

const fetchAntallBrukernotifikasjoner = () => (
  fetchJSON(`${Config.dittNav.DITTNAV_BRUKERNOTIFIKASJONER_COUNT}`)
);

const postHendelse = (path, content) => (
  postJSON(`${Config.dittNav.EVENT_TEST_PRODUCER_URL}/${path}`, content)
);

const postDoneAll = () => (
  postJSON(`${Config.dittNav.EVENT_TEST_PRODUCER_DONE_ALL_URL}`, null)
);

const postDone = (content) => (
  postJSON(`${Config.dittNav.DITTNAV_DONE_URL}`, content)
);

export default {
  checkAuth,
  checkApiStatus,
  fetchOppfolging,
  fetchMeldekort,
  fetchPersonNavn,
  fetchPersonIdent,
  fetchSaker,
  fetchMeldinger,
  fetchSakstema,
  fetchInnlogging,
  fetchBeskjeder,
  fetchOppgaver,
  fetchInnbokser,
  fetchInaktiveBeskjeder,
  fetchInaktiveOppgaver,
  fetchInaktiveInnbokser,
  fetchAntallBrukernotifikasjoner,
  postHendelse,
  postDoneAll,
  postDone,
  redirectToLogin,
  redirectToNavNo,
  tokenExpiresSoon,
};
