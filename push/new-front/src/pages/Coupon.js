import {
  Card,
  CardContent,
  Grid,
  GridList,
  Typography,
} from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import DialogAddCoupon from '../components/DialogAddCoupon';
import DialogEditCoupon from '../components/DialogEditCoupon';
import MenuNav from '../components/navbar2';
import { connect } from 'react-redux';
import {
  getAllCoupon,
  addCoupon,
  deleteCoupon,
} from '../redux/action/couponAction';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CouponPage = (props) => {
  const [data, setData] = useState([]);
  const [couponName, setCouponName] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);
  const [detail, setDetail] = useState('');
  const [id] = useState([]);
  const [typee, setTypee] = useState('');
  const [couponItems, setCouponItems] = useState();

  const [idforEdit, setIdforEdit] = useState('');

  const DialogAddCouponRef = useRef();
  const DialogEditCouponRef = useRef();

  useEffect(() => {
    console.log('Coupon Mount ');
  }, []);

  useEffect(() => {
    setCouponItems(props.coupon.coupons);
  }, [props.coupon]);

  console.log('coupon in page ', props);
  console.log('index for edit ', idforEdit);

  return (
    <div>
      <DialogEditCoupon
        ref={DialogEditCouponRef}
        couponData={data}
        dialogState={'Initial'}
      />
      <DialogAddCoupon ref={DialogAddCouponRef} />

      <div
        style={{
          backgroundColor: '#f9fafd',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '5%',
        }}
      >
        <Card
          style={{
            width: '70%',
            height: 'auto',
            position: 'absolute',
            padding: 40,
            paddingBottom: '4%',
          }}
        >
          <Grid container spacing={3}>
            {console.log('couponItems = ', couponItems)}
            {couponItems !== undefined
              ? couponItems.map((child, index) => (
                  <Grid
                    item
                    sm={3}
                    key={child.couponName}
                    style={{
                      padding: '10px 10px 10px 10px',
                      width: 200,
                      height: 100,
                      overflowWrap: 'break-word',
                      padding: 10,
                      marginTop: 20,
                    }}
                  >
                    {console.log('child = ', child)}
                    <Card
                      onClick={() => {
                        DialogEditCouponRef.current.openDialog();
                        setIdforEdit(index);
                        setData(couponItems[index]);
                      }}
                      style={{
                        boxShadow: '0 0 0 0.15rem #6a6a6a',
                        background: 'white',
                        borderRadius: '12px',
                        padding: 5,
                        paddingBottom: 15,
                        cursor: 'pointer',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                          display: 'flex',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {child.couponName}
                      </Typography>
                      {console.log(
                        'child.couponCut :',
                        child.couponCut,
                        'child.couponDetail :',
                        child.couponDetail
                      )}
                      <Typography
                        style={{
                          marginTop: '2%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'green',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        ส่วนลดเมื่อ {child.couponDetail}
                      </Typography>
                      <Typography
                        style={{
                          marginTop: '2%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'red',
                          fontWeight: 600,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {child.couponType === true ? (
                          <Typography>{child.couponAmount} %</Typography>
                        ) : (
                          <Typography>{child.couponAmount} บาท</Typography>
                        )}
                      </Typography>
                    </Card>
                  </Grid>
                ))
              : []}
          </Grid>
        </Card>
      </div>
      <Snackbar open={props.UI.sending} autoHideDuration={2000}>
        <Alert severity="success">ADD COUPON SUCCESS !!</Alert>
      </Snackbar>

      <Snackbar open={props.UI.cantSending} autoHideDuration={2000}>
        <Alert severity="error">DELETE COUPON SUCCESS</Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  coupon: state.coupon,
  UI: state.UI,
});

const mapActionsToProps = {
  getAllCoupon,
  addCoupon,
  deleteCoupon,
};

export default connect(mapStateToProps, mapActionsToProps)(CouponPage);
