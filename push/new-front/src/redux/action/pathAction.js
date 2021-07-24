import { SET_PATH } from '../types';
import axios from 'axios';

export const setPath = (data) => (dispatch) => {
  dispatch({
    type: SET_PATH,
    payload: data,
  });
};
