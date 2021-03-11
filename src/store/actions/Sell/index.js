import { action } from 'typesafe-actions';
import { ListTypesRequest } from '../../../config/types';

export const loadAllSells = (data) => action(ListTypesRequest.LOAD_ALL_SELLS, { data });
export const loadFailedSells = () => action(ListTypesRequest.LOAD_FAILURE_SELL);
