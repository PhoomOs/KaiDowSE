import React, { Component } from 'react';

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { forgotPassword } from '../redux/action/userAction';
class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      open: false,
    };
  }

  handleClickOpen = (event) =>
    this.setState({
      open: true,
    });

  handleClose = (event) => {
    event.preventDefault();
    console.log(this.state.email);
    const data = {
      email: this.state.email,
    };
    this.props.forgotPassword(data);
    this.setState({
      open: false,
    });

    this.props.history.push('/login');
  };

  handleChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  render() {
    const paperStyle = {
      padding: 20,
      height: 300,
      width: 350,
      margin: '120px auto',
      fontFamily: 'Athiti',
    };
    const avatarStyle = { backgroundColor: '#F7C830', fontFamily: 'Athiti' };
    const btnstyle = {
      margin: '20px auto',
      width: '60%',
      backgroundColor: '#F7C830',
      fontFamily: 'Athiti',
    };

    return (
      <Grid>
        <link
          href="https://fonts.googleapis.com/css2?family=Athiti:wght@200&display=swap"
          rel="stylesheet"
        ></link>
        <Paper elevation={12} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Athiti',
                fontWeight: '500',
                fontSize: '26px',
                marginTop: '8px',
              }}
            >
              รีเซ็ตรหัสผ่าน
            </Typography>
          </Grid>
          <Grid container spacing={5}>
            <Grid item maxWidth={12} sm={12}>
              <TextField
                label="อีเมลหรือเบอร์โทร"
                variant="outlined"
                id="email"
                value={this.state.email}
                fullWidth
                onChange={this.handleChange}
                style={{ fontFamily: 'Athiti', marginTop: '20px' }}
              />
            </Grid>
            <Grid maxWidth={12} sm={6} align="center">
              <Button variant="contained" style={btnstyle}>
                ย้อนกลับ
              </Button>
            </Grid>
            <Grid maxWidth={12} sm={6} align="center">
              <Button
                variant="contained"
                style={btnstyle}
                onClick={this.handleClickOpen.bind(this)}
              >
                ยืนยัน
              </Button>
            </Grid>
          </Grid>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose.bind(this)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'กู้คืนรหัสผ่าน'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                style={{ fontFamily: 'Athiti' }}
              >
                We will sent reset password to your email.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose.bind(this)}
                color="primary"
                autoFocus
              >
                ตกลง
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  forgotPassword,
};
export default connect(mapStateToProps, mapActionsToProps)(Forgot);
