import React, { Component } from 'react';
import { CardActionArea } from '@material-ui/core';
import {
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  FormHelperText,
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/Fab';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { v4 as uuidv4 } from 'uuid';
import Select from '@material-ui/core/Select';
import { Add, Filter1Rounded, Remove } from '@material-ui/icons';
import { connect } from 'react-redux';
import {
  addMenuItem,
  addMenuType,
  deleteMenuItem,
  deleteMenuType,
  getAllMenuItems,
  updateMenuItem,
  updateMenuType,
} from '../redux/action/menuAction';
import '../collection/iconfollow.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { doSomething, falseDialog } from '../redux/action/uiAction';

import { validateAddMenu, validateAddMenuItem } from '../util/validation';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class DialogAddMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainState: 'initial',
      imageUploaded: 0,
      menuImg: null,
      open: false,
      menuName: '',

      menuType: '',
      menuId: '',
      file: null,
      item: '',

      price: '',

      newItem: [],

      newPrice: [],
      newPrice2: [],

      selectedFile: '',
      imgFile: '',
      checkPam: false,

      errorss: {},

      validMenuItem: false,
      errorsMenuItem: {},
    };

    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.text) {
      this.setState({ errorss: nextProps.UI.text });
    }
  }

  setSelectedFile = (result, file) => {
    this.setState({
      selectedFile: result,
      imgFile: file,
    });
  };

  handleUploadClick = async (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = async function (e) {
      this.setSelectedFile([reader.result], file);
      await this.setState({
        menuImg: [reader.result],
      });
    }.bind(this);
    await this.setState({
      mainState: 'uploaded',
      menuImg: event.target.files[0],
      imageUploaded: 1,
      file: file,
    });
  };

  renderInitialState() {
    return (
      <Grid
        container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 25,
        }}
      >
        <input
          accept="image/*"
          id="contained-button-file"
          style={{ display: 'none' }}
          multiple
          type="file"
          onChange={this.handleUploadClick.bind(this)}
        />
        <label htmlFor="contained-button-file">
          <Fab
            component="span"
            style={{
              color: '#979797',
              alignItems: 'center',
              height: 150,
              width: 150,
            }}
          >
            <AddPhotoAlternateIcon style={{ height: 50, width: 50 }} />
          </Fab>
        </label>
      </Grid>
    );
  }

  renderUploadedState() {
    return (
      <React.Fragment>
        <CardActionArea
          onClick={this.imageResetHandler.bind(this)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}
        >
          <Grid container>
            <img
              width="100%"
              src={this.state.menuImg}
              style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
            />
          </Grid>
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = (event) => {
    this.setState({
      mainState: 'initial',
      menuImg: null,
      imageUploaded: 0,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOpenAddItem = (event) =>
    this.setState({
      open: true,
    });

  handleCloseAddItem = (event) =>
    this.setState({
      mainState: 'initial',
      imageUploaded: 0,
      menuImg: null,
      open: false,
      menuName: '',
      menuPrice: 0,
      menuType: '',
      menuId: '',
      file: null,
      item: '',
      price: '',
      newItem: [],
      newPrice: [],
      newPrice2: [],
      errorss: {},
      errorsMenuItem: {},
    });

  handleSubmit = (e) => {
    for (var i = 0; i < this.state.newPrice2.length; i++) {
      var [a, b] = this.state.newPrice2[i].split(':');
      if (a === '' || b === '') {
        return this.setState({
          checkPam: true,
        });
      }
    }

    let obj = {
      menuName: this.state.menuName,
      menuImg: this.state.menuImg,
      menuType: this.state.menuType,
      menuId: this.state.menuId,
      menuItemName: this.state.checkPam,
    };
    console.log('obj = ', obj);
    const { valid, errors } = validateAddMenu(obj);
    console.log('valid = ', valid, errors);
    // console.log('item = ', this.state.item);
    // console.log('price = ', this.state.price);
    // const { validMi, errorsMi } = validateAddMenuItem(
    //   this.state.item,
    //   this.state.price
    // );
    // console.log('valid :', valid, 'validMi', validMi);

    // if (!(valid && validMi)) {
    // this.setState({ errorss: errors, errorsMenuItem: errorsMi });
    // this.props.falseDialog(errors);
    // // } else {
    this.setState({ checkPam: false, open: false });
    const formData = new FormData();
    if (this.state.menuImg !== null) {
      formData.append(
        `menuImg_${this.state.menuImg}`,
        this.state.imgFile,
        this.state.imgFile.name
      );
      // }
      formData.append('menuName', this.state.menuName);

      this.state.newPrice2.map((el) => {
        console.log('check = ', el);
        formData.append('menuPrice', el);
      });
      formData.append('menuType', this.state.menuType);
      formData.append('menuId', this.state.menuId);
      // formData.append('menuPrice', this.state.newPrice2);
      this.props.addMenuItem(formData);
    }

    this.setState({
      mainState: 'initial',
      imageUploaded: 0,
      menuImg: null,
      menuName: '',
      menuType: '',
      menuId: '',
      file: null,
      item: '',
      price: '',
      newItem: [],
      newPrice: [],
      newPrice2: [],
      beforeDelete: [],
    });
    // this.props.getAllMenuItems()
  };

  handleChangeDrop = (event) => {
    const x = uuidv4();
    this.setState({
      menuType: event.target.value,
      menuId: x,
    });
  };

  itemEvent = (event) => {
    console.log('ev = ', event.target.value);
    this.setState({ item: event.target.value });
  };

  priceEvent = (event) => {
    console.log('price:', parseInt(event.target.value));
    if (parseInt(event.target.value) >= 0) {
      this.setState({ price: event.target.value });
    }
  };

  handleIcon = () => {
    //this.listOfPrice();
    // console.log('price:', this.state.price, 'item:', this.state.item);
    const { validMi, errorsMi } = validateAddMenuItem(
      this.state.item,
      this.state.price
    );
    //console.log('valid:', valid);

    if (!validMi) {
      // console.log('valid');
      this.setState({ errorsMenuItem: errorsMi });
    } else {
      this.setState({ errorsMenuItem: {} });
      console.log('LISTTTT');
      this.listOfPrice();
    }
  };

  listOfPrice = () => {
    this.setState((prevState) => ({
      newItem: [...prevState.newItem, this.state.item],
      newPrice: [...prevState.newPrice, this.state.price],
      newPrice2: [
        ...prevState.newPrice2,
        this.state.item.concat(':').concat(this.state.price),
      ],
    }));
    this.setState({
      price: '',
      item: '',
    });
  };

  handleRemoveProduct(e) {
    let productItem = this.state.newItem.filter(
      (prod) => prod !== this.state.newItem[e]
    );
    let productPrice = this.state.newPrice.filter(
      (prod) => prod !== this.state.newPrice[e]
    );
    this.setState({ newItem: productItem });
    this.setState({ newPrice: productPrice });
  }

  render() {
    const { errorss } = this.state;
    // console.log('errosaddmenuRENDER :', errorss);
    // console.log('errosaddmenuITEM RENDER:', this.state.errorsMenuItem);
    return (
      <div>
        <Button
          onClick={this.handleOpenAddItem.bind(this)}
          id="myBtn"
          title="create-menu"
        >
          <Add />
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleCloseAddItem.bind(this)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle align="left" id="alert-dialog-title">
            {'สร้างเมนูอาหาร'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ height: 'auto', width: 450 }}>
              <Grid item sm={1}></Grid>
              <Grid item sm={4}>
                <Typography style={{ top: 35, left: 60 }}>
                  {(this.state.mainState == 'initial' &&
                    this.renderInitialState()) ||
                    (this.state.mainState == 'uploaded' &&
                      this.renderUploadedState())}
                </Typography>
              </Grid>
              <Grid item sm={1}></Grid>
              <Grid item sm={6}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 30, minWidth: '120px' }}
                >
                  <InputLabel
                    id="demo-simple-select-label"
                    error={errorss.menuType ? true : false}
                  >
                    ชนิด
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.menuType}
                    onChange={this.handleChangeDrop}
                    error={errorss.menuType ? true : false}
                  >
                    {this.props.data.menuTypes !== undefined
                      ? this.props.data.menuTypes.map((e, index) => (
                          <MenuItem value={e.typeId}> {e.typeName} </MenuItem>
                        ))
                      : []}
                  </Select>
                  {errorss.menuType && (
                    <FormHelperText error={errorss.menuType ? true : false}>
                      {errorss.menuType}
                    </FormHelperText>
                  )}
                </FormControl>

                <TextField
                  label="ชื่ออาหาร"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 30 }}
                  type="text"
                  id="menuName"
                  name="menuName"
                  helperText={errorss.menuName}
                  error={errorss.menuName ? true : false}
                  value={this.state.menuName}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>

              {/* check state add_menuitem or del_menuitem */}

              {this.state.newItem.map((item, index) => {
                return (
                  <Grid item sm={12}>
                    <div>
                      <TextField
                        value={this.state.newItem[index]}
                        onChange={(e) => {
                          const newArr = this.state.newItem.map((value, i) =>
                            i === index ? e.target.value : value
                          );
                          this.setState({
                            newItem: newArr,
                          });
                        }}
                        style={{ marginTop: 15, width: '55%' }}
                        variant="outlined"
                        disabled
                      />

                      <TextField
                        value={this.state.newPrice[index]}
                        type="number"
                        onChange={(e) => {
                          const newArrPrice = this.state.newPrice.map(
                            (value, i) => (i === index ? e.target.value : value)
                          );
                          this.setState({
                            newPrice: newArrPrice,
                          });
                        }}
                        style={{ marginTop: 15, width: '25%', marginLeft: 10 }}
                        fullWidth
                        variant="outlined"
                        disabled
                      />

                      <IconButton
                        onClick={() => {
                          this.handleRemoveProduct(
                            this.state.newPrice.indexOf(
                              this.state.newPrice[index]
                            )
                          );
                        }}
                        style={{ marginTop: 2, marginTop: 18, marginLeft: 10 }}
                      >
                        <Remove />
                      </IconButton>
                    </div>
                  </Grid>
                );
              })}

              {/* first showing on open dialog */}

              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  type="text"
                  value={this.state.item}
                  placeholder="เพิ่มรูปแบบ"
                  onChange={this.itemEvent}
                  helperText={this.state.errorsMenuItem.menuItemName}
                  error={this.state.errorsMenuItem.menuItemName ? true : false}
                  style={{ width: '55%', marginTop: 15 }}
                />
                <TextField
                  variant="outlined"
                  type="number"
                  value={this.state.price}
                  placeholder="เพิ่มราคา"
                  helperText={this.state.errorsMenuItem.menuItemPrice}
                  error={this.state.errorsMenuItem.menuItemPrice ? true : false}
                  onChange={this.priceEvent}
                  style={{ width: '25%', marginLeft: 10, marginTop: 15 }}
                />
                <IconButton
                  onClick={this.handleIcon.bind(this)}
                  style={{
                    display: 'inline',
                    marginTop: 2,
                    marginLeft: 10,
                    marginTop: 19,
                  }}
                >
                  <Add />
                </IconButton>
                <Grid></Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleCloseAddItem.bind(this)}
              color="primary"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={
                () => {
                  this.handleSubmit();
                }
                // this.props.getAllMenuItems();
              }
              color="primary"
              autoFocus
            >
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={this.props.UI.sending} autoHideDuration={2000}>
          <Alert severity="success">Add Success !!</Alert>
        </Snackbar>

        <Snackbar open={this.props.UI.cantSending} autoHideDuration={2000}>
          <Alert severity="error">{this.props.UI.text.menuName}</Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  UI: state.UI,
});

const mapActionsToProps = {
  addMenuItem,
  addMenuType,
  deleteMenuItem,
  deleteMenuType,
  getAllMenuItems,
  updateMenuItem,
  updateMenuType,
  doSomething,
  falseDialog,
};

export default connect(mapStateToProps, mapActionsToProps)(DialogAddMenu);
