import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CardActionArea,
} from '@material-ui/core';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import '../collection/iconfollow.css';
import useDialog from '../hooks/useDialog';
import { v4 as uuidv4 } from 'uuid';

const DialogOrderAddMenu = (props, ref) => {
  const [open, openDialog, closeDialog] = useDialog();
  const [id, setId] = useState('');
  const [data, setData] = useState({});
  const [status, setStatus] = useState('');
  const [selectedPrice, setSelectedPrice] = useState();

  //   console.log('dialogDelete');
  const onSuccess = () => {
    console.log('Call onSuccess addMenu ', selectedPrice.price);
    if (status == 'menu') {
      // console.log('add menu ', {
      //   name: data.menuName,
      //   price: selectedPrice,
      //   addOn: [],
      //   totalPrice: parseInt(selectedPrice.price),
      //   quantity: 1,
      //   id: uuidv4(),
      //   status: 'toDo',
      //   type: 'menu',
      // });
      props.onSuccess({
        name: data.menuName,
        price: selectedPrice,
        addOn: [],
        totalPrice: parseInt(selectedPrice.price),
        quantity: 1,
        id: uuidv4(),
        status: 'toDo',
        type: 'menu',
      });
    } else {
      console.log('addData : ', data);
      console.log('add addOn = ', {
        name: data.menuName,
        price: selectedPrice,
        totalPrice: parseInt(selectedPrice.price),
        quantity: 1,
        id: uuidv4(),
        status: 'toDo',
        type: 'addOn',
        menuId: data.memId.id,
      });
      props.onAddAddOn({
        name: data.menuName,
        price: selectedPrice,
        addOn: [],
        totalPrice: parseInt(selectedPrice.price),
        quantity: 1,
        id: uuidv4(),
        status: 'toDo',
        type: 'addOn',
        menuId: data.memId.id,
      });
    }
    closeDialog();
  };
  const handleDetailSelect = (e) => {
    setSelectedPrice(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    openDialog: (data, status) => {
      // console.log('openDialog data = ', data);
      setData(data);
      setStatus(status);

      return openDialog();
    },
    closeDialog: () => closeDialog(),
  }));
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogContent>
        <Grid>
          <Typography>เพิ่มรายการอาหาร</Typography>
          <img
            width="100%"
            src={data.menuImg}
            style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
          />
        </Grid>
        <Select
          // defaultValue={() => detailSelect[index]}
          value={selectedPrice}
          onChange={(e) => {
            handleDetailSelect(e);
          }}
        >
          {data.menuPrice != undefined
            ? data.menuPrice.map((i) => (
                <MenuItem value={i}>
                  {i.detail}&nbsp;
                  {i.price}
                  &nbsp;บาท
                </MenuItem>
              ))
            : console.log()}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()} color="primary">
          ยกเลิก
        </Button>
        <Button onClick={() => onSuccess()} color="primary" autoFocus>
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default React.forwardRef(DialogOrderAddMenu);
