import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FeilMeldinger from '../../components/FeilMeldinger';
import { FeatureToggles } from '../../components/FeatureToggles';
import Home from './Home';
import '../../../less/index.less';
import Config from '../../Config';

const RenderHome = (props) => {
  const [data, setData] = useState({
    oppfolging: null,
    meldekort: null,
    person: null,
    identifikator: null,
    paabegynteSoknader: null,
    mininnboks: [],
    sakstema: { antallSakstema: 0, sakstemaList: [] },
    hendelser: [],
    errors: [],
    fetching: 0,
    oppfolgingHasLoaded: false,
  });

  const { featureToggles } = useContext(FeatureToggles);
  const { api } = props;

  const handleOppfolgingError = () => {
    setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1, oppfolgingHasLoaded: true }));
  };

  const incrementFetching = () => {
    setData(d => ({ ...d, fetching: d.fetching + 1 }));
  };

  const updateHendelser = (h) => (
    setData(d => ({ ...d, hendelser: h }))
  );

  useEffect(
    () => {
      const handleError = (e) => {
        incrementFetching();

        if (e.status === 401 || e.status === 403) {
          return;
        }

        setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'] }));
      };

      if (Config.IS_DEV) {
        api.fetchHendelser()
          .then((r) => {
            setData(d => ({ ...d, hendelser: r }));
          }).catch(handleError);
      }

      if (featureToggles && featureToggles['dittnav.ny-backend']) {
        api.fetchOppfolgingNyKilde()
          .then((r) => {
            setData(d => ({ ...d, oppfolging: r, oppfolgingHasLoaded: true, fetching: d.fetching + 1 }));
          }).catch(handleOppfolgingError);

        api.fetchMeldekortNyKilde()
          .then((r) => {
            setData(d => ({ ...d, meldekort: r, fetching: d.fetching + 1 }));
          }).catch(handleError);

        api.fetchPersonNavnNyKilde()
          .then((r) => {
            setData(d => ({ ...d, person: r, fetching: d.fetching + 1 }));
          }).catch(() => {
            api.fetchPersonIdent()
              .then(r => {
                setData(d => ({ ...d, identifikator: r, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1 }));
              })
              .catch(handleError);
          });

        api.fetchSakerNyKilde()
          .then((r) => {
            const { feilendeBaksystem } = r;
            if (feilendeBaksystem.length > 0) {
              setData(d => ({ ...d, paabegynteSoknader: r, fetching: d.fetching + 1, errors: [...d.errors, 'error.baksystemer'] }));
            } else {
              setData(d => ({ ...d, paabegynteSoknader: r, fetching: d.fetching + 1 }));
            }
          }).catch(handleError);

        api.fetchMeldingerNyKilde()
          .then((r) => {
            setData(d => ({ ...d, mininnboks: r, fetching: d.fetching + 1 }));
          }).catch(handleError);

        api.fetchSakstemaNyKilde()
          .then((r) => {
            setData(d => ({ ...d, sakstema: r, fetching: d.fetching + 1 }));
          }).catch(handleError);
      } else {
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
      }
    }, [featureToggles, api],
  );

  const uniqueErrors = data.errors.filter((item, i, ar) => ar.indexOf(item) === i);
  const loading = data.fetching < 6; // Denne logikken må endres

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
          loading={loading}
          sakstema={data.sakstema}
          hendelser={data.hendelser}
          updateHendelser={updateHendelser}
          oppfolgingHasLoaded={data.oppfolgingHasLoaded}
        />
      </div>
    </main>
  );
};

RenderHome.propTypes = {
  api: PropTypes.shape({
    fetchOppfolging: PropTypes.func.isRequired,
    fetchPersonNavn: PropTypes.func.isRequired,
    fetchPersonIdent: PropTypes.func.isRequired,
    fetchMeldekort: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
    fetchSakstema: PropTypes.func.isRequired,
    fetchOppfolgingNyKilde: PropTypes.func.isRequired,
    fetchPersonNavnNyKilde: PropTypes.func.isRequired,
    fetchPersonIdentNyKilde: PropTypes.func.isRequired,
    fetchMeldekortNyKilde: PropTypes.func.isRequired,
    fetchSakerNyKilde: PropTypes.func.isRequired,
    fetchMeldingerNyKilde: PropTypes.func.isRequired,
    fetchSakstemaNyKilde: PropTypes.func.isRequired,
    fetchHendelser: PropTypes.func.isRequired,
  }).isRequired,
};

export default RenderHome;
