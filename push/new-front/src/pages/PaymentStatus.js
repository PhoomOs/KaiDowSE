import { Card, Grid, GridList, Typography } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { getAllOrder } from '../redux/action/orderAction';
import { connect } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import '../collection/table.css';
import socket from '../util/socket-io';
import { kitchenChange } from '../redux/action/kitchenAction';
import { orderChange, orderMenuChange } from '../redux/action/orderAction';

const PaymentStatus = (props) => {
  const [paymentLists, setPaymentLists] = useState([]);

  useEffect(() => {
    setPaymentLists(props.log.logs);
    console.log('data = ', props.log.logs);
  }, [props.log.logs]);

  return (
    <div class="roottable">
      {console.log('orderList = ', paymentLists)}
      <Card style={{ marginTop: '7%' }}>
        <Typography
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#FFCE3C',
            fontSize: 18,
            fontWeight: 600,
            color: 'white',
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          การชำระเงิน
        </Typography>
        <Card>
          <GridList
            cols={5}
            style={{
              margin: '40px 0px 10px 10px',
              width: 1000,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {paymentLists.map((child, index) =>
              !child.paymentStatus ? (
                <Grid class="card">
                  {console.log('!no child = ', child)}
                  <Grid style={{ zIndex: 99, position: 'absolute' }}>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        margin: '5px 0px 20px 5px',
                      }}
                    >
                      โต๊ะที่ : {child.type}
                    </Typography>
                    <Typography
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '2%',
                        marginRight: 20,
                        width: 200,
                      }}
                    >
                      เวลา : {child.time}
                      <br />
                      ราคา : {child.totalPrice} บาท
                      <br />
                      ประเภท : {child.orderType}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid class="cardCheck">
                  <Grid style={{ zIndex: 99, position: 'absolute' }}>
                    <div class="cardDance">
                      <CheckCircleOutlineIcon
                        style={{
                          position: 'absolute',
                          marginLeft: 155,
                          marginTop: 5,
                          height: 36,
                          width: 36,
                          color: '#119418',
                        }}
                      />
                    </div>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        margin: '5px 0px 20px 5px',
                      }}
                    >
                      โต๊ะที่ : {child.type}
                    </Typography>
                    <Typography
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '2%',
                        marginRight: 20,
                        width: 200,
                      }}
                    >
                      เวลา : {child.time}
                      <br />
                      ราคา : {child.totalPrice} บาท
                      <br />
                      ประเภท :{' '}
                      {child.orderType === 'cash' ? 'เงินสด' : 'ออนไลน์'}
                    </Typography>
                  </Grid>
                </Grid>
              )
            )}
          </GridList>
        </Card>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  log: state.log,
});

const mapActionsToProps = {
  kitchenChange,
  orderChange,
  orderMenuChange,
};

export default connect(mapStateToProps, mapActionsToProps)(PaymentStatus);
