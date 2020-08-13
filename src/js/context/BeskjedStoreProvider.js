import React, { createContext, useReducer } from 'react';
import { arrayOf, node } from 'prop-types';
import Api from '../Api';
import {
  ADD_BESKJEDER,
  ADD_INAKTIVE_BESKJEDER,
  ADD_INAKTIV_BESKJED,
  REMOVE_BESKJED,
} from '../types/Actions';
import BeskjedType from '../types/BeskjedType';

const initialState = (beskjeder, inaktiveBeskjeder) => ({
  beskjeder,
  inaktiveBeskjeder,
  visInnloggingsModal: false,
});

const postAndCheckTokenExpiration = async (action) => {

  const response = await Api.postDone({
    eventId: action.payload.eventId,
    uid: action.payload.uid,
  });

  const headers = Promise.resolve(response);

  return Api.tokenExpiresSoon(headers);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BESKJEDER:
      return {
        ...state,
        beskjeder: action.payload,
      };
    case ADD_INAKTIVE_BESKJEDER:
      return {
        ...state,
        inaktiveBeskjeder: action.payload,
      };
    case REMOVE_BESKJED:
      Api.postDone({
        eventId: action.payload.eventId,
        uid: action.payload.uid,
      });

      // console.log(Promise.resolve(Promise.resolve(postAndCheckTokenExpiration(action))));

      return {
        ...state,
        visInnloggingsModal: postAndCheckTokenExpiration(action),
        beskjeder: state.beskjeder.filter(b => action.payload.uid !== b.uid),
      };
    case ADD_INAKTIV_BESKJED:
      return {
        ...state,
        inaktiveBeskjeder: [...state.inaktiveBeskjeder, action.payload],
      };
    default:
      return state;
  }
};

export const BeskjedStoreContext = createContext(null);

const BeskjedStoreProvider = ({ beskjeder, inaktiveBeskjeder, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState(beskjeder, inaktiveBeskjeder));
  const value = { state, dispatch };

  return (
    <BeskjedStoreContext.Provider value={value}>
      {children}
    </BeskjedStoreContext.Provider>
  );
};

BeskjedStoreProvider.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  inaktiveBeskjeder: arrayOf(BeskjedType),
  children: node.isRequired,
};

BeskjedStoreProvider.defaultProps = {
  beskjeder: null,
  inaktiveBeskjeder: null,
};

export default BeskjedStoreProvider;
