import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FeilMeldinger from './components/FeilMeldinger';
import { FeatureToggles } from './components/FeatureTogglesProvider';
import Home from './pages/Home';
import '../less/index.less';

function App(props) {
  const [data, setData] = useState({
    oppfolging: null,
    meldekort: null,
    person: null,
    identifikator: null,
    paabegynteSoknader: null,
    mininnboks: [],
    sakstema: { antallSakstema: 0, sakstemaList: [] },
    errors: [],
    fetching: 0,
    oppfolgingHasLoaded: false,
  });

  const { toggles } = useContext(FeatureToggles);
  const { api } = props;

  const handleOppfolgingError = () => {
    setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1, oppfolgingHasLoaded: true }));
  };

  const incrementFetching = () => {
    setData(d => ({ ...d, fetching: d.fetching + 1 }));
  };

  useEffect(
    () => {
      const handleError = (e) => {
        incrementFetching();

        if (e.status === 401 || e.status === 403) {
          return;
        }

        setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'] }));
      };

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
    }, [api],
  );


  // Denne dras ut midlertidig for å unngå at ALLE kallene kjøres på nytt når oppfølging hentes.
  useEffect(
    () => {
      if (toggles && toggles['dittnav.ny-backend']) {
        api.fetchOppfolgingNyKilde()
          .then((r) => {
            setData(d => ({ ...d, oppfolging: r, oppfolgingHasLoaded: true, fetching: d.fetching + 1 }));
          }).catch(handleOppfolgingError);
      } else {
        api.fetchOppfolging()
          .then((r) => {
            setData(d => ({ ...d, oppfolging: r, oppfolgingHasLoaded: true, fetching: d.fetching + 1 }));
          }).catch(handleOppfolgingError);
      }
    }, [toggles, api],
  );

  const uniqueErrors = data.errors.filter((item, i, ar) => ar.indexOf(item) === i);

  return (
    <main role="main">
      <FeilMeldinger errors={uniqueErrors} />
      <div className="container">
        <Home
          oppfolging={data.oppfolging}
          meldekort={data.meldekort}
          person={data.person}
          identifikator={data.identifikator}
          paabegynteSoknader={data.paabegynteSoknader}
          mininnboks={data.mininnboks}
          fetching={data.fetching}
          sakstema={data.sakstema}
          oppfolgingHasLoaded={data.oppfolgingHasLoaded}
        />
      </div>
    </main>
  );
}

App.propTypes = {
  api: PropTypes.shape({
    fetchOppfolging: PropTypes.func.isRequired,
    fetchOppfolgingNyKilde: PropTypes.func.isRequired,
    fetchPersonNavn: PropTypes.func.isRequired,
    fetchPersonIdent: PropTypes.func.isRequired,
    fetchMeldekort: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
    fetchSakstema: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
