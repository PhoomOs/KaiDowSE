import { SET_LOG, LOG_CHANGE, REFUND_LOG } from '../types';
import axios from 'axios';

export const getAllLog = () => (dispatch) => {
  axios
    .get('/getAllLog')
    .then((res) => {
      //   console.log('all log : ', res.data);
      dispatch({
        type: SET_LOG,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log('error');
    });
};

export const logChange = (data) => (dispatch) => {
  dispatch({ type: LOG_CHANGE, payload: data });
};

export const refundLog = (data) => (dispatch) => {
  axios.post('/refundLog', data).then((res) => {
    console.log('eiei');
  });
  dispatch({ type: REFUND_LOG, payload: data.id });
};
