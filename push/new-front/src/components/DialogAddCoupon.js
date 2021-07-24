import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../collection/iconfollow.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { addCoupon, deleteCoupon } from '../redux/action/couponAction';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
import useDialog from '../hooks/useDialog';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const DialogAddCoupon = forwardRef((props, ref) => {
  const [open, openDialog, closeDialog] = useDialog();

  const setposition = { marginTop: 5, marginBottom: 5 };
  const [couponName, setCouponName] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponDetail, setCouponDetail] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  const useStyles = makeStyles({
    switchBase: {
      '&$checked': {
        color: yellow[600],
      },
      '&$checked + $track': {
        backgroundColor: yellow[500],
      },
    },
    checked: {},
    track: {},
  });

  useImperativeHandle(ref, () => ({
    openDialog: () => openDialog(),
    closeDialog: () => closeDialog(),
  }));

  const close = () => {
    setCouponName('');
    setCouponAmount(0);
    setCouponDetail('');
    setIsToggled(false);
    closeDialog();
  };
  const stateEdit = React.useCallback(() => setIsToggled(!isToggled));

  const handleAddCoupon = (e) => {
    e.preventDefault();
    const couponId = uuidv4();
    let newCoupon = {
      couponId: couponId,
      couponName: couponName,
      couponDetail: couponDetail,
      couponType: isToggled,
      couponAmount: couponAmount,
    };
    console.log(newCoupon);
    props.addCoupon(newCoupon);
    setCouponName('');
    setCouponAmount(0);
    setCouponDetail('');
    setIsToggled(false);
    closeDialog();
  };
  const classes = useStyles();

  return (
    <div>
      <Button id="CouBtn" onClick={openDialog}>
        <Add />
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle align="left" id="alert-dialog-title">
          {'สร้างคูปอง'}
        </DialogTitle>
        <DialogContent>
          <div style={{ width: 300 }}>
            <TextField
              variant="outlined"
              label="ชื่อคูปอง"
              style={setposition}
              fullWidth
              value={couponName}
              onChange={(e) => setCouponName(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="รายละเอียด"
              style={setposition}
              fullWidth
              value={couponDetail}
              multiline="true"
              onChange={(e) => setCouponDetail(e.target.value)}
            />
            <FormGroup>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                }}
              >
                <Typography variant="h5">บาท</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isToggled}
                      onChange={stateEdit}
                      value="jason"
                      color="primary"
                      classes={{
                        root: classes.root,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                      }}
                    />
                  }
                />
                <Typography variant="h5">%</Typography>
              </div>
            </FormGroup>
            <Grid style={{ display: 'inline-flex', marginTop: 5 }}>
              <Typography style={{ marginRight: 63, marginTop: 20 }}>
                ส่วนลด
              </Typography>
              <TextField
                type="number"
                style={setposition}
                variant="outlined"
                value={couponAmount}
                onChange={(e) => setCouponAmount(e.target.value)}
              />
            </Grid>
          </div>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={close}
            color="primary"
            style={{ marginRight: 50 }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="outlined"
            onClick={handleAddCoupon}
            color="primary"
            autoFocus
            type="submit"
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

const mapStateToProps = (state) => ({
  coupon: state.coupon,
  UI: state.UI,
});

const mapActionToProps = {
  addCoupon,
  deleteCoupon,
};

export default connect(mapStateToProps, mapActionToProps, null, {
  forwardRef: true,
})(DialogAddCoupon);
