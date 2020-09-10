import React, { createContext, useReducer } from 'react';
import { arrayOf, node } from 'prop-types';
import storeReducer, { initialStoreState } from '../reducers/storeReducer';
import {
  ADD_BESKJEDER,
  ADD_INAKTIVE_BESKJEDER,
  ADD_INAKTIV_BESKJED,
  REMOVE_BESKJED,
  VIS_INNLOGGINGSMODAL,
} from '../types/Actions';
import BeskjedType from '../types/BeskjedType';

export const StoreContext = createContext(null);

const StoreProvider = ({ beskjeder, inaktiveBeskjeder, children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialStoreState(beskjeder, inaktiveBeskjeder));

  const addBeskjeder = (nyeBeskjeder) => dispatch({
    type: ADD_BESKJEDER,
    payload: nyeBeskjeder,
  });

  const addInaktiveBeskjeder = (nyeBeskjeder) => dispatch({
    type: ADD_INAKTIVE_BESKJEDER,
    payload: nyeBeskjeder,
  });

  const removeBeskjed = (beskjed) => dispatch({
    type: REMOVE_BESKJED,
    payload: beskjed,
  });

  const addInaktivBeskjed = (beskjed) => dispatch({
    type: ADD_INAKTIV_BESKJED,
    payload: beskjed,
  });

  const visInnloggingsModal = () => dispatch({
    type: VIS_INNLOGGINGSMODAL,
  });

  return (
    <StoreContext.Provider value={{
      state,
      addBeskjeder,
      addInaktiveBeskjeder,
      removeBeskjed,
      addInaktivBeskjed,
      visInnloggingsModal,
    }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  inaktiveBeskjeder: arrayOf(BeskjedType),
  children: node.isRequired,
};

StoreProvider.defaultProps = {
  beskjeder: null,
  inaktiveBeskjeder: null,
};

export default StoreProvider;
