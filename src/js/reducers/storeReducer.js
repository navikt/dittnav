import Api from '../Api';

export const initialStoreState = () => ({
  beskjeder: null,
  inaktiveBeskjeder: null,
  visInnloggingsModal: false,
  error: [],
});

const storeReducer = (state = initialStoreState, action) => {
  switch (action.type) {
    case 'ADD_BESKJEDER':
      return {
        ...state,
        beskjeder: action.payload,
        visInnloggingsModal: Api.tokenExpiresSoon(action.payload.headers),
      };
    case 'ADD_INAKTIVE_BESKJEDER':
      return {
        ...state,
        inaktiveBeskjeder: action.payload,
        visInnloggingsModal: Api.tokenExpiresSoon(action.payload.headers),
      };
    case 'REMOVE_BESKJED':
      return {
        ...state,
        beskjeder: { ...state.beskjeder, content: state.beskjeder.content.filter(b => action.payload.uid !== b.uid) },
      };
    case 'ADD_INAKTIV_BESKJED':
      return {
        ...state,
        inaktiveBeskjeder: { ...state.inaktiveBeskjeder, content: [...state.inaktiveBeskjeder.content, action.payload] },
      };
    case 'TOGGLE_INNLOGGINGSMODAL':
      return {
        ...state,
        visInnloggingsModal: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: ['error.baksystemer'],
      };
    default:
      return state;
  }
};

export default storeReducer;
