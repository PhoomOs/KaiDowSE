import {
  SET_STORE_DETAIL,
  SET_PAYMENT_DETAIL,
  SET_ACTIVATED,
  SET_STORE_CHECK,
  UPDATE_PAYMENT_DETAIL,
  DELETE_PAYMENT_DETAIL,
} from '../types';

const initialState = {
  paymentDetail: {},
  storeDetail: {
    activated: false,
    storeImg: '',
    storeName: '',
    expired_at: 'xxxx-xx-xx',
  },
  check: null,
  check2: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_STORE_DETAIL:
      console.log('storeDetail Redu ', action.payload);
      return {
        ...state,
        storeDetail: action.payload,
      };
    case SET_PAYMENT_DETAIL:
      console.log('paymentDetail Redu ', action.payload);
      return {
        ...state,
        paymentDetail: action.payload,
      };
    case DELETE_PAYMENT_DETAIL:
      return {
        ...state,
        paymentDetail: {},
      };
    case UPDATE_PAYMENT_DETAIL:
      return {
        ...state,
        ...action.payload,
      };
    case SET_STORE_CHECK:
      return {
        ...state,
        check: action.payload,
      };

    default:
      return state;
  }
}
