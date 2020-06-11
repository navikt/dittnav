import {
  ADD_OPPGAVER,
  ADD_INNBOKSER,
  ADD_INAKTIVE_OPPGAVER,
  ADD_INAKTIVE_INNBOKSER,
  ADD_INNLOGGING,
  ERROR, SET_BESKJEDER_LOADING, SET_INAKTIVE_BESKJEDER_LOADING,
} from '../types/Actions';

export const initialVarslingerState = {
  beskjeder: { loading: true },
  oppgaver: { data: null, loading: true },
  innbokser: { data: null, loading: true },
  inaktiveBeskjeder: { loading: true },
  inaktiveOppgaver: { data: null, loading: true },
  inaktiveInnbokser: { data: null, loading: true },
  innlogging: { data: null, loading: true },
  error: [],
};

export const varslingerReducer = (state, action) => {
  switch (action.type) {
    case SET_BESKJEDER_LOADING:
      return {
        ...state,
        beskjeder: { loading: false },
      };
    case ADD_OPPGAVER:
      return {
        ...state,
        oppgaver: { data: action.payload, loading: false },
      };
    case ADD_INNBOKSER:
      return {
        ...state,
        innbokser: { data: action.payload, loading: false },
      };
    case SET_INAKTIVE_BESKJEDER_LOADING:
      return {
        ...state,
        inaktiveBeskjeder: { loading: false },
      };
    case ADD_INAKTIVE_OPPGAVER:
      return {
        ...state,
        inaktiveOppgaver: { data: action.payload, loading: false },
      };
    case ADD_INAKTIVE_INNBOKSER:
      return {
        ...state,
        inaktiveInnbokser: { data: action.payload, loading: false },
      };
    case ADD_INNLOGGING:
      return {
        ...state,
        innlogging: { data: action.payload, loading: false },
      };
    case ERROR:
      return {
        ...state,
        error: ['error.baksystemer'],
      };
    default:
      return state;
  }
};

export default varslingerReducer;
