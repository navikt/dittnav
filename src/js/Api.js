import conf from 'js/Config';
import Promise from 'promise-polyfill';

const redirectToLogin = () => {
  window.location.assign(`${conf.dittNav.LOGINSERVICE}&redirect=${window.location.href}`); // eslint-disable-line no-undef
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
        res(r.json());
      })
      .catch((e) => {
        rej(e);
      });
  });
};

const fetchPersonInfoAndServices = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITTNAV_API_URL}`);
const fetchSaker = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITTNAV_SAKER_URL}`);
const fetchMeldinger = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITNTAV_MELDINGER_URL}`);

export default {
  checkAuth,
  fetchPersonInfoAndServices,
  fetchSaker,
  fetchMeldinger
};
