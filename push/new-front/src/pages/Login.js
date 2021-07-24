import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CLEAR_ERRORS } from '../redux/types';
import {
  Card,
  Grid,
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
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import { loginUser } from '../redux/action/userAction';
// import Snackbar from "../components/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// import Navbar from "../components/navbar1";
//import Box from "@material-ui/core/Box";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      open: false,
      openSnack: false,
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handelOpenBackDrop = () => {
    this.setState({
      open: true,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    // console.log("props = ", this.props);
    const {
      UI: { loading },
    } = this.props;

    console.log('eieieieeieiei', this.props);

    const paperStyle = {
      padding: 20,
      height: 400,
      width: 280,
      margin: '160px auto',
      borderRadius: 12,
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    const btnstyle = { backgroundColor: '#F7C830' };
    const { errors } = this.state;

    return (
      <div>
        {loading && (
          <Backdrop open={true} style={{ zIndex: '99' }}>
            <CircularProgress color="inherit" style={{ color: '#F7C830' }} />
          </Backdrop>
        )}
        {console.log('err', errors)}
        {console.log('loading', loading)}

        {/* {Object.keys(errors).length !== 0 && (
          <Snackbar open={true} autoHideDuration={2000} >
            <Alert severity="error">

              ใส่อะไรมาเนี่ย
            </Alert>
            {/* {dispatch({ type: CLEAR_ERRORS })} 
          </Snackbar>

    )
  } */}

        <Card style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ marginBottom: '2rem' }}>เข้าสู่ระบบ</h2>
          </Grid>

          <form noValidate onSubmit={this.handleSubmit.bind(this)}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  label="ชื่อผู้ใช้"
                  variant="outlined"
                  type="email"
                  id="email"
                  name="email"
                  //helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                  style={{
                    marginBottom: '2px',
                  }}
                />
                {errors.email && (
                  <Typography
                    style={{
                      fontSize: 12,
                      fontFamily: 'Athiti',
                      padding: '-4px 0',
                      position: 'absolute',
                      color: 'red',
                      marginLeft: '8px',
                    }}
                  >
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="รหัสผ่าน"
                  type="password"
                  variant="outlined"
                  id="password"
                  name="password"
                  //helperText={errors.password}
                  error={errors.password ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                  style={{
                    marginTop: '4px',
                  }}
                />
                {errors.password && (
                  <Typography
                    style={{
                      fontSize: 12,
                      fontFamily: 'Athiti',

                      position: 'absolute',
                      color: 'red',
                      marginLeft: '8px',
                    }}
                  >
                    {errors.password}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Link
              href="/forgot"
              style={{
                fontSize: 12,
                float: 'right',
                fontWeight: 'bold',
                padding: '10px 0',
              }}
            >
              {' '}
              ลืมรหัสผ่านหรอ ?
            </Link>
            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={this.handelOpenBackDrop}
            >
              เข้าสู่ระบบ
            </Button>
          </form>

          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              style={{
                fontSize: 14,
                fontFamily: 'Athiti',
                padding: '10px 0',
              }}
            >
              {' '}
              ไม่มีบัญชีใช่ไหม ?
              <Link href="/signup" style={{ fontWeight: 'bold' }}>
                {' '}
                ลงทะเบียน
              </Link>
              <div style={{ display: 'column' }}>
                <Link
                  href="/"
                  style={{
                    fontWeight: 'bold',
                    marginLeft: '40px',
                    color: '#6a6a6a',
                    textDecoration: 'underline',
                  }}
                >
                  {' '}
                  กลับสู่หน้าเริ่มต้น
                </Link>
              </div>
            </Typography>
          </Grid>
        </Card>

        <Snackbar open={this.props.UI.cantSending} autoHideDuration={2000}>
          <Alert severity="error">
            {errors.password || errors.general || errors.email}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

login.propTypes = {
  // classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(login);
