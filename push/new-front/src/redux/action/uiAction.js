import {
  SET_ERRORS,
  CLEAR_UI,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_SUCCESS,
  SOMETHING_PENDING,
  SOMETHING_FULFILLED,
  CLEAR_SOMETHING_FULFILLED,
  CLEAR_SOMETHING_PENDING

} from '../types';
import axios from 'axios';


export const doSomething = () => (dispatch) => {

  dispatch({
    type: SOMETHING_PENDING,
  })

  setTimeout(function () {
    dispatch({
      type: CLEAR_SOMETHING_PENDING,
    })
    //your code to be executed after 1 second
  }, 2000);




};
export const falseDialog = (text) => (dispatch) => {

  dispatch({
    type: SOMETHING_FULFILLED,
    payload: text

  })

  setTimeout(function () {
    dispatch({
      type: CLEAR_SOMETHING_FULFILLED,
    })
    //your code to be executed after 1 second
  }, 2000);

};




