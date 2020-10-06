import { Dittnav, Innlogging, TestProducer } from './constants';

const redirectToLogin = () => {
  window.location.assign(`${Innlogging.LOGINSERVICE_URL}`);
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
  fetchJSON(`${Innlogging.INNLOGGINGSLINJE_AUTH_URL}?ts=${Date.now()}`)
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
  fetchJSON(`${Dittnav.API_AUTH_URL}`)
    .then(([response]) => {
      resolve(response);
    })
    .catch(e => {
      reject(e);
    });
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
  fetchJSON(`${Dittnav.OPPFOLGING_URL}`)
);

const fetchMeldekort = () => (
  fetchJSON(`${Dittnav.MELDEKORT_URL}`)
);

const fetchPersonNavn = () => (
  fetchJSON(`${Dittnav.PERSON_NAVN_URL}`)
);

const fetchPersonIdent = () => (
  fetchJSON(`${Dittnav.PERSON_IDENT_URL}`)
);

const fetchSaker = () => (
  fetchJSON(`${Dittnav.SAKER_URL}`)
);

const fetchMeldinger = () => (
  fetchJSON(`${Dittnav.MELDINGER_URL}`)
);

const fetchSakstema = () => (
  fetchJSON(Dittnav.SAKSTEMA_URL)
);

const fetchInnloggingsstatus = () => (
  fetchJSON(`${Innlogging.INNLOGGINGSLINJE_AUTH_URL}`)
);

const fetchBeskjeder = () => (
  fetchJSON(`${Dittnav.BESKJED_URL}`)
);

const fetchOppgaver = () => (
  fetchJSON(`${Dittnav.OPPGAVE_URL}`)
);

const fetchInnbokser = () => (
  fetchJSON(`${Dittnav.INNBOKS_URL}`)
);

const fetchInaktiveBeskjeder = () => (
  fetchJSON(`${Dittnav.BESKJED_INAKTIV_URL}`)
);

const fetchInaktiveOppgaver = () => (
  fetchJSON(`${Dittnav.OPPGAVE_INAKTIV_URL}`)
);

const fetchInaktiveInnbokser = () => (
  fetchJSON(`${Dittnav.INNBOKS_INAKTIV_URL}`)
);

const postHendelse = (path, content) => (
  postJSON(`${TestProducer.URL}/${path}`, content)
);

const postDoneAll = () => (
  postJSON(`${TestProducer.DONE_ALL_URL}`, null)
);

const postDone = (content) => (
  postJSON(`${Dittnav.DONE_URL}`, content)
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
  fetchInnloggingsstatus,
  fetchBeskjeder,
  fetchOppgaver,
  fetchInnbokser,
  fetchInaktiveBeskjeder,
  fetchInaktiveOppgaver,
  fetchInaktiveInnbokser,
  postHendelse,
  postDoneAll,
  postDone,
  redirectToLogin,
  tokenExpiresSoon,
};
