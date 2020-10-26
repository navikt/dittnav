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

  const setError = () => dispatch({
    type: 'SET_ERROR',
  });

  return (
    <StoreContext.Provider value={{
      state,
      addBeskjeder,
      addInaktivBeskjed,
      addInaktiveBeskjeder,
      removeBeskjed,
      toggleInnloggingsModal,
      setError,
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
