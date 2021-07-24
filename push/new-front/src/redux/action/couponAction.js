import {
  COUPON_GET_ALL,
  COUPON_ADD,
  COUPON_DELETE,
  LOADING_DATA,
} from '../types';
import axios from 'axios';
import { doSomething, falseDialog } from './uiAction';

export const getAllCoupon = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  axios
    .get('/getAllCoupon')
    .then((res) => {
      dispatch({
        type: COUPON_GET_ALL,
        payload: res.data.data,
      });
      // console.log('get all coupon complete');
    })
    .catch((err) => {
      console.log('Get Coupon Error', err);
    });
};

export const addCoupon = (newCoupon) => (dispatch) => {
  dispatch({
    type: COUPON_ADD,
    payload: newCoupon,
  });
  console.log('addCoupon in store ', newCoupon);
  axios
    .post('/addCoupon', newCoupon)
    .then((res) => {
      console.log('add success');

      dispatch(doSomething());
    })
    .catch((err) => {
      dispatch({
        type: COUPON_DELETE,
        payload: newCoupon.Id,
      });
      console.log('got error on addMenuType : ', err);
    });
};

export const deleteCoupon = (dataDelete) => (dispatch) => {
  dispatch({
    type: COUPON_DELETE,
    payload: dataDelete, //object
  });
  console.log('delete Action coupon ', dataDelete);
  axios
    .post('/deleteCoupon', dataDelete)
    .then((res) => {
      console.log('delete success');
      dispatch(falseDialog());
    })
    .catch((err) => {
      console.log('got error on deleteMenuItem : ', err);
    });
};

//   export const COUPON_UPDATE = (newEmployee) => (dispatch) => {
//     let employeeDetail = {};
//     let dataFocus, imgName;
//     for (let value of newEmployee) {
//       if (value[0].includes('userImage_')) {
//         dataFocus = value;
//         let data = value[0].split('_');
//         imgName = data[0];
//         employeeDetail[imgName] = value[0].split('_')[1];
//       } else {
//         employeeDetail[value[0]] = value[1];
//       }
//     }
//     if (dataFocus) {
//       newEmployee.append(imgName, dataFocus[1]);
//       newEmployee.delete(dataFocus[0]);
//     }

//     dispatch({
//       type: UPDATE_EMPLOYEE,
//       payload: employeeDetail,
//     });
//     axios
//       .post('/editEmployee', newEmployee)
//       .then((res) => {
//         console.log('edit success!!');
//         dispatch({ type: CLEAR_ERRORS });
//       })
//       .catch((err) => {
//         dispatch({
//           type: SET_ERRORS,
//           payload: err.response.data,
//         });
//         dispatch({
//           type: DELETE_EMPLOYEE,
//           payload: employeeDetail.email,
//         });
//       });
//   };
