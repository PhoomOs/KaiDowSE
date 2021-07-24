import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuNav2 from '../components/navbar2';
import sangusa from '../img/sangusa.jpg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {
  AddCircleOutline,
  ArrowLeft,
  ArrowRight,
  RemoveCircleOutline,
  SentimentDissatisfied,
} from '@material-ui/icons/';
import Script from 'react-load-script';

import {
  Grid,
  IconButton,
  Paper,
  Card,
  Tab,
  Tabs,
  GridListTile,
  GridListTileBar,
  GridList,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';
import { Children } from 'react';
import { getAllMenuItems } from '../redux/action/menuAction';
import { connect } from 'react-redux';
import DialogOrderAddMenu from '../components/DialogOrderAddMenu';
import { addOrder, editOrder } from '../redux/action/orderAction';
import { v4 as uuidv4 } from 'uuid';
import CalculatorDialog from '../components/calcalatorDialog';
import { createInternetBankingCharge } from '../redux/action/paymentAction';
import DialogEditCoupon from '../components/DialogEditCoupon';
let OmiseCard;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600',
    marginTop: '64px',
    display: 'flex',
    justifyContent: 'center',
  },
}));
const handleScriptLoad = () => {
  OmiseCard = window.OmiseCard;
  OmiseCard.configure({
    publicKey: 'pkey_test_5ng41excf04yhtn90yj',
    currency: 'thb',
    frameLabel: 'sabai shop',
    submitLabel: 'Pay Now',
    // buttonLabel: 'Pay with Omise',
  });
};

const btnstyle = {
  borderColor: '#ffc107',
  marginTop: '20px',
};

