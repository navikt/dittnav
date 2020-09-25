export const initialStoreState = (beskjeder, inaktiveBeskjeder) => ({
  beskjeder: { data: null, loading: true },
  oppgaver: { data: null, loading: true },
  innbokser: { data: null, loading: true },
  inaktiveBeskjeder: { data: null, loading: true },
  inaktiveOppgaver: { data: null, loading: true },
  inaktiveInnbokser: { data: null, loading: true },
  innloggingsstatus: { data: null, loading: true },
  oppfolging: { data: null, loading: true },
  meldekort: { data: null, loading: true },
  navn: { data: null, loading: true },
  ident: { data: null },
  paabegynteSoknader: { data: null, loading: true },
  meldinger: { data: null, loading: true },
  sakstema: { data: null, loading: true },
  visInnloggingsModal: false,
  error: [],
});

const storeReducer = (state = initialStoreState, action) => {
  switch (action.type) {
    case 'ADD_BESKJEDER':
      return {
        ...state,
        beskjeder: { data: action.payload, loading: false },
      };
    case 'ADD_INAKTIVE_BESKJEDER':
      return {
        ...state,
        inaktiveBeskjeder: { data: action.payload, loading: false },
      };
    case 'REMOVE_BESKJED':
      return {
        ...state,
        beskjeder: state.beskjeder.data.filter(b => action.payload.uid !== b.uid),
      };
    case 'ADD_INAKTIV_BESKJED':
      return {
        ...state,
        inaktiveBeskjeder: { data: [...state.inaktiveBeskjeder.data, action.payload], ...state.inaktiveBeskjeder },
      };
    case 'TOGGLE_INNLOGGINGSMODAL':
      return {
        ...state,
        visInnloggingsModal: true,
      };
    case 'ADD_OPPGAVER':
      return {
        ...state,
        oppgaver: { data: action.payload, loading: false },
      };
    case 'ADD_INNBOKSER':
      return {
        ...state,
        innbokser: { data: action.payload, loading: false },
      };
    case 'ADD_INAKTIVE_OPPGAVER':
      return {
        ...state,
        inaktiveOppgaver: { data: action.payload, loading: false },
      };
    case 'ADD_INAKTIVE_INNBOKSER':
      return {
        ...state,
        inaktiveInnbokser: { data: action.payload, loading: false },
      };
    case 'ADD_INNLOGGINGSSTATUS':
      return {
        ...state,
        innloggingsstatus: { data: action.payload, loading: false },
      };
    case 'ADD_OPPFOLGING':
      return {
        ...state,
        oppfolging: { data: action.payload, loading: false },
      };
    case 'ADD_MELDEKORT':
      return {
        ...state,
        meldekort: { data: action.payload, loading: false },
      };
    case 'ADD_NAVN':
      return {
        ...state,
        navn: { data: action.payload, loading: false },
      };
    case 'ADD_IDENT':
      return {
        ...state,
        ident: { data: action.payload },
      };
    case 'ADD_PAABEGYNTESOKNADER':
      return {
        ...state,
        paabegynteSoknader: { data: action.payload, loading: false },
      };
    case 'ADD_MELDINGER':
      return {
        ...state,
        meldinger: { data: action.payload, loading: false },
      };
    case 'ADD_SAKSTEMA':
      return {
        ...state,
        sakstema: { data: action.payload, loading: false },
      };
    case 'ERROR':
      return {
        ...state,
        error: ['error.baksystemer'],
      };
    default:
      return state;
  }
};

export default storeReducer;
