import React, { Component } from 'react';

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  FormHelperText,
  Typography,
  Link,
  GridList,
} from '@material-ui/core';
import { connect } from 'react-redux';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setPaymentDetail } from '../redux/action/storeAction';

class DetailPayment extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      surName: '',
      email: '',
      account_type: '',
      account_name: '',
      account_number: '',
      type: 'individual',
      TIN: '',
      errors: {},
      open: false,
    };
  }

  handleSubmit = (event) => {
    const detailPayment = {
      name: this.state.name,
      surName: this.state.surName,
      email: this.state.email,
      account_brand: this.state.account_type,
      account_name: this.state.account_name,
      account_number: this.state.account_number,
      account_type: this.state.type,
      TIN: this.state.TIN,
      userEmail: this.props.user.email,
      errors: {},
    };

    this.props.setPaymentDetail(detailPayment, this.props.history);
    this.setState({
      open: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeSelect = (e) => {
    this.setState({ account_type: e.target.value });
  };

  handleClickOpen = (event) =>
    this.setState({
      open: true,
    });

  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };
  render() {
    console.log('error', this.state.errors);
    const inputLabel = {
      background: 'white',
      padding: '0px 4px',
    };
    const paperStyle = {
      padding: 20,
      width: 450,
      fontFamily: 'Athiti',
    };
    const centerContainer = {
      minHeight: '100vh',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'center',
      padding: '64px',
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    const btnstyle = {
      width: '180px',
      backgroundColor: '#F7C830',
      fontSize: 16,
      fontFamily: 'Athiti',
    };
    const { errors } = this.state;
    const typoStyle = {
      fontFamily: 'Athiti',
      fontWeight: 500,
      marginTop: '10px',
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
    // console.log("credential = ", this.props.user.email)
    return (
      <div style={centerContainer}>
        <link
          href="https://fonts.googleapis.com/css2?family=Athiti:wght@200&display=swap"
          rel="stylesheet"
        ></link>
        <Paper elevation={12} style={paperStyle}>
          <Grid container spacing={2} align="center">
            <Grid item sm={12}>
              <Avatar style={avatarStyle}>
                <LockOpenIcon />
              </Avatar>
              <Typography variant="h4" style={typoStyle}>
                บัญชีเริ่มต้น
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <form noValidate>
                <Grid container spacing={2} align="center">
                  <Grid item sm={6}>
                    <TextField
                      label="ชื่อจริง"
                      variant="outlined"
                      id="name"
                      name="name"
                      type="text"
                      helperText={errors.name}
                      error={errors.name ? true : false}
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      label="นามสกุล"
                      variant="outlined"
                      id="surName"
                      name="surName"
                      type="text"
                      helperText={errors.surname}
                      error={errors.surname ? true : false}
                      value={this.state.surName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      label="อีเมล"
                      variant="outlined"
                      fullWidth
                      id="email"
                      name="email"
                      type="text"
                      helperText={errors.email}
                      error={errors.email ? true : false}
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      label="เลขประจำตัวผู้เสียภาษี"
                      variant="outlined"
                      fullWidth
                      id="TIN"
                      name="TIN"
                      type="text"
                      helperText={errors.TIN}
                      error={errors.TIN ? true : false}
                      value={this.state.TIN}
                      onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      error={errors.account_type ? true : false}
                    >
                      <InputLabel
                        htmlFor="demo-customized-textbox"
                        style={inputLabel}
                        // value={this.state.name}
                      >
                        ธนาคาร
                      </InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select-label"
                        value={this.state.account_type}
                        onChange={this.handleChangeSelect}
                        // helperText={errors.name}
                        // // name="selected"
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={'scb'}>ไทยพาณิชย์</MenuItem>
                        <MenuItem value={'kbank'}>กสิกรไทย</MenuItem>
                        <MenuItem value={'gsb'}>ออมสิน</MenuItem>
                        <MenuItem value={'ktb'}>กรุงไทย</MenuItem>
                        <MenuItem value={'bbl'}>กรุงเทพ</MenuItem>
                        <MenuItem value={'bay'}>กรุงศรี</MenuItem>
                      </Select>
                      {errors.account_type && (
                        <FormHelperText>{errors.account_type}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      label="ชื่อบัญชี"
                      variant="outlined"
                      fullWidth
                      id="account_name"
                      name="account_name"
                      type="text"
                      helperText={errors.account_name}
                      error={errors.account_name ? true : false}
                      value={this.state.account_name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      label="หมายเลขบัญชีธนาคาร"
                      variant="outlined"
                      fullWidth
                      id="account_number"
                      name="account_number"
                      type="text"
                      helperText={errors.account_number}
                      error={errors.account_number ? true : false}
                      value={this.state.account_number}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  {/* <Grid item maxWidth={12} sm={6}>
                <Button href='/login' variant="contained" style={btnstyle}>ย้อนกลับ
                </Button> */}
                  {/* </Grid> */}
                  <Grid item sm={12}>
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
                  onClose={this.handleClose.this}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle align="left" id="alert-dialog-title">
                    {'ยืนยันข้อมูลอีกครั้ง'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      ชื่อ : {this.state.name}
                      <br />
                      Email : {this.state.email}
                      <br />
                      ชื่อบัญชี : {this.state.account_name}
                      <br />
                      ธนาคาร : {this.state.account_type}
                      <br />
                      เลขบัญชี : {this.state.account_number}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handleClose.bind(this)}
                      color="primary"
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      onClick={() => {
                        this.handleSubmit(this);
                      }}
                      color="primary"
                      autoFocus
                    >
                      ยืนยัน
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
// DetailPayment.propTypes = {
//   setPaymentDetail:PropTypes.func.isRequired,
// }

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  setPaymentDetail,
};

export default connect(mapStateToProps, mapActionsToProps)(DetailPayment);
