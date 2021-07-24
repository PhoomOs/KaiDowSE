import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import useDialog from '../hooks/useDialog';
import {
  Button,
  TextField,
  Grid,
  Fab,
  CardActionArea,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import FormControl from '@material-ui/core/FormControl';
import { Add, LocalConvenienceStoreOutlined, Remove } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
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
import { validateEditMenuItem } from '../util/validation';

const DialogEditMenu = forwardRef((props, ref) => {
  const [openEdit, openDialogEdit, closeDialogEdit] = useDialog();
  const [typeName, setTypeName] = useState('');
  const [state, setState] = useState([]);
  useImperativeHandle(ref, () => ({
    openDialogEdit: () => openDialogEdit(),
    closeDialogEdit: () => closeDialogEdit(),
    getState: () => {
      setdialogState('dialogInitial');
      setImg(props.dataEdit.menuImg);
    },
    // deleteImg: () => {
    //   setImg(props.dataEdit.menuImg);
    // }
    // setImg(props.dataEdit.menuImg)),
  }));

  const [mainState, setMainState] = useState('initial');
  const [imageUploaded, setImageUploaded] = useState(0);
  // const [menuImg, setmenuImg] = useState(null);
  const [menuName, setMenuName] = useState('');
  const [menuPrice, setMenuPrice] = useState(0);
  const [menuType, setMenuType] = useState();
  const [menuId, setMenuId] = useState('');
  const [file, setFile] = useState(null);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [newItem, setNewItem] = useState([]);
  const [newPrice, setNewPrice] = useState([]);
  const [typeNameEdit, setTypeNameEdit] = useState();
  const [img, setImg] = useState();
  const [isToggled, setIsToggled] = React.useState(false);
  const [dataType, setDataType] = useState([]);
  const [value, setValue] = useState('');
  const [prvUpdate, setPrvUpdate] = useState([]);
  const [prvUpdatePrice, setPrvUpdatePrice] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [imgFile, setImgFile] = useState('');

  // const [prvNewItem, setPrvNewItem] = useState([])
  //////////////////////////////////////////////////////
  const [dialogState, setdialogState] = useState('dialogInitial');

  useEffect(() => {
    setMenuType(props.dataEdit.menuType);
    setState(props.dataEdit);
    setNewItem(props.detail);

    setPrvUpdate(props.detail);
    setPrvUpdatePrice(props.price);

    setNewPrice(props.price);
    setTypeNameEdit(props.typeName);
    setImg(props.dataEdit.menuImg);
    setDataType(props.dataType);
    setMenuName(props.dataEdit.menuName);
    // console.log('setItem : ', props.detail);
    // console.log('setPrice : ', props.price);
  }, [props.dataEdit]);

  const handleEditDialog = (e) => {
    e.preventDefault();
    props.onSuccess(typeName);
  };
  //   ******************************************************************************
  /////////////IMAGE HANDLE////////////////////////////////////////////////////////////////
  const setSelectFile = (result, file) => {
    setSelectedFile(result);
    setImgFile(file);
  };

  const handleUploadClick = (event) => {
    event.preventDefault();

    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setSelectFile([reader.result], file);
      setImg([reader.result]);
    };
    setMainState('uploaded');
    setImg(event.target.files[0]);
    setImageUploaded(1);
    setFile(file);
  };

  // const backEdit = () => {
  //   // deleteImg()
  //   return setImg(props.dataEdit.menuImg);
  //           setdialogState('dialogInitial');
  // }

  const renderInitialState = () => {
    return (
      <Grid
        container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 25,
        }}
      >
        {dialogState === 'dialogEdit' ? (
          <>
            <input
              accept="image/*"
              id="contained-button-file"
              style={{ display: 'none' }}
              multiple
              type="file"
              onChange={handleUploadClick}
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
                <img
                  width="100%"
                  src={state.menuImg}
                  style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
                />
                {/* <AddPhotoAlternateIcon style={{ height: 50, width: 50 }} /> */}
              </Fab>
            </label>
          </>
        ) : (
          <img
            width="100%"
            src={img}
            style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
          />
        )}
      </Grid>
    );
  };

  const renderUploadedState = () => {
    return (
      <React.Fragment>
        <CardActionArea
          onClick={imageResetHandler}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}
        >
          <Grid container>
            <img
              width="100%"
              src={img}
              style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
            />
          </Grid>
        </CardActionArea>
      </React.Fragment>
    );
  };

  const imageResetHandler = (event) => {
    event.preventDefault();

    return dialogState === 'dialogEdit'
      ? (setMainState('initial'), setImg(state.menuImg), setImageUploaded(0))
      : setMainState('uploaded');
  };
  /////////////////////////////////////////////////////////////////////////////////
  const handleChange = (event) => {
    setMenuName(event.target.value);
  };

  const stateEdit = React.useCallback(() => setIsToggled(!isToggled));

  const handleChangeDrop = (event) => {
    const x = uuidv4();

    setMenuType(event.target.value);
    setMenuId(x);
  };

  const itemEvent = (event) => {
    setItem(event.target.value);
  };

  const priceEvent = (event) => {
    setPrice(event.target.value);
  };

  const handleIcon = () => {
    listOfPrice();
    // listOfItem();
  };

  const handleDeleteItem = async () => {
    await props.deleteMenuItem(props.dataEdit);
    await closeDialogEdit();
    await setdialogState('dialogInitial');
    await props.getAllMenuItems();
  };

  const handleUpdateItem = async () => {
    // console.log('update Item : ', {
    //   Img: mainState,
    //   menuName: menuName,
    //   item: newItem,
    //   price: newPrice,
    //   menuType: menuType,
    //   menuId: state.menuId,
    // });

    const formData = new FormData();
    if (mainState !== 'initial') {
      formData.append(`menuImg_${img}`, imgFile, imgFile.name);
    }
    formData.append('menuName', menuName);

    newItem.map((el, index) => {
      formData.append('menuPrice', `${el}:${newPrice[index]}`);
    });
    formData.append('menuType', menuType);
    formData.append('menuId', state.menuId);

    await props.updateMenuItem(formData);
    setdialogState('dialogInitial');

    handleCloseDialog();
  };

  const listOfPrice = async () => {
    await setNewPrice((oldArray) => [...oldArray, price]);

    await setNewItem((oldArray) => [...oldArray, item]);
    setItem('');
    setPrice('');
  };

  const setDialogEditState = React.useCallback(async () => {
    return (
      setdialogState('dialogEdit'),
      setMenuName(props.dataEdit.menuName),
      setMenuType(props.dataEdit.menuType)
    );
  });

  const setDialogInitialState = React.useCallback(
    () => (
      setNewItem(prvUpdate),
      setNewPrice(prvUpdatePrice),
      setdialogState('dialogInitial'),
      setMainState('initial'),
      setImg(state.menuImg)
    )
  );

  const setDialogDeleteState = React.useCallback(() =>
    setdialogState('dialogDelete')
  );

  const handleRemoveProduct = async (e) => {
    let productItem = await newItem.filter((prod) => prod !== newItem[e]);
    let productPrice = await newPrice.filter((prod) => prod !== newPrice[e]);

    await setNewItem(productItem);
    await setNewPrice(productPrice);
  };
  // setMainState('initial')

  const handleCloseDialog = () => {
    setNewItem(prvUpdate);
    setNewPrice(prvUpdatePrice);
    setdialogState('dialogInitial');
    setMainState('initial');
    setImg(state.menuImg);

    props.handleRe();
  };
  return (
    <Dialog
      open={openEdit}
      onClose={() => handleCloseDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <form noValidate onSubmit={this.handleSubmit}> */}
      <DialogTitle align="left" id="alert-dialog-title">
        {'ข้อมูล'}
        <IconButton
          color="primary"
          style={{ float: 'right', alignItems: 'right' }}
          onClick={() => handleCloseDialog()}
        >
          <CloseIcon fontSize="large" color="secondary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} style={{ height: 'auto', width: 450 }}>
          <Grid item sm={1}></Grid>
          <Grid item sm={4}>
            {/* <Typography style={{ top: 35, left: 60 }}> */}
            {(mainState == 'initial' && renderInitialState()) ||
              (mainState == 'uploaded' && renderUploadedState())}
            {/* </Typography> */}
          </Grid>
          <Grid item sm={1}></Grid>
          <Grid item sm={6}>
            {/* <FormControl
              variant='outlined'
              fullWidth
              style={{ marginTop: 30, minWidth: "120px" }}
            > */}
            {/* <InputLabel id='demo-simple-select-label'>ชนิด</InputLabel> */}

            {dialogState === 'dialogEdit' ? (
              <>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  ชนิด
                </InputLabel>

                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  variant="outlined"
                  onChange={handleChangeDrop}
                  value={menuType}
                >
                  {dataType.map((e, index) => {
                    return <MenuItem value={e.typeId}> {e.typeName} </MenuItem>;
                  })}
                </Select>
                <TextField
                  label="ชื่ออาหาร"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 30 }}
                  type="text"
                  id="menuName"
                  name="menuName"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  fullWidth
                />
              </>
            ) : (
              <>
                <TextField
                  label="ชนิด"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 30 }}
                  type="text"
                  id="menuName"
                  name="menuName"
                  value={typeNameEdit}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="ชื่ออาหาร"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 30 }}
                  type="text"
                  id="menuName"
                  name="menuName"
                  value={state.menuName}
                  // onChange={handleChange}
                  fullWidth
                />
              </>
            )}
            {/* </FormControl> */}
          </Grid>

          {newPrice.map((item, index) => {
            return (
              <Grid item sm={12}>
                {dialogState === 'dialogEdit' ? (
                  <>
                    <TextField
                      value={newItem[index]}
                      style={{ marginTop: 15, width: '55%' }}
                      onChange={(e) => {
                        // console.log('change on index : ', index);
                        // console.log('change on value : ', e.target.value);
                        const newArr = newItem.map((value, i) =>
                          i === index ? e.target.value : value
                        );
                        setNewItem(newArr);
                      }}
                      variant="outlined"
                      helperText={() =>
                        validateEditMenuItem(newItem[index]).valid
                          ? validateEditMenuItem(newItem[index]).errors
                          : ''
                      }
                    />
                    <TextField
                      value={newPrice[index]}
                      type="number"
                      onChange={async (e) => {
                        const newArrPrice = await newPrice.map((value, i) =>
                          i === index ? e.target.value : value
                        );
                        await setNewPrice(newArrPrice);
                      }}
                      style={{ marginTop: 15, width: '25%', marginLeft: 10 }}
                      fullWidth
                      variant="outlined"
                    />
                    <IconButton
                      onClick={() => handleRemoveProduct(index)}
                      style={{ marginTop: 2, marginTop: 18, marginLeft: 10 }}
                    >
                      <Remove />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <TextField
                      value={newItem[index]}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ marginTop: 15, width: '55%' }}
                      variant="outlined"
                    />
                    <TextField
                      value={newPrice[index]}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ marginTop: 15, width: '25%', marginLeft: 10 }}
                      fullWidth
                      variant="outlined"
                    />
                  </>
                )}
              </Grid>
            );
          })}

          <Grid item sm={12}>
            {dialogState === 'dialogEdit' ? (
              <>
                <TextField
                  variant="outlined"
                  type="text"
                  value={item}
                  placeholder="เพิ่มรูปแบบ"
                  onChange={(e) => itemEvent(e)}
                  style={{ width: '55%', marginTop: 15 }}
                />
                <TextField
                  variant="outlined"
                  type="number"
                  value={price}
                  placeholder="เพิ่มราคา"
                  onChange={(e) => priceEvent(e)}
                  style={{ width: '25%', marginLeft: 10, marginTop: 15 }}
                />
                <IconButton
                  onClick={() => handleIcon()}
                  style={{
                    display: 'inline',
                    marginTop: 2,
                    marginLeft: 10,
                    marginTop: 19,
                  }}
                >
                  <Add />
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {dialogState === 'dialogEdit' ? (
          <>
            <Grid item sm={2}>
              <Button color="primary" onClick={setDialogInitialState} fullWidth>
                ยกเลิก
              </Button>
            </Grid>
            <Grid item sm={2}>
              <Button onClick={handleUpdateItem} color="primary" fullWidth>
                ยืนยัน
              </Button>
            </Grid>
          </>
        ) : dialogState === 'dialogDelete' ? (
          <>
            <Grid item sm={2}>
              <Button onClick={setDialogInitialState} color="primary" fullWidth>
                ยกเลิก
              </Button>
            </Grid>
            <Grid item sm={2}>
              <Button color="primary" onClick={handleDeleteItem} fullWidth>
                ยืนยัน
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Button onClick={setDialogDeleteState} color="primary">
              ลบ
            </Button>
            <Button color="primary" onClick={setDialogEditState}>
              แก้ไข
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
});

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
};
export default connect(mapStateToProps, mapActionsToProps, null, {
  forwardRef: true,
})(DialogEditMenu);
