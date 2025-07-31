import { rootReducer } from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

console.log(thunk);

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
