import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_PATH,
  SET_LINK,
} from '../types';
import { deleteOrder } from './orderAction';
import { getUserData } from './userAction';
import axios from 'axios';

export const confirmCashPayment = (data) => (dispatch) => {
  try {
    axios.post('/confirmCashPayment', data).then((res) => {
      console.log('confirm res = ', res.data);
    });
    dispatch(deleteOrder(data.id));
  } catch (e) {
    console.log('error');
  }
};

export const addSummary = (data) => (dispatch) => {
  console.log('add summary', data);
  axios({
    method: 'post',
    url: '/Summary',
    data: {
      data,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log('success ', res.data);
      axios
        .post('/createPaymentCharge', {
          chargeId: res.data.chargeId,
          orderId: res.data.orderId,
          storeId: res.data.storeId,
        })
        .then((res) => {
          console.log('success create payment charge');
        })
        .catch((err) => {
          console.log(err);
        });
      window.open(res.data.authorizeUri);
    })
    .catch((err) => {
      console.log('got error ', err);
    });
};

export const createCreditCardCharge = (email, name, amount, token, history) => (
  dispatch
) => {
  console.log('use CreatecreditCardCharge');
  axios({
    method: 'post',
    url: '/subscribe-credit-card',
    data: {
      email,
      name,
      amount,
      token,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // resdata =  { paymentDetailYet: true, storeDetailYet: false }
      console.log('success ', res.data);

      history.push(res.data.path);
      // console.log('cp1 ',history)
    })
    .catch((err) => {
      console.log('got error ', err);
    });
};

export const paymentWayCredit = (email, name, amount, token, history) => (
  dispatch
) => {
  console.log('use paymentwaycredit');
  axios({
    method: 'post',
    url: '/way-credit-card',
    data: {
      email,
      name,
      amount,
      token,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // resdata =  { paymentDetailYet: true, storeDetailYet: false }
      console.log('success ', res.data);

      // history.push(res.data.path);
      window.location.href = `http://localhost:3000/storeinfo`;
      // console.log('cp1 ',history)
    })
    .catch((err) => {
      console.log('got error ', err);
    });
};

export const createInternetBankingCharge = (
  email,
  name,
  amount,
  token,
  history
) => (dispatch) => {
  // console.log('use CreatecreditCardCharge', email, name, amount, token);
  console.log('>>>>>>>> ', email, '>', name, '>', amount, '>', token);
  axios({
    method: 'post',
    url: '/subscribe-internet-banking',
    data: {
      email,
      name,
      amount,
      token,
      history,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // resdata =  { paymentDetailYet: true, storeDetailYet: false }
      console.log('success internetBank', res.data.authorizeUri);

      // setTimeout(() => {
      // localStorage.setItem('eiei', res.data.authorizeUri);
      // window.location.href = res.data.authorizeUri;
      // }, 5000);

      window.location.href = res.data.authorizeUri;

      // history.push(res.data.path);
      // console.log('cp1 ',history)
    })
    .catch((err) => {
      console.log('got internetBank error ', err);
    });
};

export const paymentWayBanking = (email, name, amount, token, history) => (
  dispatch
) => {
  // console.log('use CreatecreditCardCharge', email, name, amount, token);
  console.log('>>>>>>>> ', email, '>', name, '>', amount, '>', token);
  axios({
    method: 'post',
    url: '/way-internet-banking',
    data: {
      email,
      name,
      amount,
      token,
      history,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // resdata =  { paymentDetailYet: true, storeDetailYet: false }
      console.log('success bank aaaaaa', res.data.authorizeUri);

      // setTimeout(() => {
      // localStorage.setItem('eiei', res.data.authorizeUri);
      // window.location.href = res.data.authorizeUri;
      // }, 5000);
      window.location.href = res.data.authorizeUri;

      // history.push(res.data.path);
      // console.log('cp1 ',history)
    })
    .catch((err) => {
      console.log('got internetBank error ', err);
    });
};

// SET_LINK
export const customerPay = (email, name, amount, token) => (dispatch) => {
  // console.log('use CreatecreditCardCharge', email, name, amount, token);
  console.log('>>>>>>>> ', email, '>', name, '>', amount, '>', token);
  axios({
    method: 'post',
    url: '/testPayment',
    data: {
      email,
      name,
      amount,
      token,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // resdata =  { paymentDetailYet: true, storeDetailYet: false }
      console.log('res.data = ', res.data);
      dispatch({ type: SET_LINK, payload: res.data });
      console.log('success internetBank', res.data);
      window.location.href = res.data.authorizeUri;
      // history.push(res.data.path);
      // console.log('cp1 ',history)
    })
    .catch((err) => {
      console.log('got internetBank error ', err);
    });
};
