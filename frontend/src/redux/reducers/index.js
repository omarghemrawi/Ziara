import { combineReducers } from 'redux';
import places from './place';
import user from './user';

export const rootReducer = combineReducers({
  places,
  user,
});
