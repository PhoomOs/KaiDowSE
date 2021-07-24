import {
  ADD_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  GET_ALL_ORDER_ITEM,
  LOADING_DATA,
  ORDER_CHANGE,
  EDIT_ORDER_ITEM,
  ORDER_MENU_CHANGE,
  CHANGE_BILL_LIST,
  SPLIT_ORDER_ITEM,
} from '../types';
import axios from 'axios';

export const getAllOrder = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get('/getAllOrder')
    .then((res) => {
      dispatch({
        type: GET_ALL_ORDER_ITEM,
        payload: res.data.data,
      });
    })
    .catch((err) => {});
};

export const changeBillList = (data) => (dispatch) => {
  dispatch({
    type: CHANGE_BILL_LIST,
    payload: data,
  });
};

export const splitOrder = (data) => (dispatch) => {
  //data = { listSplit ,orderId}
  dispatch({ type: SPLIT_ORDER_ITEM, payload: data });
};

export const addOrder = (newOrderSchema) => (dispatch) => {
  dispatch({
    type: ADD_ORDER_ITEM,
    payload: newOrderSchema,
  });
  axios
    .post('/addOrder', newOrderSchema)
    .then((res) => {})
    .catch((err) => {});
};

export const orderChange = (change) => (dispatch) => {
  dispatch({
    type: ORDER_CHANGE,
    payload: change,
  });
};

export const orderMenuChange = (change) => (dispatch) => {
  dispatch({
    type: ORDER_MENU_CHANGE,
    payload: change,
  });
};

export const deleteOrder = (data) => (dispatch) => {
  //data = {id , type}
  dispatch({
    type: DELETE_ORDER_ITEM,
    payload: data.id,
  });
  axios
    .post(`/deleteOrder`, { id: data.id })
    .then((res) => {})
    .catch((err) => {});
};

export const editOrder = (data) => (dispatch) => {
  dispatch({
    type: EDIT_ORDER_ITEM,
    payload: data,
  });
  axios
    .post(`/editOrder`, data)
    .then((res) => {})
    .catch((err) => {});
};
