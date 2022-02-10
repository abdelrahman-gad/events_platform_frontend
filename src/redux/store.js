import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
  eventCreateReducer,
  eventDeleteReducer,
  eventListReducer
} from './reducers/eventReducers';

import {
  adminSigninReducer
} from './reducers/adminReducers'

import {
  managerSigninReducer
} from './reducers/managerReducers';

const initialState = {
  managerSignin: {
    managerInfo: localStorage.getItem('managerInfo')
      ? JSON.parse(localStorage.getItem('managerInfo'))
      : null,
  },
  adminSignin:{
    adminInfo: localStorage.getItem('adminInfo')
      ? JSON.parse(localStorage.getItem('adminInfo'))
      : null,
  }
};

const reducer = combineReducers({
  managerSignin: managerSigninReducer,
  adminSignin: adminSigninReducer,
  eventList: eventListReducer,
  eventCreate: eventCreateReducer,
  eventDelete:eventDeleteReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
