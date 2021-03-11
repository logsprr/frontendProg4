import { combineReducers } from 'redux';

import products from './Products';
import user from './User';
import sells from './Sells';

export default combineReducers({
  products,
  user,
  sells,
});
