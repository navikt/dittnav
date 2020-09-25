import {
  ADD_BESKJEDER,
  ADD_INAKTIV_BESKJED,
  ADD_INAKTIVE_BESKJEDER,
  REMOVE_BESKJED,
  VIS_INNLOGGINGSMODAL,
} from '../types/Actions';

export const initialStoreState = (beskjeder, inaktiveBeskjeder) => ({
  beskjeder,
  oppgaver: null,
  innbokser: null,
  inaktiveBeskjeder,
  inaktiveOppgaver: null,
  inaktiveInnbokser: null,
  innloggingsstatus: null,
  oppfolging: null,
  navn: null,
  ident: null,
  paabegynteSoknader: null,
  meldinger: null,
  sakstema: null,
  visInnloggingsModal: false,
  error: false,
});

const storeReducer = (state = initialStoreState, action) => {
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
      return {
        ...state,
        beskjeder: state.beskjeder.filter(b => action.payload.uid !== b.uid),
      };
    case ADD_INAKTIV_BESKJED:
      return {
        ...state,
        inaktiveBeskjeder: [...state.inaktiveBeskjeder, action.payload],
      };
    case VIS_INNLOGGINGSMODAL:
      return {
        ...state,
        visInnloggingsModal: true,
      };
    case 'ADD_OPPGAVER':
      return {
        ...state,
        oppgaver: action.payload,
      };
    case 'ADD_INNBOKSER':
      return {
        ...state,
        innbokser: action.payload,
      };
    case 'ADD_INAKTIVE_OPPGAVER':
      return {
        ...state,
        inaktiveOppgaver: action.payload,
      };
    case 'ADD_INAKTIVE_INNBOKSER':
      return {
        ...state,
        inaktiveInnbokser: action.payload,
      };
    case 'ADD_INNLOGGINGSSTATUS':
      return {
        ...state,
        innloggingsstatus: action.payload,
      };
    case 'ADD_OPPFOLGING':
      return {
        ...state,
        oppfolging: action.payload,
      };
    case 'ADD_MELDEKORT':
      return {
        ...state,
        meldekort: action.payload,
      };
    case 'ADD_NAVN':
      return {
        ...state,
        navn: action.payload,
      };
    case 'ADD_IDENT':
      return {
        ...state,
        iddent: action.payload,
      };
    case 'ADD_PAABEGYNTESOKNADER':
      return {
        ...state,
        paabegynteSoknader: action.payload,
      };
    case 'ADD_MELDINGER':
      return {
        ...state,
        meldinger: action.payload,
      };
    case 'ADD_SAKSTEMA':
      return {
        ...state,
        sakstema: action.payload,
      };
    case 'ERROR':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default storeReducer;
