import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import { setStoreDetail } from '../redux/action/storeAction';

class DetailStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      storeImg: null,
      mainState: 'initial',
      imageUploaded: 0,
      errors: {},
      open: false,
      file: null,
      check: false,
    };
  }

  componentDidMount() {
    this.setState({ check: this.props.store.check });
  }

  handleSubmit = (event) => {
    // console.log('event = ',event)
    // event.preventDefault();
    const formData = new FormData();

    formData.append('storeImg', this.state.file, this.state.file.name);
    formData.append('storeName', this.state.storeName);
    this.props.setStoreDetail(formData);
    // return (<Redirect to="/storeinfo" />)
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleUploadClick = (event) => {
    // console.log();
    var file2 = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file2);
    console.log('file  = ', file2);
    reader.onloadend = function (e) {
      this.setState({
        storeImg: [reader.result],
      });
    }.bind(this);
    this.setState({
      mainState: 'uploaded',
      file: file2,
      imageUploaded: 1,
    });
  };

  handleClickOpen = (event) =>
    this.setState({
      open: true,
    });
  handleClose = (event) =>
    this.setState({
      open: false,
    });

  renderInitialState() {
    return (
      <React.Fragment>
        <CardContent>
          <input
            accept="image/*"
            id="storeImg"
            style={{ display: 'none' }}
            multiple
            type="file"
            onChange={this.handleUploadClick.bind(this)}
          />

          <label htmlFor="storeImg">
            <Fab
              component="span"
              style={{ color: '#979797', margin: '16px', boxShadow: 'none' }}
            >
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
        </CardContent>
      </React.Fragment>
    );
  }

  renderUploadedState() {
    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler.bind(this)}>
          <img
            src={this.state.storeImg}
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              margin: '20px',
              border: '1px solid #bdbdbd',
            }}
          />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = (event) => {
    // console.log("Click!");
    this.setState({
      mainState: 'initial',
      storeImg: null,
      imageUploaded: 0,
    });
  };

  render() {
    // console.log('cp 4 ',this.props.user

    // console.log('cp 5 ',this.props.store)
    const uploadCard = {
      width: '120px',
      height: '120px',
      margin: '24px auto 16px',
    };
    const paperStyle = {
      padding: 20,
      width: 350,
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: '120px auto',
      fontFamily: 'Athiti',
    };
    const avatarStyle = { backgroundColor: '#F7C830' };
    const btnstyle = {
      margin: '20px auto',
      backgroundColor: '#F7C830',
      fontSize: 16,
      fontFamily: 'Athiti',
    };
    return (
      <Grid
        container
        spacing={2}
        style={{ minHeight: '100vh', alignContent: 'center' }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Athiti:wght@200&display=swap"
          rel="stylesheet"
        ></link>
        {console.log(
          'Before check in detail store is :',
          this.props.store.check
        )}
        {console.log('After check in detail store is :', this.state.check)}
        <Paper elevation={24} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOpenIcon />
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
              ตั้งค่าข้อมูลร้านค้า
            </Typography>
          </Grid>
          <Grid container spacing={2} align="center">
            {/* <Grid item sm={4}></Grid> */}
            <Grid item sm={12}>
              <Card
                className={this.props.cardName}
                variant="outlined"
                style={uploadCard}
              >
                {(this.state.mainState === 'initial' &&
                  this.renderInitialState()) ||
                  (this.state.mainState === 'uploaded' &&
                    this.renderUploadedState())}
              </Card>
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="ชื่อร้าน"
                variant="outlined"
                fullWidth
                autoComplete="sname"
                id="storeName"
                name="storeName"
                type="text"
                // helperText={errors.storename}
                // error={errors.name ? true : false}
                value={this.state.storeName}
                onChange={this.handleChange}
              />
            </Grid>
            {/* <Grid item maxWidth={12} sm={6}>
                    <Button variant="contain ed" style={btnstyle} onClick={this.handleClickOpen.bind(this)} fullWidth>
                    ข้าม       
                    </Button>
                </Grid>            */}
            <Grid item sm={12}>
              {this.state.check === true ? (
                <>
                  <Button
                    onClick={() => this.handleSubmit(this)}
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    disableElevation
                  >
                    ยืนยัน
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      this.props.history.push('/storeinfo');
                    }}
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    disableElevation
                  >
                    ย้อนกลับ
                  </Button>
                  <Button
                    onClick={() => this.handleSubmit(this)}
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    disableElevation
                  >
                    ยืนยัน
                  </Button>
                </>
              )}
            </Grid>
          </Grid>

          {/* <Button
            onClick={this.handleCheck}
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            check
          </Button> */}
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  store: state.storeInfo,
});

const mapActionsToProps = {
  setStoreDetail,
};

export default connect(mapStateToProps, mapActionsToProps)(DetailStore);
