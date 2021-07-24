import React, { Component } from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
// import pain from '../img/sangusa.jpg';
// import { getStoreDetail } from "../redux/action/storeAction";
import NavbarAfterLogin from '../components/navbar2';
import {
  transferToOwner,
  deletePaymentDetail,
  setPaymentDetail,
  getPaymentDetail,
  getStoreDetail,
} from '../redux/action/storeAction';

import { doSomething } from '../redux/action/uiAction';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// import Navbar from "../components/navbar1";
//import Box from "@material-ui/core/Box";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  spacing: 8,
});

class StoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // time: null,
    };
  }
  componentDidMount() {
    console.log('mount');

    // this.props.getPaymentDetail()
    this.props.getStoreDetail();
    console.log(this.props.storeInfo.storeDetail);
    // this.setState({
    //   time: this.props.storeInfo.storeDetail.expired_at
    // })
    // { console.log('thisprops', this.props.storeInfo.storeDetail) }
  }

  render() {
    // const { name } = this.props
    const paperStyle = {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(8),
      fontSize: 20,
      fontFamily: 'Athiti',
      backgroundColor: '#F9FAFD',
      flexDirection: 'row',
      padding: '35px',
      // paddingTop: '380px',
      border: '1px solid',
    };
    const typoStyle = {
      fontFamily: 'Athiti',
      fontWeight: 500,
      marginTop: '20px',
      typoAlign: {
        display: 'flex',
        fontFamily: 'Athiti',
        fontWeight: 500,
        textAlign: 'center',
        paddingTop: '30px',
        justifyContent: 'flex-start',
      },
      typoAligns: {
        display: 'flex',
        fontFamily: 'Athiti',
        fontWeight: 500,
        textAlign: 'center',
        paddingTop: '30px',
        justifyContent: 'flex-start',
        marginLeft: '64px',
      },
      typoRed: {
        fontFamily: 'Athiti',
        fontWeight: 500,
        color: 'red',
      },
      typoGreen: {
        fontFamily: 'Athiti',
        fontWeight: 500,
        paddingTop: '30px',
        color: 'green',
      },
    };
    // const avatarStyle = { backgroundColor: '#F7C830' }
    const btnstyle = {
      margin: '20px auto',
      width: '60%',
      backgroundColor: '#F7C830',
      fontSize: 18,
    };
    // console.log(this.props.store.storeDe"tail)
    //

    return (
      <div>
        {/* <NavbarAfterLogin {...this.props} /> */}
        <Grid container spacing={3} direction="column">
          <Grid item m={12}></Grid>
          <Grid item m={12}>
            <Grid container>
              <Grid item sm={3} xs={3}></Grid>
              <Grid item sm={6} xs={6}>
                <Typography variant="h4" style={typoStyle.typoAligns}>
                  ข้อมูลร้านค้า
                </Typography>
                <Paper elevation={6} style={paperStyle}>
                  <Grid
                    item
                    xs={6}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        fontFamily: 'Athiti',
                        fontWeight: 600,
                        fontSize: '18px',
                        padding: '15px',
                        paddingLeft: '74px',
                      }}
                    >
                      รูปภาพของร้าน
                    </Typography>
                    <img
                      src={this.props.storeInfo.storeDetail.storeImg}
                      width={150}
                      height={150}
                      style={{
                        boxShadow: '2px 2px 14px black',
                        marginLeft: '50px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid
                    item
                    xs={5}
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="h5" style={typoStyle.typoAlign}>
                      ชื่อร้าน : {this.props.storeInfo.storeDetail.storeName}{' '}
                    </Typography>
                    {this.props.storeInfo.storeDetail.activated === true ? (
                      <Typography variant="h5" style={typoStyle.typoGreen}>
                        สถานะของร้าน : เปิดใช้งาน
                      </Typography>
                    ) : (
                      <Typography variant="h5" style={typoStyle.typoRed}>
                        สถานะของร้าน : ยังไม่เปิดใช้งาน
                      </Typography>
                    )}
                    <Typography variant="h5" style={typoStyle.typoAlign}>
                      วันหมดอายุ :
                      {this.props.storeInfo.storeDetail.expired_at ===
                      undefined ? (
                        <Typography variant="h5" style={typoStyle.typoRed}>
                          xxxx-xx-xx
                        </Typography>
                      ) : (
                        <Typography variant="h5" style={typoStyle.typoRed}>
                          {this.props.storeInfo.storeDetail.expired_at.substr(
                            0,
                            10
                          )}
                        </Typography>
                      )}
                    </Typography>

                    {/* style={typoStyle.typoGreen}  <Typography variant='h5' class='glow'>*/}
                  </Grid>
                </Paper>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    onClick={() => {
                      this.props.history.push('/detailstore');
                    }}
                    variant="contained"
                    style={{
                      margin: '20px',
                      width: '300px',
                      fontSize: '24px',
                      backgroundColor: '#ffe227',
                      color: 'black',
                      fontFamily: 'Athiti',
                    }}
                  >
                    แก้ไขข้อมูลร้าน
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => {
                      if (
                        this.props.storeInfo.storeDetail.activated === false
                      ) {
                        this.props.doSomething();
                      } else {
                        this.props.history.push('/paymentway');
                      }
                    }}
                    variant="contained"
                    style={{
                      margin: '20px',
                      width: '300px',
                      fontSize: '24px',
                      backgroundColor: '#ffe227',
                      color: 'black',
                      fontFamily: 'Athiti',
                    }}
                  >
                    เพิ่มอายุการใช้งาน
                  </Button>
                </div>
              </Grid>
              <Grid item sm={3} xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid item m={12}></Grid>
        </Grid>
        <Snackbar open={this.props.UI.sending} autoHideDuration={3000}>
          <Alert severity="error">ร้านค้ายังไม่เปิดใช้งาน</Alert>
        </Snackbar>
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
  getStoreDetail,
  doSomething,
};

export default connect(mapStateToProps, mapActionsToProps)(StoreInfo);
