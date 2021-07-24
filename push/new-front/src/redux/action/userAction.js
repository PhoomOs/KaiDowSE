import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ON_SUCCESS,
} from '../types';
import { doSomething, falseDialog } from './uiAction';
import axios from 'axios';

import { getStoreDetail, getPaymentDetail } from './storeAction';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch(getStoreDetail());
      dispatch(getPaymentDetail());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/main');
    })
    .catch((err) => {
      dispatch(falseDialog());
      // console.log("login ERR", userData)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      // console.log("signup Successful");
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch(getStoreDetail());
      dispatch(getPaymentDetail());
      dispatch({ type: CLEAR_ERRORS });
      history('/main');
    })
    .catch((err) => {
      // console.log("signup error : ", err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = (history) => (dispatch) => {
  console.log('logout');
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  history.push('/login');
};

export const getUserData = () => (dispatch) => {
  // console.log('use get userdata')
  dispatch({ type: LOADING_USER });
  axios
    .get('/getUserData')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const forgotPassword = (email, history) => (dispatch) => {
  console.log('email in action', email);
  dispatch({ type: LOADING_USER });
  axios
    .post('/forgotPassword', email)
    .then((res) => {
      console.log('respond', res.data);
      window.location.href = res.data.url;
    })
    .catch((err) => console.log('error fotgot pass', err));
};

//   export const uploadImage = (formData) => (dispatch) => {
//     dispatch({ type: LOADING_USER });
//     axios
//       .post('/user/image', formData)
//       .then(() => {
//         dispatch(getUserData());
//       })
//       .catch((err) => console.log(err));
//   };

//   export const editUserDetails = (userDetails) => (dispatch) => {
//     dispatch({ type: LOADING_USER });
//     axios
//       .post('/user', userDetails)
//       .then(() => {
//         dispatch(getUserData());
//       })
//       .catch((err) => console.log(err));
//   };

export const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
