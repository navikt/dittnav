import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import { varslingerReducer, initialVarslingerState } from '../../reducers/varslingerReducer';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import DelayedSpinner from '../../components/DelayedSpinner';
import scroll from '../../utils/scroll';
import {
  ADD_BESKJEDER, ADD_OPPGAVER, ADD_INNBOKSER, ADD_INAKTIVE_BESKJEDER, ADD_INAKTIVE_OPPGAVER, ADD_INAKTIVE_INNBOKSER,
  ADD_INNLOGGING, SET_BESKJEDER_LOADING, SET_INAKTIVE_BESKJEDER_LOADING, BESKJEDER_ERROR, OPPGAVER_ERROR,
  INNBOKSER_ERROR, INAKTIVE_BESKJEDER_ERROR, INAKTIVE_OPPGAVER_ERROR, INNLOGGING_ERROR, INAKTIVE_INNBOKSER_ERROR,
} from '../../types/Actions';
import ApiType from '../../types/ApiType';
import useModal from '../../hooks/useModal';
import InnloggingsModal from '../../components/common/InnloggingsModal';

const RenderVarslinger = ({ api }) => {
  const [state, dispatch] = useReducer(varslingerReducer, initialVarslingerState);
  const [visModal, toggleModal, handleModal] = useModal();
  const store = useBeskjedStore();
  const location = useLocation();

  const dispatchResult = (type, result, _dispatch = dispatch) => (
    _dispatch({ type, payload: result })
  );

  const dispatchError = (type) => (
    dispatch({ type, payload: 'error.baksystemer' })
  );

  useEffect(
    () => {
      api.fetchBeskjeder()
        .then(([result, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            dispatchResult(ADD_BESKJEDER, result, store.dispatch);
            dispatchResult(SET_BESKJEDER_LOADING, result);
          }
        })
        .catch(() => dispatchError(BESKJEDER_ERROR));

      api.fetchOppgaver()
        .then(([result, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            dispatchResult(ADD_OPPGAVER, result);
          }
        })
        .catch(() => dispatchError(OPPGAVER_ERROR));

      api.fetchInnbokser()
        .then(([result, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            dispatchResult(ADD_INNBOKSER, result);
          }
        })
        .catch(() => dispatchError(INNBOKSER_ERROR));

      api.fetchInaktiveBeskjeder()
        .then(([result, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            dispatchResult(ADD_INAKTIVE_BESKJEDER, result, store.dispatch);
            dispatchResult(SET_INAKTIVE_BESKJEDER_LOADING, result);
          }
        })
        .catch(() => dispatchError(INAKTIVE_BESKJEDER_ERROR));

      api.fetchInaktiveOppgaver()
        .then(([result, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            dispatchResult(ADD_INAKTIVE_OPPGAVER, result);
          }
        })
        .catch(() => dispatchError(INAKTIVE_OPPGAVER_ERROR));

      api.fetchInaktiveInnbokser()
        .then(([result, headers]) => {
          if (api.tokenExpiresSoon(headers)) {
            toggleModal();
          } else {
            dispatchResult(ADD_INAKTIVE_INNBOKSER, result);
          }
        })
        .catch(() => dispatchError(INAKTIVE_INNBOKSER_ERROR));

      api.fetchInnlogging()
        .then(([result]) => {
          if (!result.authenticated) {
            api.redirectToLogin();
          } else {
            dispatchResult(ADD_INNLOGGING, result);
          }
        })
        .catch(() => dispatchError(INNLOGGING_ERROR));
    }, [],
  );

  const areLoading = (key) => state[key].loading;
  const isLoading = Object.keys(state).some(areLoading);

  if (!isLoading && location.hash) {
    scroll(location.hash);
  }

  if (visModal) {
    return (<InnloggingsModal onClick={handleModal} isOpen />);
  }

  return (
    <>
      {isLoading
        ? <DelayedSpinner delay={500} spinnerClass="header-spinner spinner-container" />
        : (
          <PageFrame uniqueErrors={state.error}>
            <Varslinger
              oppgaver={state.oppgaver.data}
              innbokser={state.innbokser.data}
              inaktiveOppgaver={state.inaktiveOppgaver.data}
              inaktiveInnbokser={state.inaktiveInnbokser.data}
              innlogging={state.innlogging.data}
            />
          </PageFrame>
        )}
    </>
  );
};

RenderVarslinger.propTypes = {
  api: ApiType.isRequired,
};

export default RenderVarslinger;
