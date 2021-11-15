import { Dittnav, Innlogging, TestProducer } from './constants';

export const redirectToLogin = () => {
  window.location.assign(Innlogging.LOGINSERVICE_URL);
};

export const tokenExpiresSoon = (headers) => (
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
      resolve({ content, headers });
    })
    .catch(e => reject(e));
});

export const checkAuth = () => new Promise((resolve, reject) => {
  fetchJSON(`${Innlogging.INNLOGGINGSSTATUS_URL}?ts=${Date.now()}`)
    .then(({ content }) => {
      if (content.authenticated) {
        resolve(content);
      } else {
        reject(new Error('not authenticated'));
      }
    })
    .catch(() => reject(new Error('not authenticated')));
});

export const checkApiStatus = () => new Promise((resolve, reject) => {
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

export const fetchOppfolging = () => (
  fetchJSON(Dittnav.OPPFOLGING_URL)
);

export const fetchMeldekort = () => (
  fetchJSON(Dittnav.MELDEKORT_URL)
);

export const fetchPersonNavn = () => (
  fetchJSON(Dittnav.PERSON_NAVN_URL)
);

export const fetchPersonIdent = () => (
  fetchJSON(Dittnav.PERSON_IDENT_URL)
);

export const fetchSaker = () => (
  fetchJSON(Dittnav.SAKER_URL)
);

export const fetchMeldinger = () => (
  fetchJSON(Dittnav.MELDINGER_URL)
);

export const fetchSakstema = () => (
  fetchJSON(Dittnav.SAKSTEMA_URL)
);

export const fetchInnloggingsstatus = () => (
  fetchJSON(Innlogging.INNLOGGINGSSTATUS_URL)
);

export const fetchBeskjeder = () => (
  fetchJSON(Dittnav.BESKJED_URL)
);

export const fetchOppgaver = () => (
  fetchJSON(Dittnav.OPPGAVE_URL)
);

export const fetchInnbokser = () => (
  fetchJSON(Dittnav.INNBOKS_URL)
);

export const fetchInaktiveBeskjeder = () => (
  fetchJSON(Dittnav.BESKJED_INAKTIV_URL)
);

export const fetchInaktiveOppgaver = () => (
  fetchJSON(Dittnav.OPPGAVE_INAKTIV_URL)
);

export const fetchInaktiveInnbokser = () => (
  fetchJSON(Dittnav.INNBOKS_INAKTIV_URL)
);

export const postHendelse = (path, content) => (
  postJSON(`${TestProducer.URL}/${path}`, content)
);

export const postDoneAll = () => (
  postJSON(`${TestProducer.DONE_ALL_URL}`, null)
);

export const postDone = (content) => (
  postJSON(`${Dittnav.DONE_URL}`, content)
);

export const postDigisosDone = (content) => (
  postJSON(`${Dittnav.DIGISOS_DONE_URL}`, content)
);

export const postStatusoppdatering = (content) => (
  postJSON(`${TestProducer.STATUSOPPDATERING_URL}`, content)
);

export const fetchUnleashToggle = ({ queryKey }) => (
  fetchJSON(`${Dittnav.UNLEASH_URL}/${queryKey}`)
);