import { ListTypesRequest } from '../../../config/types';

const INITIAL_STATE = {
  dataSells: [],
};

export default function Sells(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ListTypesRequest.LOAD_ALL_SELLS:
      return { ...state, loading: true, dataSells: action.payload.data };
    case ListTypesRequest.LOAD_FAILURE_SELL:
      return { ...state, loading: false, message: 'Error', error: true };
    default:
      return state;
  }
}
