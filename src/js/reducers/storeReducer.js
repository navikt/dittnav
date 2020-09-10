import { ADD_BESKJEDER, ADD_INAKTIV_BESKJED, ADD_INAKTIVE_BESKJEDER, REMOVE_BESKJED, VIS_INNLOGGINGSMODAL } from '../types/Actions';

export const initialStoreState = (beskjeder, inaktiveBeskjeder) => ({
  beskjeder,
  inaktiveBeskjeder,
  visInnloggingsModal: false,
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
    default:
      return state;
  }
};

export default storeReducer;
