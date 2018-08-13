import * as fetch from 'isomorphic-fetch';
import conf from 'js/Config';

const fetchJSONAndCheckForErrors = (url) => {
  const p = new Promise((res, rej) => {
    fetch(url)
      .then((r) => {
        if (!r.ok) {
          // throw new Error('Error happened on requesting a resource');
          rej(new Error('Error happened on requesting a resource'));
        }
        res(r.json());
      })
      .catch((e) => {
        rej(e);
      });
  });
  return p;
};

const fetchPersonInfoAndServices = () => fetchJSONAndCheckForErrors(conf.dittNav.DITTNAV_API_URL);
const fetchPaabegynteSaker = () => fetchJSONAndCheckForErrors(conf.dittNav.SAKSOVERSIKT_API_URL);
const fetchMinInnboksData = () => fetchJSONAndCheckForErrors(`${conf.dittNav.MIN_INNBOKS_URL}${conf.MININNBOKS_UBEHANDLET_URL}`);

export default {
  fetchPersonInfoAndServices,
  fetchPaabegynteSaker,
  fetchMinInnboksData,
};
