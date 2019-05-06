import conf from 'js/Config';
import Promise from 'promise-polyfill';

const fetchJSONAndCheckForErrors = (url) => {
  const p = new Promise((res, rej) => {
    fetch(url, { method: 'GET', credentials: 'include' }) // eslint-disable-line no-undef
      .then((r) => {
        if (r.status === 401 || (r.status === 0 && !r.ok)) {
          window.location.assign(`${conf.dittNav.LOGINSERVICE}&redirect=${window.location.href}`); // eslint-disable-line no-undef
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
  return p;
};

const fetchPersonInfoAndServices = () => fetchJSONAndCheckForErrors(`${conf.dittNav.DITTNAV_API_URL}`);

export default {
  fetchPersonInfoAndServices,
};
