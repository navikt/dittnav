import React, { useEffect, useState } from 'react';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import PageFrame from '../PageFrame';
import Home from './Home';
import { ADD_BESKJEDER } from '../../types/Actions';
import ApiType from '../../types/ApiType';
import InnloggingsModal from '../../components/common/InnloggingsModal';
import useModal from '../../hooks/useModal';

const RenderHome = ({ api }) => {
  const [data, setData] = useState({
    oppfolging: null,
    meldekort: null,
    person: null,
    identifikator: null,
    paabegynteSoknader: null,
    mininnboks: [],
    sakstema: { antallSakstema: 0, sakstemaList: [] },
    innloggingsstatus: null,
    oppgaver: null,
    innbokser: null,
    antallBrukernotifikasjoner: 0,
    errors: [],
    fetching: 0,
    oppfolgingHasLoaded: false,
  });

  const { dispatch } = useBeskjedStore();
  const [visModal, toggleModal, handleModal] = useModal();

  const handleOppfolgingError = () => {
    setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1, oppfolgingHasLoaded: true }));
  };

  const incrementFetching = () => {
    setData(d => ({ ...d, fetching: d.fetching + 1 }));
  };

  useEffect(
    () => {
      const handleError = () => {
        incrementFetching();
        setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'] }));
      };

      api.fetchBeskjeder()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            incrementFetching();
            dispatch({ type: ADD_BESKJEDER, payload: content });
          }
        }).catch(handleError);

      api.fetchOppgaver()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, oppgaver: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchInnbokser()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, innbokser: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchAntallBrukernotifikasjoner()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, antallBrukernotifikasjoner: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchInnloggingsstatus()
        .then(([content]) => {
          if (!content.authenticated) {
            api.redirectToLogin();
          } else {
            setData(d => ({ ...d, innloggingsstatus: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchOppfolging()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, oppfolging: content, oppfolgingHasLoaded: true, fetching: d.fetching + 1 }));
          }
        }).catch(handleOppfolgingError);

      api.fetchMeldekort()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, meldekort: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchPersonNavn()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, person: content, fetching: d.fetching + 1 }));
          }
        }).catch(() => {
          api.fetchPersonIdent()
            .then(content => {
              setData(d => ({ ...d, identifikator: content, errors: [...d.errors, 'error.baksystemer'], fetching: d.fetching + 1 }));
            })
            .catch(handleError);
        });

      api.fetchSaker()
        .then(([content]) => {
          const { feilendeBaksystem } = content;
          if (feilendeBaksystem.length > 0) {
            setData(d => ({ ...d, paabegynteSoknader: content, fetching: d.fetching + 1, errors: [...d.errors, 'error.baksystemer'] }));
          } else {
            setData(d => ({ ...d, paabegynteSoknader: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchMeldinger()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, mininnboks: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);

      api.fetchSakstema()
        .then(([content, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            setData(d => ({ ...d, sakstema: content, fetching: d.fetching + 1 }));
          }
        }).catch(handleError);
    }, [],
  );

  const uniqueErrors = data.errors.filter((item, i, ar) => ar.indexOf(item) === i);
  const loading = data.fetching < 11;

  return (
    <PageFrame uniqueErrors={uniqueErrors}>
      {visModal
        ? <InnloggingsModal isOpen onClick={handleModal} />
        : <Home data={data} loading={loading} />}
    </PageFrame>
  );
};

RenderHome.propTypes = {
  api: ApiType.isRequired,
};

export default RenderHome;
