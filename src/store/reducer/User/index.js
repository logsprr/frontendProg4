import { ListTypesRequest } from '../../../config/types';

const INITIAL_STATE = {
    data: {
        id: '',
        name: '',
        email: '',
    },
};

export default function User(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ListTypesRequest.LOAD_USER:
            return {...state, loading: false, data: action.payload.data };
        case ListTypesRequest.LOAD_FAILURE_SELL:
            return {...state, loading: false, message: 'Error', error: true };
        case ListTypesRequest.CLEAR_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}