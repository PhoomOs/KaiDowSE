import React, { Component } from 'react';

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { signupUser } from '../redux/action/userAction';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surName: '',
      phone: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // this.setState({
    //   loading: true
    // });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      // handle: this.state.handle
      name: this.state.name,
      surName: this.state.surName,
      phone: this.state.phone,
      image: '',
    };
    // console.log(newUserData);
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const paperStyle = {
      padding: 20,
      height: 560,
      width: 360,
      margin: '120px auto',
      borderRadius: 12,
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    const btnstyle = { margin: '20px auto', backgroundColor: '#F7C830' };
    const { errors } = this.state;
    return (
      <div>
        {loading && (
          <Backdrop open={true} style={{ zIndex: '99' }}>
            <CircularProgress color="inherit" style={{ color: '#F7C830' }} />
          </Backdrop>
        )}
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
              <h2>ลงทะเบียน</h2>
            </Grid>
            <form noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item maxWidth={12} sm={6}>
                  <TextField
                    label="ชื่อจริง"
                    variant="outlined"
                    autoComplete="fname"
                    id="name"
                    name="name"
                    type="text"
                    helperText={errors.name}
                    error={errors.name ? true : false}
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item maxWidth={12} sm={6}>
                  <TextField
                    label="นามสกุล"
                    variant="outlined"
                    autoComplete="lname"
                    id="surName"
                    name="surName"
                    type="text"
                    helperText={errors.surName}
                    error={errors.surName ? true : false}
                    value={this.state.surName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item maxWidth={12} sm={6}>
                  <TextField
                    label="รหัสผ่าน"
                    variant="outlined"
                    id="password"
                    name="password"
                    type="password"
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item maxWidth={12} sm={6}>
                  <TextField
                    label="ยืนยันรหัสผ่าน"
                    variant="outlined"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item maxWidth={12} sm={12}>
                  <TextField
                    label="อีเมล์"
                    id="email"
                    variant="outlined"
                    name="email"
                    type="email"
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item maxWidth={12} sm={12}>
                  <TextField
                    label="เบอร์โทร"
                    variant="outlined"
                    id="phone"
                    variant="outlined"
                    name="phone"
                    type="number"
                    helperText={errors.phone}
                    error={errors.phone ? true : false}
                    value={this.state.phone}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                type="submit"
                style={btnstyle}
                fullWidth
              >
                ยืนยันลงทะเบียน
              </Button>
            </form>

            <Typography
              align="center"
              style={{ fontSize: 14, color: '#AFAFAF' }}
            >
              {' '}
              มีบัญชีแล้วใช่ไหม <Link href="/login"> เข้าสู่ระบบ </Link>
            </Typography>
            <Dialog
              open={this.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle align="left" id="alert-dialog-title">
                {'ข้อตกลงในการสมัครสามชิก'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  1.อู้นรักน้องบี
                  <br />
                  <br />
                  2.น้องบีไม่รักอู้น
                  <br />
                  <br />
                  3.วงวงวงวงวงวงวงวงวงวงวง
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            <Typography></Typography>
          </Paper>
        </Grid>
      </div>
    );
  }
}

// Signup.propTypes = {
//   user: PropTypes.object.isRequired,
//   UI: PropTypes.object.isRequired,
//   signupUser: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);
