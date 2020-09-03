import {
  ADD_OPPGAVER, ADD_INNBOKSER, ADD_INAKTIVE_OPPGAVER, ADD_INAKTIVE_INNBOKSER, ADD_INNLOGGINGSSTATUS, SET_BESKJEDER_LOADING,
  SET_INAKTIVE_BESKJEDER_LOADING, BESKJEDER_ERROR, OPPGAVER_ERROR, INNBOKSER_ERROR, INAKTIVE_BESKJEDER_ERROR,
  INAKTIVE_OPPGAVER_ERROR, INAKTIVE_INNBOKSER_ERROR, INNLOGGINGSSTATUS_ERROR,
} from '../types/Actions';

export const initialVarslingerState = {
  beskjeder: { loading: true },
  oppgaver: { data: null, loading: true },
  innbokser: { data: null, loading: true },
  inaktiveBeskjeder: { loading: true },
  inaktiveOppgaver: { data: null, loading: true },
  inaktiveInnbokser: { data: null, loading: true },
  innloggingsstatus: { data: null, loading: true },
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
    case ADD_INNLOGGINGSSTATUS:
      return {
        ...state,
        innloggingsstatus: { data: action.payload, loading: false },
      };
    case BESKJEDER_ERROR:
      return {
        ...state,
        beskjeder: { loading: false },
        error: [action.payload],
      };
    case OPPGAVER_ERROR:
      return {
        ...state,
        oppgaver: { ...state.oppgaver.data, loading: false },
        error: [action.payload],
      };
    case INNBOKSER_ERROR:
      return {
        ...state,
        innbokser: { ...state.innbokser.data, loading: false },
        error: [action.payload],
      };
    case INAKTIVE_BESKJEDER_ERROR:
      return {
        ...state,
        inaktiveBeskjeder: { loading: false },
        error: [action.payload],
      };
    case INAKTIVE_OPPGAVER_ERROR:
      return {
        ...state,
        inaktiveOppgaver: { ...state.inaktiveOppgaver.data, loading: false },
        error: [action.payload],
      };
    case INAKTIVE_INNBOKSER_ERROR:
      return {
        ...state,
        inaktiveInnbokser: { ...state.inaktiveInnbokser.data, loading: false },
        error: [action.payload],
      };
    case INNLOGGINGSSTATUS_ERROR:
      return {
        ...state,
        innloggingsstatus: { ...state.innloggingsstatus.data, loading: false },
        error: [action.payload],
      };
    default:
      return state;
  }
};
