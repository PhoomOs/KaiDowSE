import {
  SET_ALL_MENU,
  ADD_MENU_ITEM,
  ADD_MENU_TYPE,
  DELETE_MENU_ITEM,
  DELETE_MENU_TYPE,
  LOADING_DATA,
  GET_ALL_MENU,
  UPDATE_MENU_ITEM,
  SOMETHING_FULFILLED,
  SOMETHING_PENDING,
} from '../types';
import { doSomething, falseDialog } from './uiAction';
import axios from 'axios';

export const getAllMenuItems = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get('/getAllMenuAndType')
    .then((res) => {
      dispatch({
        type: GET_ALL_MENU,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log('Get Menu Error', err);
    });
};

export const addMenuItem = (newMenuItem) => (dispatch) => {
  let menuDetail = {};
  let dataFocus, imgName;
  let menuPrices = [];
  for (let value of newMenuItem) {
    // console.log('value ='  value[0])
    console.log('value = ', value);
    if (value[0].includes('menuImg_')) {
      dataFocus = value;
      let data = value[0].split('_');
      imgName = data[0];
      menuDetail[imgName] = value[0].split('_')[1];
    } else if (value[0].includes('menuPrice')) {
      //ธรรมดา:50
      let detail = value[1].split(':')[0];
      let price = value[1].split(':')[1];
      menuPrices.push({ detail: detail, price: price });
    } else {
      menuDetail[value[0]] = value[1];
    }
  }

  if (dataFocus) {
    newMenuItem.append(imgName, dataFocus[1]);
    newMenuItem.delete(dataFocus[0]);
  }

  menuDetail.menuPrice = menuPrices;
  console.log('addMenu Success!!!!!!!!!!!!!!!!!!', menuDetail);

  dispatch({
    type: ADD_MENU_ITEM,
    payload: menuDetail,
  });

  axios
    .post('/addMenuItem', newMenuItem)
    .then((res) => {
      console.log('add success', res);
      dispatch(doSomething());
    })
    .catch((err) => {
      console.log('got error on addmenu : ', err);
    });
};

export const addMenuType = (newMenuType) => (dispatch) => {
  dispatch({
    type: ADD_MENU_TYPE,
    payload: newMenuType,
  });
  console.log('oastttttttt ssss', newMenuType);
  axios
    .post('/addMenutype', newMenuType)
    .then((res) => {
      dispatch(doSomething());
      console.log('add success');
    })
    .catch((err) => {
      dispatch(falseDialog());
      dispatch({
        type: DELETE_MENU_TYPE,
        payload: newMenuType.typeId,
      });

      console.log('got error on addMenuType : ', err);
    });
};

export const deleteMenuType = (menuTypeId) => (dispatch) => {
  //data = {id , type}
  console.log('in action delete menutype', menuTypeId);
  dispatch({
    type: DELETE_MENU_TYPE,
    payload: menuTypeId,
  });
  axios
    .post(`/deleteMenuType/${menuTypeId}`)
    .then((res) => {
      console.log('delete success');
    })
    .catch((err) => {
      console.log('got error on deleteMenuType : ', err);
    });
};

export const deleteMenuItem = (dataDelete) => (dispatch) => {
  dispatch({
    type: DELETE_MENU_ITEM,
    payload: dataDelete,
  });
  axios
    .post(`/deleteMenuItem`, dataDelete)
    .then((res) => {
      console.log('delete success');
    })
    .catch((err) => {
      console.log('got error on deleteMenuItem : ', err);
    });
};

// export const updateMenuItem = (newMenuItem) => (dispatch) => {
//   // let menuDetail = {};
//   // let dataFocus, imgName;
//   // for (let value of newMenuItem) {
//   //   if (value[0].includes('userImage_')) {
//   //     dataFocus = value;
//   //     let data = value[0].split('_');
//   //     imgName = data[0];
//   //     menuDetail[imgName] = value[0].split('_')[1];
//   //   } else {
//   //     menuDetail[value[0]] = value[1];
//   //   }
//   // }
//   // if (dataFocus) {
//   //   newMenuItem.append(imgName, dataFocus[1]);
//   //   newMenuItem.delete(dataFocus[0]);
//   // }

//   let menuDetail = {};
//   let dataFocus, imgName;
//   let menuPrices = [];
//   for (let value of newMenuItem) {
//     // console.log('value ='  value[0])
//     console.log('value = ', value);

//     if (value[0].includes('menuImg_')) {
//       dataFocus = value;
//       let data = value[0].split('_');
//       imgName = data[0];
//       menuDetail[imgName] = value[0].split('_')[1];
//     } else if (value[0].includes('menuPrice')) {
//       //ธรรมดา:50
//       let detail = value[1].split(':')[0];
//       let price = value[1].split(':')[1];
//       menuPrices.push({ detail: detail, price: price });
//     } else {
//       menuDetail[value[0]] = value[1];
//     }
//   }

//   if (dataFocus) {
//     newMenuItem.append(imgName, dataFocus[1]);
//     newMenuItem.delete(dataFocus[0]);
//   }

//   menuDetail.menuPrice = menuPrices;
//   console.log('updateMenu Success!!!!!!!!!!!!!!!!!!', menuDetail);

//   dispatch({
//     type: UPDATE_MENU_ITEM,
//     payload: menuDetail,
//   });
//   axios
//     .post('/updateMenuItem', newMenuItem)
//     .then((res) => {
//       console.log('update Item  success');
//     })
//     .catch((err) => {
//       console.log('got error on updateMenuItem : ', err);
//     });
// };

export const updateMenuItem = (newMenuItem) => (dispatch) => {
  let menuDetail = {};
  let dataFocus, imgName;
  let menuPrices = [];
  for (let value of newMenuItem) {
    // console.log('value ='  value[0])
    console.log('value = ', value);
    if (value[0].includes('menuImg_')) {
      dataFocus = value;
      let data = value[0].split('_');
      imgName = data[0];
      menuDetail[imgName] = value[0].split('_')[1];
    } else if (value[0].includes('menuPrice')) {
      //ธรรมดา:50
      let detail = value[1].split(':')[0];
      let price = value[1].split(':')[1];
      menuPrices.push({ detail: detail, price: price });
    } else {
      menuDetail[value[0]] = value[1];
    }
  }

  if (dataFocus) {
    newMenuItem.append(imgName, dataFocus[1]);
    newMenuItem.delete(dataFocus[0]);
  }

  menuDetail.menuPrice = menuPrices;
  console.log('addMenu Success!!!!!!!!!!!!!!!!!!', menuDetail);

  dispatch({
    type: UPDATE_MENU_ITEM,
    payload: menuDetail,
  });

  axios
    .post('/updateMenuItem', newMenuItem)
    .then((res) => {
      console.log('update success', res);
      dispatch(doSomething());
    })
    .catch((err) => {
      console.log('got error on addmenu : ', err);
    });
};

export const updateMenuType = (newMenuType) => (dispatch) => {
  //newMenuType = {
  // typeName :
  // typeId:
  // }
  dispatch({
    type: ADD_MENU_ITEM,
    payload: newMenuType,
  });
  axios
    .post('/updateMenuType', newMenuType)
    .then((res) => {
      console.log('update success');
    })
    .catch((err) => {
      console.log('got error on updateMenuType : ', err);
    });
};
