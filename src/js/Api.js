import { useState, useEffect } from 'react';
import Config from './Config';
import PropTypes from 'prop-types';

const redirectToLogin = () => {
  window.location.assign(`${Config.dittNav.LOGINSERVICE}&redirect=${window.location.href}`);
};

const fetchUnleashFeatures = (features) => {
  const fString = features.map(f => `feature=${f}`);
  const URL = `${Config.dittNav.CONTEXT_PATH}/api/feature`;
  return Promise.race([
    fetch(`${URL}?${fString.join('&')}`, { method: 'GET' })
      .then(r => r.json()),
    new Promise((_, reject) => setTimeout(() => {
      const message = `Couldnt wait for unleash longer than ${Config.UNLEASH_TIMEOUT} msec`;
      return reject(new Error(message));
    }, Config.UNLEASH_TIMEOUT))]);
};

const fetchJSON = (url) => new Promise((res, rej) => {
  fetch(url, { method: 'GET', credentials: 'include' })
    .then(r => {
      if (r.ok) {
        return r.json();
      }
      rej(r);
      return null;
    })
    .then(r => res(r))
    .catch(e => rej(e));
});

const checkAuth = () => new Promise((res, rej) => {
  fetchJSON(`${Config.INNLOGGINGSLINJE_AUTH}`)
    .then(r => {
      if (r.authenticated) {
        res(r);
      } else {
        rej(new Error('not authenticated'));
      }
    })
    .catch(e => rej(e));
});

const checkApiStatus = () => new Promise((res, rej) => {
  fetchJSON(`${Config.dittNav.DITTNAV_API_URL}`)
    .then(r => res(r))
    .catch(e => rej(e));
});

const sendJSONAndCheckForErrors = (tekst, url = `${Config.dittNav.DITTNAV_HENDELSER_URL}`) => {
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tekst,
      link: 'https://localhost/100',
    }),
  })
    .then((r) => r.status)
    // eslint-disable-next-line no-console
    .catch((e) => console.log(`ERROR: ${e}`));
};

const fetchPersonInfoAndServices = () => fetchJSON(`${Config.dittNav.DITTNAV_API_URL}`);
const fetchSaker = () => fetchJSON(`${Config.dittNav.DITTNAV_SAKER_URL}`);
const fetchMeldinger = () => fetchJSON(`${Config.dittNav.DITTNAV_MELDINGER_URL}`);
const fetchSakstema = () => fetchJSON(Config.dittNav.DITTNAV_SAKSTEMA_URL);
const fetchHendelser = () => fetchJSON(`${Config.dittNav.DITTNAV_HENDELSER_URL}`);

const useFetchEverythingForHome = () => {
  const [info, setInfo] = useState({});
  const [paabegynteSoknader, setPaabegynteSoknader] = useState(null);
  const [mininnboks, setMininnboks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [sakstema, setSakstema] = useState({ antallSakstema: 0, sakstemaList: [] });
  const [isLoaded, setLoaded] = useState(false);

  const REQUESTS_TO_WAIT = 4;

  useEffect(() => {
    let fetching = 0, setFetching = (f) => fetching = f;
    function fetch() {
      const catchError = msg => () => {
        errors.push(msg);
        setErrors(errors);
        setFetching(fetching + 1);
      };

      const updateLoading = () => {
        setFetching(fetching + 1);
        if ((fetching) >= REQUESTS_TO_WAIT) {
          setLoaded(true)
        }
      }
      fetchPersonInfoAndServices()
        .then((r) => {
          const { feilendeTjenester } = r;
          if (feilendeTjenester.length > 0) {
            errors.push('error.baksystemer');
          }
          setInfo(r);
          setErrors(errors);
          updateLoading();
        })
        .catch(catchError('error.baksystemer'));

      fetchSaker()
        .then((r) => {
          const { feilendeBaksystem } = r;
          if (feilendeBaksystem.length > 0) {
            errors.push('error.baksystemer');
          }
          setPaabegynteSoknader(r);
          updateLoading();
        }).catch(catchError('error.baksystemer'));

      fetchMeldinger()
        .then((r) => {
          setMininnboks(r);
          updateLoading();
        }).catch(catchError('error.baksystemer'));

      fetchSakstema()
        .then((r) => {
          setSakstema(r);
          updateLoading();
        }).catch(catchError('error.baksystemer'));
    
    }
    fetch();

  }, [errors]);

  return [{ info, paabegynteSoknader, mininnboks, sakstema, errors, isLoaded }];
}

const ApiType = () => {
  return PropTypes.shape({
    fetchPersonInfoAndServices: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
    fetchSakstema: PropTypes.func.isRequired,
  }).isRequired;
}

export default {
  fetchUnleashFeatures,
  checkAuth,
  checkApiStatus,
  fetchPersonInfoAndServices,
  fetchSaker,
  fetchMeldinger,
  fetchHendelser,
  fetchSakstema,
  sendHendelser: sendJSONAndCheckForErrors,
  useFetchEverythingForHome,
  redirectToLogin,
  ApiType,
};
