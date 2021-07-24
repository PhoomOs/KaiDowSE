const express = require('express');
const {
  login,
  signup,
  addEmployee,
  getAllEmployee,
  removeUser,
  editUserData,
  getUserData,
  uploadImage,
  editEmployee,
} = require('../controller/users');
const Route = express.Router();
const fbAuth = require('../util/fbAuth');

Route.post(
  '/signup',
  (req, res, next) => {
    console.log('signup');
    return next();
  },
  signup
);

Route.post(
  '/login',
  (req, res, next) => {
    console.log('login');
    return next();
  },
  login
);

Route.post(
  '/addEmployee',
  (req, res, next) => {
    console.log('addEmployee');
    return next();
  },
  fbAuth,
  addEmployee
);

Route.post(
  '/editEmployee',
  (req, res, next) => {
    console.log('editEmployee');
    return next();
  },
  fbAuth,
  editEmployee
);

Route.get(
  '/getUserData',
  (req, res, next) => {
    console.log('getUserData');
    return next();
  },
  fbAuth,
  getUserData
);

Route.get(
  '/getEmployeeDetail',
  (req, res, next) => {
    console.log('getEmployeeDetail');
    return next();
  },
  fbAuth,
  getAllEmployee
);

Route.delete(
  '/removeUser/:email',
  (req, res, next) => {
    console.log('removeUser');
    return next();
  },
  fbAuth,
  removeUser
);

Route.post(
  '/editUserData/:email',
  (req, res, next) => {
    console.log('editUserData');
    return next();
  },
  fbAuth,
  editUserData
);

Route.post(
  '/users/uploadImg/:email',
  (req, res, next) => {
    console.log('setStoreName');
    return next();
  },
  fbAuth,
  uploadImage
);


module.exports = Route;
