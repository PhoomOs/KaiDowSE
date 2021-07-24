import React, { Component } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles';
import NavbarAfterLogin from '../components/navbar2';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import {
  transferToOwner,
  deletePaymentDetail,
  setPaymentDetail,
  getPaymentDetail,
  getStoreDetail,
} from '../redux/action/storeAction';
import bbl from '../img/bbl.png';
import gsb from '../img/gsb.png';
import kb from '../img/kb.png';
import krungsri from '../img/krungsri.jpg';
import ktb from '../img/ktb.png';
import scb from '../img/scb.png';
import kaidowlogo from '../img/kaidowlogo.png';
import DialogPayment from '../components/DialogPayment';
import DialogTransfer from '../components/DialogTransfer';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const theme = createMuiTheme({
  spacing: 8,
});

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openTransfer: false,
      data: {},
      bankimg: {},
      amount: 0,
    };
  }

  componentDidMount() {
    this.props.getPaymentDetail();
    this.props.getStoreDetail();

    // { console.log('thisprops', this.props.storeInfo.storeDetail) }
  }

  handleDelete = () => {
    this.setState({ open: true });
  };

  handleTransfer = () => {
    this.setState({ openTransfer: true });
    console.log('thi', this.state.amount);
  };

  onSuccessDialog = () => {
    console.log('onSuccess payIn', this.props.storeInfo.storeDetail);
    // let data = this.props.storeInfo.storeDetail
    // this.state.props.deletePaymentDetail(data)
    this.props.history.push('/detailpayment');
    this.setState({ open: false });
  };

  onSuccessTransfer = () => {
    const data = {
      email: this.props.storeInfo.paymentDetail.email,
      amount: this.state.amount,
    };
    console.log('sfasdas', data);
    this.props.transferToOwner(data);
    this.props.history.push('/paymentinfo');
    this.setState({ openTransfer: false });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ openTransfer: false });
  };

  render() {
    const paperStyle = {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(10),
      fontSize: 20,
      fontFamily: 'Athiti',
      backgroundColor: '#F9FAFD',
      flexDirection: 'row',
      padding: '35px',
      border: '2px solid',
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
      marginLeft: '144px',
      width: '30%',
      backgroundColor: '#F7C830',
      fontSize: 18,
      fontFamily: 'Athiti',
      btnRed: {
        backgroundColor: 'red',
        color: 'white',
        margin: '20px auto',
        width: '30%',
        fontSize: 18,
        fontFamily: 'Athiti',
        marginLeft: '64px',
      },
    };

    return (
      <div>
        <DialogPayment
          open={this.state.open}
          handleClose={this.handleClose.bind(this)}
          onSuccessDialog={this.onSuccessDialog.bind(this)}
        />
        <DialogTransfer
          open={this.state.openTransfer}
          handleClose={this.handleClose.bind(this)}
          onSuccessTransfer={this.onSuccessTransfer.bind(this)}
        />
        {/* <NavbarAfterLogin {...this.props} /> */}
        <Grid container>
          <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} style={{ paddingTop: '10px' }}>
            <Typography variant="h4" style={typoStyle.typoAlign}>
              ตั้งค่าบัญชี
            </Typography>
            <Paper elevation={12} style={paperStyle}>
              <Grid item xs={6}>
                <Typography variant="h5" style={typoStyle}>
                  ชื่อบัญชี : {this.props.storeInfo.paymentDetail.account_name}
                </Typography>

                {this.props.storeInfo.paymentDetail.account_brand === 'gsb' ? (
                  <Typography variant="h5" style={typoStyle}>
                    ธนาคาร : ออมสิน
                  </Typography>
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'bbl' ? (
                  <Typography variant="h5" style={typoStyle}>
                    ธนาคาร : กรุงเทพ
                  </Typography>
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'krungsri' ? (
                  <Typography variant="h5" style={typoStyle}>
                    ธนาคาร : กรุงศรีอยุทธา
                  </Typography>
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'ktb' ? (
                  <Typography variant="h5" style={typoStyle}>
                    ธนาคาร : กรุงไทย
                  </Typography>
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'scb' ? (
                  <Typography variant="h5" style={typoStyle}>
                    ธนาคาร : ไทยพาณิชย์
                  </Typography>
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'kbank' ? (
                  <Typography variant="h5" style={typoStyle}>
                    ธนาคาร : กสิกร
                  </Typography>
                ) : (
                  <Typography variant="h5" style={typoStyle}>
                    -
                  </Typography>
                )}

                <Typography variant="h5" style={typoStyle}>
                  เลขบัญชี : {this.props.storeInfo.paymentDetail.account_number}
                </Typography>
                <Typography variant="h5" style={typoStyle}>
                  {this.props.storeInfo.paymentDetail.verified === true ? (
                    <Typography variant="h5" style={typoStyle.typoGreen}>
                      สถานะบัญชี : ยืนยันแล้ว
                    </Typography>
                  ) : (
                    <Typography variant="h5" style={typoStyle.typoRed}>
                      สถานะบัญชี : รอการยืนยัน
                    </Typography>
                  )}
                </Typography>
                <Typography variant="h5" style={typoStyle}>
                  {this.props.storeInfo.paymentDetail.active === true ? (
                    <Typography variant="h5" style={typoStyle.typoGreen}>
                      สถานะ : กำลังใช้งาน
                    </Typography>
                  ) : (
                    <Typography variant="h5" style={typoStyle.typoRed}>
                      สถานะ : ยังไม่ใช้งาน
                    </Typography>
                  )}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                {/* bbl gsb kb krungsri ktb scb */}
                {this.props.storeInfo.paymentDetail.account_brand === 'gsb' ? (
                  <img
                    src={gsb}
                    style={{
                      width: '260px',
                      height: '157px',
                      borderRadius: '35px',
                      marginTop: '25.5px',
                    }}
                  />
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'bbl' ? (
                  <img
                    src={bbl}
                    style={{
                      width: '260px',
                      height: '157px',
                      borderRadius: '35px',
                      marginTop: '25.5px',
                    }}
                  />
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'krungsri' ? (
                  <img
                    src={krungsri}
                    style={{
                      width: '260px',
                      height: '157px',
                      borderRadius: '35px',
                      marginTop: '25.5px',
                    }}
                  />
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'ktb' ? (
                  <img
                    src={ktb}
                    style={{
                      width: '260px',
                      height: '157px',
                      borderRadius: '35px',
                      marginTop: '25.5px',
                    }}
                  />
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'scb' ? (
                  <img
                    src={scb}
                    style={{
                      width: '260px',
                      height: '157px',
                      borderRadius: '35px',
                      marginTop: '25.5px',
                    }}
                  />
                ) : this.props.storeInfo.paymentDetail.account_brand ===
                  'kbank' ? (
                  <img
                    src={kb}
                    style={{
                      width: '260px',
                      height: '157px',
                      borderRadius: '35px',
                      marginTop: '25.5px',
                    }}
                  />
                ) : (
                  <img
                    src={kaidowlogo}
                    style={{
                      width: '260px',
                      height: '157px',
                      borderRadius: '35px',
                      marginTop: '25.5px',
                    }}
                  />
                )}
              </Grid>
            </Paper>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h5" style={typoStyle}>
                จำนวนเงินที่สามารถโอนได้ :{' '}
                {this.props.storeInfo.paymentDetail.Summary} บาท
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="h5"
                style={{
                  fontFamily: 'Athiti',
                  fontWeight: 500,
                  marginTop: '30px',
                }}
              >
                จำนวนเงินที่ต้องการโอน :{' '}
              </Typography>
              <OutlinedInput
                type="number"
                inputProps={{ inputProps: { min: 0, max: 10 } }}
                onChange={(event) =>
                  event.target.value < 0
                    ? (event.target.value = 0)
                    : event.target.value >
                      this.props.storeInfo.paymentDetail.Summary
                    ? (event.target.value = this.props.storeInfo.paymentDetail.Summary)
                    : this.setState({ amount: event.target.value })
                }
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">฿</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                style={{ marginTop: '20px' }}
                labelWidth={0}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                onClick={this.handleTransfer.bind(this)}
                style={{
                  width: '200px',
                  fontSize: '24px',
                  backgroundColor: '#ffe227',
                  color: 'black',
                  fontFamily: 'Athiti',
                }}
              >
                โอนเงินเข้าบัญชี
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={this.handleDelete.bind(this)}
                style={{
                  marginLeft: '24px',
                  width: '200px',
                  fontSize: '24px',
                  backgroundColor: '#eb596e',
                  color: 'white',
                  fontFamily: 'Athiti',
                }}
              >
                เปลี่ยนบัญชี
              </Button>
            </div>
          </Grid>
          <Grid item xs={2} sm={2} md={2}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storeInfo: state.storeInfo,
  UI: state.UI,
  user: state.user,
});
const mapActionsToProps = {
  setPaymentDetail,
  getPaymentDetail,
  getStoreDetail,
  deletePaymentDetail,
  transferToOwner,
};

export default connect(mapStateToProps, mapActionsToProps)(PaymentInfo);