const CheckoutOrder = (props) => {
  const [order, setOrder] = useState({});
  const [priceSummary, setPriceSummary] = useState(0);
  const dialogRef = useRef();
  const DialogEditCouponRef = useRef();

  // For Couponnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  const [data, setData] = useState([]);

  const [couponItems, setCouponItems] = useState();

  const [idforEdit, setIdforEdit] = useState('');
  const [currentId, setCurrentId] = useState('');

  const [stateDialog, setStateDialog] = useState(0);
  // const [couponDicount, setCouponDicount] = useState('');

  // value for discount
  const [price, setPrice] = useState(0);
  const [typeCoupon, setTypeCoupon] = useState(null);

  const [defaultPrice, setDefaultPrice] = useState(0);
  useEffect(() => {
    let id = props.match.params.path.split(':')[1];
    ///////////////////////
    // setSummary(props.)
    setCurrentId(id);

    if (id != undefined) {
      let order = props.order.orderItems.filter((order) => order.id === id)[0];

      setOrder(order);
      setPriceSummary(order.totalPrice);
      setDefaultPrice(order.totalPrice);
    } else {
      props.history.push('/mainNav/kitchenOrder');
    }
  }, []);
  useEffect(() => {
    setCouponItems(props.coupon.coupons);
  }, [props.coupon]);

  const testSSE = () => {
    OmiseCard.open({
      amount: 12345,
      currency: 'THB',
      defaultPaymentMethod: 'internet_banking',
      onCreateTokenSuccess: (token) => {
        props.createInternetBankingCharge(
          'test@test.com',
          'zxas',
          12345,
          token,
          'menumanage'
        );
      },
    });
  };

  const handleRemoveCoupon = () => {
    setTypeCoupon(null);
    setPrice(0);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '40px',
      }}
    >
      {/* {console.log('order = ', order)} */}
      {typeCoupon === null ? (
        <>
          <DialogEditCoupon
            ref={DialogEditCouponRef}
            couponData={data}
            dialogState={'show'}
            setPrice={setPrice}
            setTypeCoupon={setTypeCoupon}
            PriceSummary={defaultPrice}
            setPriceSummary={setPriceSummary}

            // setCouponDicount={setCouponDicount}
          />
        </>
      ) : (
        <>
          <DialogEditCoupon
            ref={DialogEditCouponRef}
            couponData={data}
            dialogState={'show'}
            setPrice={setPrice}
            setTypeCoupon={setTypeCoupon}
            PriceSummary={priceSummary}
            setPriceSummary={setPriceSummary}
            // setCouponDicount={setCouponDicount}
          />
        </>
      )}

      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
      {typeCoupon === null ? (
        <>
          <CalculatorDialog
            ref={dialogRef}
            priceSummary={defaultPrice}
            currentId={currentId}
            history={props.history}
            handleResetTab={props.handleResetTab}
            orderId={order.id}
            store={props.user.store}
          />
        </>
      ) : (
        <>
          <CalculatorDialog
            ref={dialogRef}
            priceSummary={priceSummary}
            currentId={currentId}
            history={props.history}
            handleResetTab={props.handleResetTab}
            orderId={order.id}
            store={props.user.store}
          />
        </>
      )}
      <div
        style={{
          backgroundColor: '#f9fafd',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            height: 'auto',
            width: '800px',
            padding: 40,
          }}
        >
          <Grid container spacing={3}>
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
                          fontSize: 16,
                          display: 'flex',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {child.couponName}
                      </Typography>
                      <Typography
                        style={{
                          marginTop: '2%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'green',
                        }}
                      >
                        {child.couponDetail}
                      </Typography>
                      <Typography
                        style={{
                          marginTop: '2%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'red',
                          fontWeight: 400,
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

      <div style={{ marginRight: '40px' }}>
        <Card
          style={{
            padding: '10px 10px 10px 10px',
            borderStyle: 'solid',
            borderColor: 'black',
            height: '600px',
            width: 550,
            borderRadius: 8,
          }}
        >
          {'รายการอาหาร'}

          {order.menuItems !== undefined
            ? order.menuItems.map((menu) => (
                <Card
                  style={{
                    padding: 10,
                    margin: '10px 5px',
                    fontFamily: 'Athiti',
                    backgroundColor: '#f9fafd',
                  }}
                >
                  <div style={{ margin: '10px 10px' }}>
                    <h3>
                      {menu.name +
                        '   จำนวน   ' +
                        menu.quantity +
                        '   ราคา   ' +
                        menu.totalPrice}
                      &nbsp;บาท
                    </h3>

                    {menu.addOn.map((addOn) => (
                      <h4>
                        {addOn.name +
                          '   จำนวน  ' +
                          addOn.quantity +
                          '  ราคา  ' +
                          addOn.totalPrice}
                        &nbsp;บาท
                      </h4>
                    ))}
                  </div>
                </Card>
              ))
            : console.log()}

          {/*  You can insert status for show button and total Price around here prom za  */}

          {typeCoupon === null ? (
            <>
              {/* {setFinalPrice(order.totalPrice)} */}
              <Typography
                variant="h4"
                style={{ fontFamily: 'Athiti', fontWeight: 600, marginTop: 20 }}
              >
                {' '}
                ราคารวม : {defaultPrice}
              </Typography>
            </>
          ) : typeCoupon === false ? (
            <>
              <Typography variant="h4"> ราคารวม: {priceSummary}</Typography>
              <Button
                onClick={handleRemoveCoupon}
                style={{ backgroundColor: 'red', color: 'white' }}
                fullWidth
              >
                Remove Coupon
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4">
                ราคารวม: {priceSummary.toFixed(2)}
              </Typography>
              <Button
                onClick={handleRemoveCoupon}
                style={{ backgroundColor: 'red', color: 'white' }}
                fullWidth
              >
                Remove Coupon
              </Button>
            </>
          )}

          <Button
            onClick={() => dialogRef.current.openDialog()}
            variant="outlined"
            style={{
              borderColor: '#ffc107',
              marginTop: '20px',
              width: '30%',
              marginLeft: '35%',
              fontSize: 20,
            }}
          >
            ชำระเงิน
          </Button>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu,
  UI: state.UI,
  order: state.order,
  payment: state.payment,
  coupon: state.coupon,
  user: state.user,
});

const mapActionsToProps = {
  getAllMenuItems,
  addOrder,
  editOrder,
  createInternetBankingCharge,
};

export default connect(mapStateToProps, mapActionsToProps)(CheckoutOrder);
