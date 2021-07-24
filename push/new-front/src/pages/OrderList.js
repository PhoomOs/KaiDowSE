import React, { useEffect, useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar2 from '../components/navbar2';
import {
  Grid,
  Card,
  Button,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  GridListTile,
  GridListTileBar,
  GridList,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';
import kaidowlogo from '../img/kaidowlogo.png';
import Delete from '@material-ui/icons/Delete';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import Warning from '@material-ui/icons/Warning';
import '../collection/iconfollow.css';
import Add from '@material-ui/icons/Add';
import DialogEditTable from '../components/DialogEditTable';
import DialogDeleteTable from '../components/DialogDeleteTable';
import { getAllOrder } from '../redux/action/orderAction';
import { connect } from 'react-redux';
import socket from '../util/socket-io';
import { deleteOrder } from '../redux/action/orderAction';
import KitchenOrderDialog from '../components/KirchenOrderDialog';

import {
  sortKitchen,
  kitchenChange,
  setKitchenData,
} from '../redux/action/kitchenAction';
import {
  orderChange,
  orderMenuChange,
  changeBillList,
  addOrder,
  editOrder,
} from '../redux/action/orderAction';
import '../collection/table.css';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f9fafd',
  },
  card: {
    marginRight: 20,
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: '#EBE5E5',
    borderRadius: '12px',
    backgroundColor: '#EBE5E5',
    '&:hover': {
      borderStyle: 'solid',
      borderColor: '#FFCE3C',
    },
  },
}));
const OrderList = (props) => {
  const socketRef = useRef();
  const DialogKitchenOrderRef = useRef();
  const DialogEditTableRef = useRef();
  const DialogDeleteTableRef = useRef();
  const classes = useStyles();
  const [orderLists, setOrderLists] = useState([]);
  const [delM, setDelM] = useState(false);
  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);

  // useEffect(() => {
  //   socketRef.current = new socket();
  //   return () => {
  //     console.log('unmount orderList');
  //     socketRef.current.unListeningKitchen();
  //   };
  // }, []);

  // useEffect(() => {
  //   // console.log('store = ', props.user.store);
  //   if (props.user.store !== undefined) {
  //     // console.log('setDetail');
  //     socketRef.current.setDetail(
  //       props.user.store,
  //       props.kitchenChange,
  //       props.orderChange,
  //       props.orderMenuChange
  //     );
  //     socketRef.current.listeningKitchen();
  //   }
  // }, [props.user.store]);

  useEffect(() => {
    setOrderLists(props.orders.orderItems);
  }, [props.orders]);

  const handleOpenEdit = () => {
    setEdit(true);
  };
  const handleDelMode = () => {
    delM ? setDelM(false) : setDelM(true);
  };
  const onDelete = (id) => {
    props.deleteOrder({ id: id });
    handleDelMode();
  };

  return (
    <div class={classes.root}>
      <KitchenOrderDialog
        ref={DialogKitchenOrderRef}
        lists={props.lists}
        sortKitchen={props.sortKitchen}
        kitchenChange={props.kitchenChange}
        setKitchenData={props.setKitchenData}
        user={props.user}
        socketRef={props.socket}
      />

      <Button
        onClick={() => {
          props.history.push('/mainNav/editOrder');
        }}
        id="myBtn"
      >
        <Add />
      </Button>
      <Button
        id={props.lists[2].cards.length ? 'myOBtn' : 'myOBtnnot'}
        title="create-menu"
        onClick={() => DialogKitchenOrderRef.current.openDialog()}
      >
        <Warning />
        order
      </Button>
      <Button onClick={handleDelMode} id="myDBtn">
        {delM ? <DeleteForever /> : <Delete />}
      </Button>
      <Grid style={{ marginTop: '7%' }}>
        <Card>
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
            เลือกโต๊ะที่จะจัดการ
          </Typography>
          <DialogDeleteTable ref={DialogDeleteTableRef} onDelete={onDelete} />
          <DialogEditTable
            ref={DialogEditTableRef}
            history={props.history}
            changeBillList={props.changeBillList}
            addOrder={props.addOrder}
            editOrder={props.editOrder}
          />
          {delM ? (
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
                {orderLists.map((child, index) => (
                  // open del dialog here eiei
                  <div
                    a-key={child.id}
                    class="card"
                    onClick={(event) =>
                      DialogDeleteTableRef.current.openDialog(
                        event.target.getAttribute('a-key')
                      )
                    }
                  >
                    <Grid a-key={child.id}>
                      <Grid
                        style={{ zIndex: 99, position: 'absolute' }}
                        a-key={child.id}
                      >
                        <Remove
                          style={{
                            position: 'absolute',
                            marginLeft: 155,
                            marginTop: 5,
                            height: 36,
                            width: 36,
                            color: '#6a6a6a',
                          }}
                          a-key={child.id}
                        />
                        {/* <Typography
                          a-key={child.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20%',
                          }}
                        > */}
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: 18,
                            margin: '5px 0px 20px 5px',
                          }}
                          a-key={child.id}
                        >
                          โต๊ะที่ : {child.type}
                        </Typography>
                        <Typography
                          a-key={child.id}
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
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </GridList>
            </Card>
          ) : (
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
                {orderLists.map((child, index) => (
                  <div
                    class="card"
                    a-key={child.id}
                    onClick={(event) => {
                      // console.log(
                      //   'click id  = ',
                      //   event.target.getAttribute('a-key')
                      // );
                      if (event.target.getAttribute('a-key') != null) {
                        DialogEditTableRef.current.openDialog(
                          orderLists.filter(
                            (order) =>
                              order.id === event.target.getAttribute('a-key')
                          )[0]
                        );
                      }
                    }}
                  >
                    {/* <Card
                      onClick={(event) => {
                        DialogEditTableRef.current.openDialog(
                          orderLists.filter(
                            (order) =>
                              order.id == event.target.getAttribute('a-key')
                          )[0]
                        );
                      }}
                      class={classes.card}
                      a-key={child.id}
                    > */}
                    <Grid>
                      <Grid
                        a-key={child.id}
                        style={{ zIndex: 99, position: 'absolute' }}
                      >
                        <img
                          src={kaidowlogo}
                          style={{
                            position: 'absolute',
                            marginLeft: 155,
                            marginTop: 5,
                            height: 36,
                            width: 36,
                          }}
                          a-key={child.id}
                        />

                        <Typography
                          a-key={child.id}
                          style={{
                            fontWeight: 600,
                            fontSize: 18,
                            margin: '5px 0px 20px 5px',
                          }}
                        >
                          โต๊ะที่ : {child.type}
                        </Typography>
                        <Typography
                          a-key={child.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '2%',
                            marginRight: 20,
                            width: 200,
                            fontWeight: '400',
                          }}
                        >
                          เวลา : {child.time}
                          <br />
                          ราคา : {child.totalPrice} บาท
                          <br />
                          จำนวนคน : {child.guest} คน
                        </Typography>
                      </Grid>

                      {(() => {
                        if (child.status === 0) {
                          return <div class="liquid0" />;
                        } else if (child.status > 0 && child.status <= 10) {
                          return <div class="liquid10" />;
                        } else if (child.status > 10 && child.status <= 20) {
                          return <div class="liquid20" />;
                        } else if (child.status > 20 && child.status <= 30) {
                          return <div class="liquid30" />;
                        } else if (child.status > 30 && child.status <= 40) {
                          return <div class="liquid40" />;
                        } else if (child.status > 40 && child.status <= 50) {
                          return <div class="liquid50" />;
                        } else if (child.status > 50 && child.status <= 60) {
                          return <div class="liquid60" />;
                        } else if (child.status > 60 && child.status <= 70) {
                          return <div class="liquid70" />;
                        } else if (child.status > 70 && child.status <= 80) {
                          return <div class="liquid80" />;
                        } else if (child.status > 80 && child.status <= 90) {
                          return <div class="liquid90" />;
                        } else if (child.status > 90 && child.status <= 99) {
                          return <div class="liquid99" />;
                        } else if (child.status == 100) {
                          return <div class="liquid100" />;
                        }
                      })()}
                    </Grid>
                    {/* </Card> */}
                  </div>
                ))}
              </GridList>
            </Card>
          )}
        </Card>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order,
  lists: state.kitchen,
  user: state.user,
});

const mapActionsToProps = {
  getAllOrder,
  deleteOrder,
  sortKitchen,
  kitchenChange,
  setKitchenData,
  setKitchenData,
  orderChange,
  orderMenuChange,
  changeBillList,
  addOrder,
  editOrder,
};

export default connect(mapStateToProps, mapActionsToProps)(OrderList);
