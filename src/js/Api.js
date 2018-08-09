import * as fetch from 'isomorphic-fetch';
import conf from 'js/Config';

const fetchPersonInfoAndServices = () => fetch(conf.dittNav.DITTNAV_API_URL).then(r => r.json());
const fetchPaabegynteSaker = () => fetch(conf.dittNav.SAKSOVERSIKT_API_URL).then(r => r.json());
const fetchMinInnboksData = () => fetch(conf.dittNav.MIN_INNBOKS_URL + conf.MININNBOKS_UBEHANDLET_URL).then(r => r.json());

export default {
  fetchPersonInfoAndServices,
  fetchPaabegynteSaker,
  fetchMinInnboksData,
};
