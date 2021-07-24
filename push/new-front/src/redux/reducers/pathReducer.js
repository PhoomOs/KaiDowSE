import { SET_PATH } from '../types';

const initialState = {
  path: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PATH:
      return {
        path: action.payload,
      };
    default:
      return state;
  }
}
