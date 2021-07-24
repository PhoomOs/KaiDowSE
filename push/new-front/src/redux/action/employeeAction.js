import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_DATA,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_ALLEMPLOYEE,
  UPDATE_EMPLOYEE,
} from '../types';
import axios from 'axios';

// Get all Employees
export const getAllEmployee = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get('/getEmployeeDetail')
    .then((res) => {
      // console.log('Get Employee Suc', res.data);
      dispatch({
        type: GET_ALLEMPLOYEE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log('Get Employee Error');
      // dispatch({
      //     // type: SET_SCREAMS,
      //     // payload: []
      // });
    });
};

export const deleteEmployee = (email) => (dispatch) => {
  console.log('email = ', email);
  dispatch({
    type: DELETE_EMPLOYEE,
    payload: email,
  });
  axios.delete(`removeUser/${email}`).then((res) => {
    console.log('remove success');
  });
};

// Post a Employee

export const addEmployee = (newEmployee) => (dispatch) => {
  // console.log('addEmployee');
  let employeeDetail = {};
  let dataFocus, imgName;
  for (let value of newEmployee) {
    // console.log('*valll');
    if (value[0].includes('userImage_')) {
      dataFocus = value;
      let data = value[0].split('_');
      imgName = data[0];
      employeeDetail[imgName] = value[0].split('_')[1];
    } else {
      employeeDetail[value[0]] = value[1];
      // console.log('employeeDetail = ', employeeDetail);
    }
  }
  if (dataFocus) {
    newEmployee.append(imgName, dataFocus[1]);
    newEmployee.delete(dataFocus[0]);
  }
  console.log('employeeDetail = ', employeeDetail);

  dispatch({
    type: ADD_EMPLOYEE,
    payload: employeeDetail,
  });

  axios
    .post('/addEmployee', newEmployee)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: employeeDetail.email,
      });
    });
};

export const updateEmployee = (newEmployee) => (dispatch) => {
  let employeeDetail = {};
  let dataFocus, imgName;
  for (let value of newEmployee) {
    if (value[0].includes('userImage_')) {
      dataFocus = value;
      let data = value[0].split('_');
      imgName = data[0];
      employeeDetail[imgName] = value[0].split('_')[1];
    } else {
      employeeDetail[value[0]] = value[1];
    }
  }
  if (dataFocus) {
    newEmployee.append(imgName, dataFocus[1]);
    newEmployee.delete(dataFocus[0]);
  }

  dispatch({
    type: UPDATE_EMPLOYEE,
    payload: employeeDetail,
  });
  axios
    .post('/editEmployee', newEmployee)
    .then((res) => {
      console.log('edit success!!');
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: employeeDetail.email,
      });
    });
};
