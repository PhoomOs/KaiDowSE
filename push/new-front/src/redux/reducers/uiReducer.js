import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  ON_SUCCESS,
  SOMETHING_FULFILLED,
  SOMETHING_PENDING,
  CLEAR_SOMETHING_FULFILLED,
  CLEAR_SOMETHING_PENDING,
} from '../types';

const initialState = {
  loading: false,
  errors: {},
  success: false,
  sending: false,
  cantSending: false,
  text: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case ON_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case SOMETHING_PENDING:
      return {
        ...state,
        sending: true,
      };

    ///clear ui
    case CLEAR_SOMETHING_PENDING:
      return {
        ...state,
        sending: false,
      };

    case SOMETHING_FULFILLED:
      return {
        ...state,
        cantSending: true,
        text: action.payload,
      };
    case CLEAR_SOMETHING_FULFILLED:
      return {
        ...state,
        cantSending: false,
        errors: {},
      };

    default:
      return state;
  }
}
