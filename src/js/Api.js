import conf from 'js/Config';

const fetchJSONAndCheckForErrors = (url) => {
  const p = new Promise((res, rej) => {
    fetch(url, { method: 'GET', mode: 'no-cors' })
      .then((r) => {
        if (r.status === 401) {
          window.location.assign(`${conf.dittNav.LOGINSERVICE}?redirect=${window.location.href}`); // eslint-disable-line no-undef
          rej(new Error('Unauthorized'));
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

const fetchPersonInfoAndServices = () => fetchJSONAndCheckForErrors(`${conf.dittNav.SERVICES_URL}${conf.dittNav.DITTNAV_API_URL}`);
const fetchPaabegynteSaker = () => fetchJSONAndCheckForErrors(`${conf.dittNav.SERVICES_URL}${conf.dittNav.SAKSOVERSIKT_API_URL}`);
const fetchMinInnboksData = () => fetchJSONAndCheckForErrors(`${conf.dittNav.SERVICES_URL}${conf.dittNav.MIN_INNBOKS_URL}${conf.MININNBOKS_UBEHANDLET_URL}`);

export default {
  fetchPersonInfoAndServices,
  fetchPaabegynteSaker,
  fetchMinInnboksData,
};
