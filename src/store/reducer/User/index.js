import { ListTypesRequest } from '../../../config/types';

const INITIAL_STATE = {
  data: {
    id: '6002e834b4360726fdbba754',
    name: 'Ricardo Graciano',
    email: 'ricardo@teste.com',
  },
};

export default function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ListTypesRequest.LOAD_USER:
      return { ...state, loading: false, data: action.payload.data };
    case ListTypesRequest.LOAD_FAILURE_SELL:
      return { ...state, loading: false, message: 'Error', error: true };
    default:
      return state;
  }
}
