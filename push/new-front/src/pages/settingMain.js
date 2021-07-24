import React, { Component } from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  spacing: 8,
});
class SettingMain extends Component {
  render() {
    const paperStyle = {
      padding: 50,
      height: 600,
      width: 1200,
      justifyContent: 'center',
      margin: theme.spacing(10),
      fontSize: 20,
    };
    // const avatarStyle={backgroundColor:'#F7C830'}
    const btnstyle = {
      margin: '20px auto',
      width: '80%',
      backgroundColor: '#F7C830',
      fontSize: 18,
    };
    return (
      <Grid container align="center">
        <link
          href="https://fonts.googleapis.com/css2?family=Athiti:wght@200&display=swap"
          rel="stylesheet"
        ></link>
        <Grid item sm={2} xs={2}></Grid>
        <Grid item sm={8} xs={8}>
          <Paper style={{ paddingTop: '100px', backgroundColor: '#F9FAFD' }}>
            <Typography
              variant="h5"
              style={{ fontFamily: 'Athiti', fontWeight: '500' }}
            >
              ตั้งค่าร้าน
            </Typography>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Button
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                  onClick={() => {
                    this.props.history.push('/mainNav/storeInfo');
                  }}
                >
                  ตั้งค่าร้าน
                </Button>
              </Grid>
              <Grid item sm={6}>
                <Button
                  onClick={() => {
                    this.props.history.push('/mainNav/paymentInfo');
                  }}
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  ตั้งค่าบัญชี
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
      </Grid>
    );
  }
}
export default SettingMain;
