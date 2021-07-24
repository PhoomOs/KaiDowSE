import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import storeReducer from './reducers/storeReducer';
import pathReducer from './reducers/pathReducer';
import employeeReducer from './reducers/employeeReducer';
import menuReducer from './reducers/menuReducer';
import orderReducer from './reducers/orderReducer';
import kitchenReducer from './reducers/kitchenReducer';
import coupon from './reducers/couponReducer';
import paymentReducer from './reducers/paymentReducer';
import logReducer from './reducers/logReducer';
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  storeInfo: storeReducer,
  UI: uiReducer,
  user: userReducer,
  path: pathReducer,
  employee: employeeReducer,
  menu: menuReducer,
  order: orderReducer,
  kitchen: kitchenReducer,
  coupon: coupon,
  payment: paymentReducer,
  log: logReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
