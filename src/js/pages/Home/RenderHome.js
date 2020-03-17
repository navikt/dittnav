import React, { useEffect, useState } from 'react';
import Home from './Home';
import Config from '../../globalConfig';
import PageFrame from '../PageFrame';
import HendelseContext from '../../context/HendelseContext';
import ApiType from '../../types/ApiType';

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
    beskjeder: [],
    oppgaver: [],
    innbokser: [],
    errors: [],
    fetching: 0,
    oppfolgingHasLoaded: false,
  });

  const handleOppfolgingError = () => {
    setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1, oppfolgingHasLoaded: true }));
  };

  const incrementFetching = () => {
    setData(d => ({ ...d, fetching: d.fetching + 1 }));
  };

  const updateBeskjeder = (b) => (
    setData(d => ({ ...d, beskjeder: b }))
  );

  useEffect(
    () => {
      const handleError = () => {
        incrementFetching();

        setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'] }));
      };

      if (Config.HENDELSER_FEATURE_TOGGLE) {
        api.fetchBeskjeder()
          .then((r) => {
            setData(d => ({ ...d, beskjeder: r }));
          }).catch(handleError);
      }
      if (Config.HENDELSER_FEATURE_TOGGLE) {
        api.fetchOppgaver()
          .then((r) => {
            setData(d => ({ ...d, oppgaver: r }));
          }).catch(handleError);
      }
      if (Config.HENDELSER_FEATURE_TOGGLE) {
        api.fetchInnbokser()
          .then((r) => {
            setData(d => ({ ...d, innbokser: r }));
          }).catch(handleError);
      }
      if (Config.HENDELSER_FEATURE_TOGGLE) {
        api.fetchInnlogging()
          .then((r) => {
            setData(d => ({ ...d, innlogging: r }));
          }).catch(handleError);
      }

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
  const loading = data.fetching < 6;

  return (
    <HendelseContext.Provider value={updateBeskjeder}>
      <PageFrame uniqueErrors={uniqueErrors}>
        <Home data={data} loading={loading} />
      </PageFrame>
    </HendelseContext.Provider>
  );
};

RenderHome.propTypes = {
  api: ApiType.isRequired,
};

export default RenderHome;
