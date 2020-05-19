import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import PageFrame from '../PageFrame';
import Home from './Home';
import { ADD_BESKJEDER, ADD_INAKTIVE_BESKJEDER } from '../../types/Actions';
import ApiType from '../../types/ApiType';
import { trackPageView } from '../../utils/GoogleAnalytics';

const RenderHome = ({ api }) => {
  const [data, setData] = useState({
    oppfolging: null,
    meldekort: null,
    person: null,
    identifikator: null,
    paabegynteSoknader: null,
    mininnboks: [],
    sakstema: { antallSakstema: 0, sakstemaList: [] },
    innlogging: null,
    oppgaver: null,
    innbokser: null,
    inaktiveOppgaver: null,
    inaktiveInnbokser: null,
    errors: [],
    fetching: 0,
    oppfolgingHasLoaded: false,
  });

  const location = useLocation();
  const { dispatch } = useBeskjedStore();

  const handleOppfolgingError = () => {
    setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1, oppfolgingHasLoaded: true }));
  };

  const incrementFetching = () => {
    setData(d => ({ ...d, fetching: d.fetching + 1 }));
  };

  useEffect(
    () => {
      trackPageView(location);
    }, [],
  );

  useEffect(
    () => {
      const handleError = () => {
        incrementFetching();
        setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'] }));
      };

      api.fetchBeskjeder()
        .then((r) => {
          incrementFetching();
          dispatch({ type: ADD_BESKJEDER, payload: r });
        }).catch(handleError);

      api.fetchOppgaver()
        .then((r) => {
          setData(d => ({ ...d, oppgaver: r, fetching: d.fetching + 1 }));
        }).catch(handleError);

      api.fetchInnbokser()
        .then((r) => {
          setData(d => ({ ...d, innbokser: r, fetching: d.fetching + 1 }));
        }).catch(handleError);

      api.fetchInaktiveBeskjeder()
        .then((r) => {
          incrementFetching();
          dispatch({ type: ADD_INAKTIVE_BESKJEDER, payload: r });
        }).catch(handleError);

      api.fetchInaktiveOppgaver()
        .then((r) => {
          setData(d => ({ ...d, inaktiveOppgaver: r, fetching: d.fetching + 1 }));
        }).catch(handleError);

      api.fetchInaktiveInnbokser()
        .then((r) => {
          setData(d => ({ ...d, inaktiveInnbokser: r, fetching: d.fetching + 1 }));
        }).catch(handleError);

      api.fetchInnlogging()
        .then((r) => {
          setData(d => ({ ...d, innlogging: r, fetching: d.fetching + 1 }));
        }).catch(handleError);

      api.fetchOppfolging()
        .then((r) => {
          setData(d => ({ ...d, oppfolging: r, oppfolgingHasLoaded: true, fetching: d.fetching + 1 }));
        }).catch(handleOppfolgingError);

      api.fetchMeldekort()
        .then((r) => {
          setData(d => ({ ...d, meldekort: r, fetching: d.fetching + 1 }));
        }).catch(handleError);

      api.fetchPersonNavn()
        .then((r) => {
          setData(d => ({ ...d, person: r, fetching: d.fetching + 1 }));
        }).catch(() => {
          api.fetchPersonIdent()
            .then(r => {
              setData(d => ({ ...d, identifikator: r, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1 }));
            })
            .catch(handleError);
        });

      api.fetchSaker()
        .then((r) => {
          const { feilendeBaksystem } = r;
          if (feilendeBaksystem.length > 0) {
            setData(d => ({ ...d, paabegynteSoknader: r, fetching: d.fetching + 1, errors: [...d.errors, 'error.baksystemer'] }));
          } else {
            setData(d => ({ ...d, paabegynteSoknader: r, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchMeldinger()
        .then((r) => {
          setData(d => ({ ...d, mininnboks: r, fetching: d.fetching + 1 }));
        }).catch(handleError);

      api.fetchSakstema()
        .then((r) => {
          setData(d => ({ ...d, sakstema: r, fetching: d.fetching + 1 }));
        }).catch(handleError);
    }, [],
  );

  const uniqueErrors = data.errors.filter((item, i, ar) => ar.indexOf(item) === i);
  const loading = data.fetching < 13;

  return (
    <PageFrame uniqueErrors={uniqueErrors}>
      <Home data={data} loading={loading} />
    </PageFrame>
  );
};

RenderHome.propTypes = {
  api: ApiType.isRequired,
};

export default RenderHome;
