import * as fetch from 'isomorphic-fetch';

const fetchAllData = () => {
  return fetch('/mock-api.json').then(r => r.json());
};

export default fetchAllData;
