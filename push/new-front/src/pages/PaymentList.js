import React, { Component } from 'react';
import { Grid, Paper, Avatar, Typography, Button } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CheckoutCreditCard from '../components/CheckoutCreditCard';
import CheckoutInternetBanking from '../components/CheckoutInternetBanking';
import { logoutUser } from '../redux/action/userAction';
import { connect } from 'react-redux';

class PaymentList extends Component {
  constructor() {
    super();
    this.state = {
      useState: false,
      setOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path.paymentDetail === true) {
      console.log('path = ', this.props.path);
    }
  }

  handleClickOpen = (event) => {
    this.setState({
      setOpen: true,
    });
  };
  handleClose = (event) => {
    this.setState({
      setOpen: false,
    });
  };
  render() {
    const paperStyle = {
      padding: 20,
      height: 480,
      width: 350,
      margin: '120px auto',
    };
    const typoStyle = {
      fontFamily: 'Athiti',
      fontWeight: 500,
      marginTop: '20px',
      typoAlign: {
        fontFamily: 'Athiti',
        fontWeight: 500,
        textAlign: 'center',
        paddingTop: '40px',
      },
      typoRed: {
        fontFamily: 'Athiti',
        fontWeight: 500,
        marginTop: '20px',
        color: 'red',
      },
      typoGreen: {
        fontFamily: 'Athiti',
        fontWeight: 500,
        marginTop: '20px',
        color: 'green',
      },
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    const btnstyle = {
      margin: '20px auto',
      width: '80%',
      backgroundColor: '#F9FAFD',
    };
    return (
      <Grid>
        <Paper elevation={12} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOpenIcon />
            </Avatar>
            <Typography variant="h5" style={typoStyle}>
              เลือกช่องทางการชำระเงิน
            </Typography>
          </Grid>
          <Grid align="center">
            {/* <Button href="/profilepayment" variant="contained" style={btnstyle}>
              ATM
            </Button> */}
            {/* <Button href="/profilepayment" variant="contained" style={btnstyle}>
              iBanking
            </Button> */}
            <CheckoutInternetBanking history={this.props.history} />
            <CheckoutCreditCard history={this.props.history} />
            <div>
              <Button
                variant="contained"
                style={{
                  margin: '20px auto',
                  width: '80%',
                  backgroundColor: '#F9FAFD',
                }}
                onClick={() => this.props.logoutUser(this.props.history)}
              >
                logOut
              </Button>
            </div>

            {/* <Button href="/profilepayment" variant="contained" style={btnstyle}>
              Paypal
            </Button> */}
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.path,
});

export default connect(mapStateToProps, { logoutUser })(PaymentList);

// export default connect(mapStateToProps, { signupUser })(Signup);

//<Grid align='right'>
//                  <Button href='/login' variant="contained" style={{margin:'20px auto',width:'30%',backgroundColor:"#F7C830"}}>ย้อนกลับ</Button>
//                </Grid>
