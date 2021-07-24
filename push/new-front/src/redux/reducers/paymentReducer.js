import { SET_LINK } from '../types';

const initialState = {
  link: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LINK:
      return {
        link: action.payload,
      };
    default:
      return state;
  }
}
