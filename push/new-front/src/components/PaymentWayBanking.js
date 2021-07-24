import Script from 'react-load-script';
import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { paymentWayBanking } from '../redux/action/paymentAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
let OmiseCard;
class PaymentWayBanking extends Component {
  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: 'pkey_test_5ngv2udcgy2i73pdxm9',
      currency: 'thb',
      frameLabel: 'sabai shop',
      submitLabel: 'Pay Now',
      // buttonLabel: 'Pay with Omise',
    });
  };

  internetBankingConfigure = () => {
    // I
    OmiseCard.configure({
      defaultPaymentMethod: 'internet_banking_scb',
      otherPaymentMethods: [],
    });
    //โยงปุ่มด้วยน Id
    OmiseCard.configureButton('#internet-banking');
    //ทำให้กดปุ่มแล้วขึ้น
    OmiseCard.attach();
  };

  omiseHandler = () => {
    // II
    OmiseCard.open({
      amount: 123456,
      onCreateTokenSuccess: (token) => {
        this.props.paymentWayBanking(
          'bank@test.com',
          'zxas',
          123456,
          token,
          'storeinfo'
        );
      },
      onFormClosed: () => {},
    });
  };

  handleClick = (e) => {
    // this.props.push('/detailpayment')
    e.preventDefault();
    this.internetBankingConfigure();
    this.omiseHandler();
  };

  render() {
    const btnstyle = {
      margin: '20px auto',
      width: '80%',
      backgroundColor: '#F9FAFD',
    };
    const paperStyle = {
      padding: 20,
      height: 480,
      width: 350,
      margin: '120px auto',
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    return (
      <div>
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleScriptLoad}
        />
        <form>
          <Button
            variant="contained"
            style={btnstyle}
            id="internet-banking"
            onClick={this.handleClick}
          >
            Pay with Internet Banking / Others
          </Button>
        </form>
      </div>
    );
  }
}

const mapActionsToProps = {
  // createCreditCardCharge,
  paymentWayBanking,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(PaymentWayBanking);
