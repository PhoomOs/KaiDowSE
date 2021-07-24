import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { logoutUser, getUserData } from './redux/action/userAction';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SET_AUTHENTICATED } from './redux/types';
import { setKitchenData } from './redux/action/kitchenAction';
import { getAllMenuItems } from './redux/action/menuAction';
import { getAllOrder } from './redux/action/orderAction';
import { getAllEmployee } from './redux/action/employeeAction';
import { getAllCoupon } from './redux/action/couponAction';
import { getAllLog } from './redux/action/logAction';

import AuthRoute from './util/AuthRoute';

import info from './components/navbar1';
import Login from './pages/Login';
import Signup from './pages/Signup';

import PaymentList from './pages/PaymentList';
import DetailPayment from './pages/DetailPayment';
import DetailStore from './pages/DetailStore';
//in main
import MainPage from './pages/MainPage';

import SettingMain from './pages/settingMain';
// import Home from './pages/Home';
import StoreInfo from './pages/StoreInfo';

import PaymentInfo from './pages/PaymentInfo';

import EmployeeManage from './pages/EmployeeManage';
import Snackbar from './components/Snackbar';
import MenuNav from './components/MenuNav';
import Nav2 from './components/navbar2';
import Nav3 from './components/navbar3';
import Nav4 from './components/navbar4';
import OrderList from './pages/OrderList';
import OrderManage from './pages/OrderManage';
import KitchenManage from './pages/KitchenManage';
import PrePayment from './pages/PrePayment';
import ShowCoupon from './components/ShowCoupon';
import CouponPage from './pages/Coupon';
import ForgotPassword from './pages/Forgot';
import PaymentWay from './pages/PaymentWay';

axios.defaults.baseURL = 'http://localhost:5000/kaidow-se/asia-southeast2/api';

// this.props.setKitchenData();
//     this.props.getAllMenuItems();
//     this.props.getAllOrder();
//     this.props.getUserData();

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;

    store.dispatch(getUserData());

    store.dispatch(getAllMenuItems());
    store.dispatch(getAllOrder());
    store.dispatch(setKitchenData());
    store.dispatch(getUserData());
    store.dispatch(getAllEmployee());
    store.dispatch(getAllCoupon());
    store.dispatch(getAllLog());
    console.log('call Get data');
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            {/* <Navbar/> */}
            <Switch>
              <Route path="/" exact component={info} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/signup" component={Signup} />
              {/*payment*/}
              <Route path="/paymentlist" component={PaymentList} />
              {/* first time setting store */}
              <Route path="/detailstore" component={DetailStore} />
              {/*first time setting payment  */}
              <Route path="/detailpayment" component={DetailPayment} />
              <Provider store={store}>
                {/* home */}
                <Route path="/main" exact component={MainPage} />
                <Route path="/main/employeemanage" component={EmployeeManage} />
                <Route path="/main/settingmain" component={SettingMain} />
                <Route path="/paymentInfo" component={PaymentInfo} />
                <Route path="/storeinfo" component={StoreInfo} />
                <Route path="/paymentway" component={PaymentWay} />
                <Route path="/forgot" component={ForgotPassword} />

                {/* <Route path="/main/menumanage" compoCouponPagenent={MenuNav} /> */}
                {/* <Route paht="/coupon" component={} /> */}
                <Route path="/coupon" component={CouponPage} />
                <Route path="/mainNav/:path" exact component={Nav2} />
                <Route path="/mainNav2/:path" exact component={Nav3} />
                <Route path="/mainNav3/:path" exact component={Nav4} />
              </Provider>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Athiti'].join(','),
  },
});
export default App;
