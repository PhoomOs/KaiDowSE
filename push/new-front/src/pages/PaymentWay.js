import React, { Component } from 'react';
import { Grid, Paper, Avatar, Typography, Button } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PaymentWayCredit from '../components/PaymentWayCredit';
import PaymentWayBanking from '../components/PaymentWayBanking';
import { logoutUser } from '../redux/action/userAction';
import { connect } from 'react-redux';

class PaymentWay extends Component {
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

    console.log('log from storeInfo ', this.props.storeInfo.check2);
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
            <PaymentWayBanking history={'/storeinfo'} />
            <PaymentWayCredit history={this.props.history} />
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
            <div>
              <Button onClick={() => this.props.history.push('/storeinfo')}>
                Back
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
  storeInfo: state.storeInfo,
});

export default connect(mapStateToProps, { logoutUser })(PaymentWay);

// export default connect(mapStateToProps, { signupUser })(Signup);

//<Grid align='right'>
//                  <Button href='/login' variant="contained" style={{margin:'20px auto',width:'30%',backgroundColor:"#F7C830"}}>ย้อนกลับ</Button>
//                </Grid>
