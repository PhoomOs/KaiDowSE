import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import {
  createCreditCardCharge,
  createInternetBankingCharge,
} from '../redux/action/paymentAction';

import Script from 'react-load-script';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
let OmiseCard;

class CheckoutCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: 'pkey_test_5ngv2udcgy2i73pdxm9',
      currency: 'thb',
      frameLabel: 'sabai shop',
      submitLabel: 'Pay Now',
      buttonLabel: 'Pay with Omise',
    });
  };

  creditCardConfigure = () => {
    // I
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });
    //โยงปุ่มด้วยน Id
    OmiseCard.configureButton('#credit-card');
    //ทำให้กดปุ่มแล้วขึ้น
    OmiseCard.attach();
  };

  omiseHandler = () => {
    // II
    OmiseCard.open({
      amount: 200000,
      submitFormTarget: '#checkout-form',
      onCreateTokenSuccess: (token) => {
        //get Token from omise
        console.log('token ', token);
        this.props.createCreditCardCharge(
          'oonnnnn@email.com',
          'oonnnnn',
          50000,
          token,
          this.props.history
        );
      },
      onFormClosed: () => {},
    });
  };

  handleClick = (e) => {
    // this.props.push('/detailpayment')
    e.preventDefault();
    this.creditCardConfigure();
    this.omiseHandler();
  };

  render() {
    const paperStyle = {
      padding: 20,
      height: 480,
      width: 350,
      margin: '120px auto',
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    const btnstyle = {
      margin: '20px auto',
      width: '80%',
      backgroundColor: '#F9FAFD',
    };
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
            id="credit-card"
            onClick={this.handleClick}
          >
            CreditCard
          </Button>
        </form>
      </div>
    );
  }
}

CheckoutCreditCard.propTypes = {
  // classes: PropTypes.object.isRequired,
  //   loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  createCreditCardCharge,
  // createInternetBankingCharge
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(CheckoutCreditCard);
