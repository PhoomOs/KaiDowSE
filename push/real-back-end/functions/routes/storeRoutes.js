const express = require('express');
const {
  setStoreDetail,
  setPaymentDetail,
  uploadStoreImage,
  setStoreName,
  getStoreDetail,
  getPaymentDetail,
  addMenutype,
  addMenuItem,
  getAllMenuAndType,
  updateMenuItem,
  updateMenuType,
  // getMenuType,
  // getMenuItem,
  editOrder,
  getAllOrder,
  addOrder,
  deleteOrder,
  deleteMenuType,
  deleteMenuItem,
  deleteCoupon,
  addCoupon,
  getAllCoupon,
} = require('../controller/stores');
const Route = express.Router();
const fbAuth = require('../util/fbAuth');

Route.post(
  '/setPaymentDetail',
  (req, res, next) => {
    console.log('setPaymentDetail');
    return next();
  },
  fbAuth,
  setPaymentDetail
);

Route.post(
  '/setStoreDetail',
  (req, res, next) => {
    console.log('setStoreDetail');
    return next();
  },
  fbAuth,
  setStoreDetail
);

Route.post(
  '/setStoreName',
  (req, res, next) => {
    console.log('setStoreName');
    return next();
  },
  fbAuth,
  setStoreName
);

Route.get(
  '/getStoreDetail',
  (req, res, next) => {
    console.log('getStoreDetail');
    return next();
  },
  fbAuth,
  getStoreDetail
);

Route.get(
  '/getPaymentDetail',
  (req, res, next) => {
    console.log('getPaymentDetail');
    return next();
  },
  fbAuth,
  getPaymentDetail
);

Route.post(
  '/addMenuItem',
  (req, res, next) => {
    console.log('addMenuItem');
    return next();
  },
  fbAuth,
  addMenuItem
);

Route.post(
  '/addMenuType',
  (req, res, next) => {
    console.log('addMenuType');
    return next();
  },
  fbAuth,
  addMenutype
);

Route.get(
  '/getAllMenuAndType',
  (req, res, next) => {
    console.log('getAllMenuAndType');
    return next();
  },
  fbAuth,
  getAllMenuAndType
);

Route.post(
  '/updateMenuItem',
  (req, res, next) => {
    console.log('updateMenuItem');
    return next();
  },
  fbAuth,
  updateMenuItem
);

Route.post('/deleteMenuItem', fbAuth, deleteMenuItem);

Route.post(
  '/updateMenuType',
  (req, res, next) => {
    console.log('updateMenuType');
    return next();
  },
  fbAuth,
  updateMenuType
);

// Route.get(
//   '/getMenuType',
//   (req, res, next) => {
//     console.log('getMenuType');
//     return next();
//   },
//   fbAuth,
//   getMenuType
// );
//

// Route.get (
//   '/getMenuItem',
//   (req, res, next) => {
//     console.log('getMenuItem');
//     return next();
//   },
//   fbAuth,
//   getMenuItem
// );

Route.get(
  '/getAllOrder',
  (req, res, next) => {
    console.log('getAllOrder');
    return next();
  },
  fbAuth,
  getAllOrder
);

Route.post(
  '/addOrder',
  (req, res, next) => {
    console.log('addOrder');
    return next();
  },
  fbAuth,
  addOrder
);

Route.delete(
  '/deleteMenuType/:menuTypeId',
  (req, res, next) => {
    console.log('deleteMenuType');
    return next();
  },
  fbAuth,
  deleteMenuType
);
Route.post('/editOrder', fbAuth, editOrder);

Route.post(
  '/deleteMenuItem',
  (req, res, next) => {
    console.log('deleteMenuItem');
    return next();
  },
  fbAuth,
  deleteMenuItem
);

Route.post('/deleteOrder', fbAuth, deleteOrder);

////////COuponnnnnnnnnnnnnnnnnnnn
Route.get('/getAllCoupon', fbAuth, getAllCoupon);
Route.post('/addCoupon', fbAuth, addCoupon);
Route.post('/deleteCoupon', fbAuth, deleteCoupon);
module.exports = Route;
