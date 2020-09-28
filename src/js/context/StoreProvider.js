import React, { createContext, useReducer } from 'react';
import { node } from 'prop-types';
import storeReducer, { initialStoreState } from '../reducers/storeReducer';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialStoreState());

  const addBeskjeder = (nyeBeskjeder) => dispatch({
    type: 'ADD_BESKJEDER',
    payload: nyeBeskjeder,
  });

  const addInaktiveBeskjeder = (nyeBeskjeder) => dispatch({
    type: 'ADD_INAKTIVE_BESKJEDER',
    payload: nyeBeskjeder,
  });

  const removeBeskjed = (beskjed) => dispatch({
    type: 'REMOVE_BESKJED',
    payload: beskjed,
  });

  const addInaktivBeskjed = (beskjed) => dispatch({
    type: 'ADD_INAKTIV_BESKJED',
    payload: beskjed,
  });

  const toggleInnloggingsModal = () => dispatch({
    type: 'TOGGLE_INNLOGGINGSMODAL',
  });

  const addOppgaver = (oppgaver) => dispatch({
    type: 'ADD_OPPGAVER',
    payload: oppgaver,
  });

  const addInnbokser = (innbokser) => dispatch({
    type: 'ADD_INNBOKSER',
    payload: innbokser,
  });

  const addInaktiveOppgaver = (inaktiveOppgaver) => dispatch({
    type: 'ADD_INAKTIVE_OPPGAVER',
    payload: inaktiveOppgaver,
  });

  const addInaktiveInnbokser = (inaktiveInnbokser) => dispatch({
    type: 'ADD_INAKTIVE_INNBOKSER',
    payload: inaktiveInnbokser,
  });

  const addInnloggingsstatus = (innloggingsstatus) => dispatch({
    type: 'ADD_INNLOGGINGSSTATUS',
    payload: innloggingsstatus,
  });

  const addOppfolging = (oppfolging) => dispatch({
    type: 'ADD_OPPFOLGING',
    payload: oppfolging,
  });

  const addMeldekort = (meldekort) => dispatch({
    type: 'ADD_MELDEKORT',
    payload: meldekort,
  });

  const addNavn = (navn) => dispatch({
    type: 'ADD_NAVN',
    payload: navn,
  });

  const addIdent = (Ident) => dispatch({
    type: 'ADD_IDENT',
    payload: Ident,
  });

  const addPaabegynteSoknader = (paabegynteSoknader) => dispatch({
    type: 'ADD_PAABEGYNTESOKNADER',
    payload: paabegynteSoknader,
  });

  const addMeldinger = (meldinger) => dispatch({
    type: 'ADD_MELDINGER',
    payload: meldinger,
  });

  const addSakstema = (sakstema) => dispatch({
    type: 'ADD_SAKSTEMA',
    payload: sakstema,
  });

  const setErrorBeskjeder = () => dispatch({
    type: 'ERROR_BESKJEDER',
  });

  const setErrorInaktiveBeskjeder = () => dispatch({
    type: 'ERROR_INAKTIVE_BESKJEDER',
  });

  const setErrorOppgaver = () => dispatch({
    type: 'ERROR_OPPGAVER',
  });

  const setErrorInnbokser = () => dispatch({
    type: 'ERROR_INNBOKSER',
  });

  const setErrorInaktiveOppgaver = () => dispatch({
    type: 'ERROR_INAKTIVE_OPPGAVER',
  });

  const setErrorInaktiveInnbokser = () => dispatch({
    type: 'ERROR_INAKTIVE_INNBOKSER',
  });

  const setErrorInnloggingsstatus = () => dispatch({
    type: 'ERROR_INNLOGGINGSSTATUS',
  });

  const setErrorOppfolging = () => dispatch({
    type: 'ERROR_OPPFOLGING',
  });

  const setErrorMeldekort = () => dispatch({
    type: 'ERROR_MELDEKORT',
  });

  const setErrorNavn = () => dispatch({
    type: 'ERROR_NAVN',
  });

  const setErrorIdent = () => dispatch({
    type: 'ERROR_IDENT',
  });

  const setErrorPaabegynteSoknader = () => dispatch({
    type: 'ERROR_PAABEGYNTESOKNADER',
  });

  const setErrorMeldinger = () => dispatch({
    type: 'ERROR_MELDINGER',
  });

  const setErrorSakstema = () => dispatch({
    type: 'ERROR_SAKSTEMA',
  });

  return (
    <StoreContext.Provider value={{
      state,
      addBeskjeder,
      addOppgaver,
      addInnbokser,
      addInaktivBeskjed,
      addInaktiveBeskjeder,
      addInnloggingsstatus,
      addInaktiveOppgaver,
      addInaktiveInnbokser,
      addOppfolging,
      addMeldekort,
      addNavn,
      addIdent,
      addPaabegynteSoknader,
      addMeldinger,
      addSakstema,
      removeBeskjed,
      toggleInnloggingsModal,
      setErrorBeskjeder,
      setErrorInaktiveBeskjeder,
      setErrorOppgaver,
      setErrorInnbokser,
      setErrorInaktiveOppgaver,
      setErrorInaktiveInnbokser,
      setErrorInnloggingsstatus,
      setErrorOppfolging,
      setErrorMeldekort,
      setErrorNavn,
      setErrorIdent,
      setErrorPaabegynteSoknader,
      setErrorMeldinger,
      setErrorSakstema,
    }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: node.isRequired,
};

export default StoreProvider;
