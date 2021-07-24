import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  TextField,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../collection/iconfollow.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteCoupon } from '../redux/action/couponAction';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
import useDialog from '../hooks/useDialog';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const DialogEditCoupon = forwardRef((props, ref) => {
  const [open, openDialog, closeDialog] = useDialog();

  const setposition = { marginTop: 5, marginBottom: 5 };
  const [couponName, setCouponName] = useState(props.couponData.couponName);
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponDetail, setCouponDetail] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [index, setIndex] = useState('');
  const [couponId, setCouponId] = useState('');
  const [dialogState, setDialogState] = useState('Initial');

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

  useEffect(() => {
    setCouponName(props.couponData.couponName);
    setCouponAmount(props.couponData.couponAmount);
    setCouponDetail(props.couponData.couponDetail);
    setIsToggled(props.couponData.couponType);
    setCouponId(props.couponData.couponId);
  }, [props.couponData]);

  useImperativeHandle(ref, () => ({
    openDialog: () => openDialog(),
    closeDialog: () => closeDialog(),
    getPriceCoupon: () => couponAmount,
    getTypeCoupon: () => isToggled,
  }));

  const close = () => {
    setCouponName('');
    setCouponAmount(0);
    setCouponDetail('');
    setIsToggled(false);
    closeDialog();
  };
  const stateEdit = React.useCallback(() => setIsToggled(!isToggled));

  const handleDeleteCoupon = (e) => {
    e.preventDefault();

    let newCoupon = {
      couponId: couponId,
      couponName: couponName,
      couponDetail: couponDetail,
      couponType: isToggled,
      couponAmount: couponAmount,
    };
    props.deleteCoupon(newCoupon);
    closeDialog();
  };
  const classes = useStyles();

  const onSuccess = () => {
    props.setPrice(couponAmount);
    props.setTypeCoupon(isToggled);

    if (isToggled) {
      const price = props.PriceSummary * (couponAmount / 100);
      if (price >= 0) {
        props.setPriceSummary(props.PriceSummary - price);
      } else {
        props.setPriceSummary(0);
      }
    } else {
      const price = props.PriceSummary - couponAmount;
      if (price >= 0) {
        props.setPriceSummary(price);
      } else {
        props.setPriceSummary(0);
      }
    }

    closeDialog();
  };

  return (
    <div>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle align="left" id="alert-dialog-title">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0px 0px 0px 0px',
            }}
          >
            <Typography variant="h5">รายละเอียดคูปอง</Typography>

            <IconButton
              onClick={() => {
                closeDialog();
              }}
              style={{ padding: '0px 0px 0px 0px' }}
            >
              <CloseOutlinedIcon fontSize="large"></CloseOutlinedIcon>
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent>
          <div style={{ width: 300 }}>
            <TextField
              variant="outlined"
              label="ชื่อคูปอง"
              style={setposition}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={couponName}
              onChange={(e) => setCouponName(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="รายละเอียด"
              style={setposition}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
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
                      // onChange={stateEdit}
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
                  // label="%"
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
                InputProps={{
                  readOnly: true,
                }}
                value={couponAmount}
                onChange={(e) => setCouponAmount(e.target.value)}
              />
            </Grid>
          </div>
        </DialogContent>

        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          {props.dialogState === 'Initial' ? (
            <>
              <IconButton>
                <DeleteForeverOutlinedIcon
                  onClick={handleDeleteCoupon}
                  fontSize="large"
                  color="secondary"
                />
              </IconButton>
            </>
          ) : (
            <Button onClick={onSuccess} style={{ backgroundColor: '#F7C830' }}>
              ยืนยันการใช้คูปอง
            </Button>
          )}
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
  deleteCoupon,
};

export default connect(mapStateToProps, mapActionToProps, null, {
  forwardRef: true,
})(DialogEditCoupon);
