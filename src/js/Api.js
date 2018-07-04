import * as fetch from 'isomorphic-fetch';

const fetchAllData = () => fetch(window.dittnavSettings.DITTNAV_API_URL).then(r => r.json()); // eslint-disable-line no-undef

export default fetchAllData;
