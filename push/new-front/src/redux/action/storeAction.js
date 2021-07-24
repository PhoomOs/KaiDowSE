import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_PAYMENT_DETAIL,
  SET_STORE_DETAIL,
  SET_PATH,
  SET_STORE_CHECK,
  DELETE_PAYMENT_DETAIL,
} from '../types';
import { getUserData } from './userAction';
import axios from 'axios';

export const setPaymentDetail = (data, history) => (dispatch) => {
  console.log('setPayMentDail  : ', data);
  dispatch({ type: LOADING_UI });
  axios
    .post('/setPaymentDetail', data)
    .then((res) => {
      console.log('storeData = ', res.data.check);
      dispatch({
        type: SET_STORE_CHECK,
        payload: res.data.check,
      });
      // console.log('history = ',history)
      history.push(res.data.path);
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log('error ', err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setStoreDetail = (data, history) => (dispatch) => {
  // console.log('onACtion')
  dispatch({ type: LOADING_UI });

  axios
    .post('/setStoreDetail', data)
    .then((res) => {
      console.log('set store detail success', res.data.path);
      dispatch(getStoreDetail());

      // dispatch({ type: CLEAR_ERRORS });
      window.location.href = 'http://localhost:3000/storeinfo';
    })
    .catch((err) => {
      console.log('error set store detail', err);
    });
};

export const getPaymentDetail = () => (dispatch) => {
  axios
    .get('/getPaymentDetail')
    .then((res) => {
      dispatch({
        type: SET_PAYMENT_DETAIL,
        payload: res.data,
      });
      console.log('getPaymentDetail in res ', res.data);
    })
    .catch((err) => {
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: err.response.data,
      // })
      // console.log('err in getPaymentDetail', err.response.data)
    });
};

export const getStoreDetail = () => (dispatch) => {
  axios
    .get('/getStoreDetail')
    .then((res) => {
      // console.log('getstoredetail success!! ,',res.data)
      dispatch({
        type: SET_STORE_DETAIL,
        payload: res.data,
      });
      console.log('getStoreDetail success ', res.data);
    })
    .catch((err) => {
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: err.response.data,
      // });
      // console.log('err in getStoreDetail', err.response.data)
    });
};

export const deletePaymentDetail = (dataDelete) => (dispatch) => {
  // console.log('setPayMentDail  : ', data);
  dispatch({
    type: DELETE_PAYMENT_DETAIL,
    payload: dataDelete,
  });
  axios
    .post(`/deletePaymentDetail/${dataDelete}`)
    .then((res) => {
      console.log('delete success');
    })
    .catch((err) => {
      console.log('got error on deleteMenuType : ', err);
    });
  // axios
  //   .post('/setPaymentDetail', data)
  //   .then((res) => {
  //     console.log('storeData = ', res.data);
  //     // console.log('history = ',history)
  //     history.push(res.data.path);
  //     dispatch({ type: CLEAR_ERRORS });
  //   })
  //   .catch((err) => {
  //     console.log('error ', err);
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data,
  //     });
  //   });
};

export const transferToOwner = (data) => (dispatch) => {
  // console.log('onACtion')
  dispatch({ type: LOADING_UI });
  axios
    .post('/transferToOwner', data)
    .then((res) => {
      // console.log('action success')
      dispatch(getStoreDetail());
      dispatch({ type: CLEAR_ERRORS });
      console.log('Successful Transfer');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
