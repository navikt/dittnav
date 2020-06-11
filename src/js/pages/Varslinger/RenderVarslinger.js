import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import { varslingerReducer, initialVarslingerState } from '../../reducers/varslingerReducer';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import DelayedSpinner from '../../components/DelayedSpinner';
import scroll from '../../utils/scroll';
import {
  ADD_BESKJEDER,
  ADD_OPPGAVER,
  ADD_INNBOKSER,
  ADD_INAKTIVE_BESKJEDER,
  ADD_INAKTIVE_OPPGAVER,
  ADD_INAKTIVE_INNBOKSER,
  ADD_INNLOGGING,
  SET_BESKJEDER_LOADING,
  SET_INAKTIVE_BESKJEDER_LOADING,
  ERROR,
} from '../../types/Actions';
import ApiType from '../../types/ApiType';

const RenderVarslinger = ({ api }) => {
  const [state, dispatch] = useReducer(varslingerReducer, initialVarslingerState);
  const store = useBeskjedStore();
  const location = useLocation();

  const dispatchResult = (type, result, _dispatch = dispatch) => (
    _dispatch({ type, payload: result })
  );

  const dispatchError = () => (
    dispatch({ type: ERROR, payload: null })
  );

  useEffect(
    () => {
      api.fetchBeskjeder()
        .then((result) => {
          dispatchResult(ADD_BESKJEDER, result, store.dispatch);
          dispatchResult(SET_BESKJEDER_LOADING, result);
        })
        .catch(dispatchError);

      api.fetchOppgaver()
        .then((result) => dispatchResult(ADD_OPPGAVER, result))
        .catch(dispatchError);

      api.fetchInnbokser()
        .then((result) => dispatchResult(ADD_INNBOKSER, result))
        .catch(dispatchError);

      api.fetchInaktiveBeskjeder()
        .then((result) => {
          dispatchResult(ADD_INAKTIVE_BESKJEDER, result, store.dispatch);
          dispatchResult(SET_INAKTIVE_BESKJEDER_LOADING, result);
        })
        .catch(dispatchError);

      api.fetchInaktiveOppgaver()
        .then((result) => dispatchResult(ADD_INAKTIVE_OPPGAVER, result))
        .catch(dispatchError);

      api.fetchInaktiveInnbokser()
        .then((result) => dispatchResult(ADD_INAKTIVE_INNBOKSER, result))
        .catch(dispatchError);

      api.fetchInnlogging()
        .then((result) => dispatchResult(ADD_INNLOGGING, result))
        .catch(dispatchError);
    }, [],
  );

  const areLoading = (key) => state[key].loading === true;

  const isLoading = Object.keys(state)
    .some(areLoading);

  if (!isLoading && location.hash) {
    scroll(location.hash);
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
