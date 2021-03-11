import { action } from 'typesafe-actions';
import { ListTypesRequest } from '../../../config/types';

export const loadUser = (data) => action(ListTypesRequest.LOAD_USER, { data });
export const loadFailedUser = () => action(ListTypesRequest.LOAD_FAILURE_USER);
