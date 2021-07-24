import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import { addEmployee, deleteEmployee } from '../redux/action/employeeAction';
// import Navbar from "../components/navbar1";
//import Box from "@material-ui/core/Box";

class Test extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.addEmployee(userData);
    // this.props.history.push('/detailstore')
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleDelete = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.deleteEmployee(userData);
  };
  Hello = () => {
    console.log('hello');
  };

  render() {
    // console.log("props = ", this.props);
    const paperStyle = {
      padding: 20,
      height: 350,
      width: 280,
      margin: '160px auto',
      borderRadius: 12,
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    const btnstyle = { margin: 'auto auto', backgroundColor: '#F7C830' };
    const { errors } = this.state;
    return (
      <Grid>
        <link
          href="https://fonts.googleapis.com/css2?family=Athiti:wght@200&display=swap"
          rel="stylesheet"
        ></link>
        {/* <Navbar /> */}
        <Paper elevation={12} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>เข้าสู่ระบบ</h2>
          </Grid>

          <form noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item maxWidth={12} sm={12}>
                <TextField
                  label="ชื่อผู้ใช้"
                  variant="outlined"
                  type="email"
                  id="email"
                  name="email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item maxWidth={12} sm={12}>
                <TextField
                  label="รหัสผ่าน"
                  type="password"
                  variant="outlined"
                  id="password"
                  name="password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                />
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
            >
              {/* {this.setState({a: "ADD"})} */}
              เข้าสู่ระบบ
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              {/* {this.setState({a: "DEL"})} */}
              ยกเลิก
            </Button>
          </form>

          <form noValidate onSubmit={this.handleDelete}>
            <Grid container spacing={2}>
              <Grid item maxWidth={12} sm={12}>
                <TextField
                  label="ชื่อผู้ใช้"
                  variant="outlined"
                  type="email"
                  id="email"
                  name="email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item maxWidth={12} sm={12}>
                <TextField
                  label="รหัสผ่าน"
                  type="password"
                  variant="outlined"
                  id="password"
                  name="password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                />
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
            >
              {/* {this.setState({a: "ADD"})} */}
              Delete
            </Button>
            <Button
              // type="submit"
              variant="contained"
              style={btnstyle}
              fullWidth
              onclick={this.Hello()}
            >
              {/* {this.setState({a: "DEL"})} */}
              ยกเลิก
            </Button>
          </form>

          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              style={{ fontSize: 14, fontFamily: 'Athiti', padding: '10px 0' }}
            >
              {' '}
              ไม่มีบัญชีใช่ไหม ?
              <Link href="/signup" style={{ fontWeight: 'bold' }}>
                {' '}
                ลงทะเบียน
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

// login.propTypes = {
//   // classes: PropTypes.object.isRequired,
//   loginUser: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
//   UI: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  employee: state.employee,
});

const mapActionsToProps = {
  addEmployee,
  deleteEmployee,
};

export default connect(mapStateToProps, mapActionsToProps)(Test);
