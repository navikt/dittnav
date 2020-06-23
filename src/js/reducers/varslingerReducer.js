import { ADD, SET, ERROR } from '../types/Actions';

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
    case SET.BESKJEDER_LOADING:
      return {
        ...state,
        beskjeder: { loading: false },
      };
    case ADD.OPPGAVER:
      return {
        ...state,
        oppgaver: { data: action.payload, loading: false },
      };
    case ADD.INNBOKSER:
      return {
        ...state,
        innbokser: { data: action.payload, loading: false },
      };
    case SET.INAKTIVE_BESKJEDER_LOADING:
      return {
        ...state,
        inaktiveBeskjeder: { loading: false },
      };
    case ADD.INAKTIVE_OPPGAVER:
      return {
        ...state,
        inaktiveOppgaver: { data: action.payload, loading: false },
      };
    case ADD.INAKTIVE_INNBOKSER:
      return {
        ...state,
        inaktiveInnbokser: { data: action.payload, loading: false },
      };
    case ADD.INNLOGGING:
      return {
        ...state,
        innlogging: { data: action.payload, loading: false },
      };
    case ERROR.BESKJEDER:
      return {
        ...state,
        beskjeder: { loading: false },
        error: [action.payload],
      };
    case ERROR.OPPGAVER:
      return {
        ...state,
        oppgaver: { ...state.oppgaver.data, loading: false },
        error: [action.payload],
      };
    case ERROR.INNBOKSER:
      return {
        ...state,
        innbokser: { ...state.innbokser.data, loading: false },
        error: [action.payload],
      };
    case ERROR.INAKTIVE_BESKJEDER:
      return {
        ...state,
        inaktiveBeskjeder: { loading: false },
        error: [action.payload],
      };
    case ERROR.INAKTIVE_OPPGAVER:
      return {
        ...state,
        inaktiveOppgaver: { ...state.inaktiveOppgaver.data, loading: false },
        error: [action.payload],
      };
    case ERROR.INAKTIVE_INNBOKSER:
      return {
        ...state,
        inaktiveInnbokser: { ...state.inaktiveInnbokser.data, loading: false },
        error: [action.payload],
      };
    case ERROR.INNLOGGING:
      return {
        ...state,
        innlogging: { ...state.innlogging.data, loading: false },
        error: [action.payload],
      };
    default:
      return state;
  }
};
