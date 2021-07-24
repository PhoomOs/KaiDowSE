import { Card, Grid, GridList, Typography } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { getAllOrder } from '../redux/action/orderAction';
import { connect } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import '../collection/table.css';
import socket from '../util/socket-io';
import { kitchenChange } from '../redux/action/kitchenAction';
import {
  orderChange,
  orderMenuChange,
  changeBillList,
} from '../redux/action/orderAction';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from '@material-ui/core';
import useDialog from '../hooks/useDialog';
import { editOrder, deleteOrder } from '../redux/action/orderAction';
const OrderChangeBill = (props) => {
  // const socketRef = useRef();
  const [orderLists, setOrderLists] = useState([]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [changeBillList, setChangeBillList] = useState([]);
  const [open, openDialog, closeDialog] = useDialog();
  const [selectedItem, setSelectedItem] = useState('');
  const [list, setList] = useState([]);
  // useEffect(() => {
  //   socketRef.current = new socket();
  //   return () => {
  //     console.log('unmount orderList');
  //     socketRef.current.unListeningKitchen();
  //   };
  // }, []);
  useEffect(() => {
    console.log('orders = ', props.orders);
    setList(props.orders.changeBillList.payload);
    setIsCheckAll(props.orders.changeBillList.isCheckAll);
    setOrderLists(
      props.orders.orderItems.filter(
        (order) => order.id != props.match.params.path.split(':')[1]
      )
    );

    props.changeBillList({ type: null, payload: [], isCheckAll: false });
  }, [props.orders.orderItems]);

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

  const handleMergeOrder = () => {
    console.log('selectedItem id = ', selectedItem);
    console.log('isAll = ', isCheckAll);
    console.log('list = ', list);
    let targetOrder = props.orders.orderItems.filter(
      (order) => order.id === selectedItem
    )[0];
    let oldOrder = props.orders.orderItems.filter(
      (order) => order.id === props.match.params.path.split(':')[1]
    )[0];
    console.log('oldOrder = ', oldOrder);
    console.log('targetOrder = ', targetOrder);
    let changeOldMenu = oldOrder.menuItems;
    let newMenu = [];
    let changeMenu = [];
    if (isCheckAll) {
      console.log('changeOldMenu = ', changeOldMenu);
      props.editOrder({
        ...targetOrder,
        menuItems: [...targetOrder.menuItems, ...changeOldMenu],
        totalPrice: [...targetOrder.menuItems, ...changeOldMenu].reduce(
          (prev, cur) => {
            prev += cur.totalPrice;
            if (cur.quantity != 0) {
              prev += cur.addOn.reduce((prev1, cur1) => {
                if (cur1.quantity != 0) {
                  prev1 += cur1.totalPrice;
                }
                return prev1;
              }, 0);
            }

            return prev;
          },
          0
        ),
      });
      props.deleteOrder({ id: oldOrder.id });
    } else {
      oldOrder.menuItems.map((menu) => {
        let added = true;
        list.map((id) => {
          if (id === menu.id) {
            added = false;
            newMenu.push(menu);
          }
        });
        if (added) {
          changeMenu.push(menu);
        }
      });

      props.editOrder({
        ...oldOrder,
        menuItems: changeMenu,
        totalPrice: changeMenu.reduce((prev, cur) => {
          prev += cur.totalPrice;
          if (cur.quantity != 0) {
            prev += cur.addOn.reduce((prev1, cur1) => {
              if (cur1.quantity != 0) {
                prev1 += cur1.totalPrice;
              }
              return prev1;
            }, 0);
          }

          return prev;
        }, 0),
      });
      props.editOrder({
        ...targetOrder,
        menuItems: [...targetOrder.menuItems, newMenu],
        totalPrice: newMenu.reduce((prev, cur) => {
          prev += cur.totalPrice;
          if (cur.quantity != 0) {
            prev += cur.addOn.reduce((prev1, cur1) => {
              if (cur1.quantity != 0) {
                prev1 += cur1.totalPrice;
              }
              return prev1;
            }, 0);
          }

          return prev;
        }, 0),
      });
    }
    props.history.push('/mainNav/orderManage');
    closeDialog();
  };

  return (
    <div class="roottable">
      {console.log('orderList = ', orderLists)}
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
          เลือกโต๊ะที่จะจัดการ
        </Typography>
        <Dialog open={open} onClose={closeDialog}>
          <DialogContent>
            <Grid>
              <Typography>ยืนยันการรวมบิล</Typography>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog()} color="primary">
              ยกเลิก
            </Button>
            <Button
              onClick={() => handleMergeOrder()}
              color="primary"
              autoFocus
            >
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
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
              <Grid
                class="card"
                a-key={child.id}
                onClick={(e) => {
                  setSelectedItem(e.target.getAttribute('a-key'));
                  openDialog();
                }}
              >
                <Grid
                  style={{ zIndex: 99, position: 'absolute' }}
                  a-key={child.id}
                >
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
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '2%',
                      marginRight: 20,
                      width: 200,
                    }}
                    a-key={child.id}
                  >
                    เวลา : {child.time}
                    <br />
                    ราคา : {child.totalPrice} บาท
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </GridList>
        </Card>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order,
  user: state.user,
});

const mapActionsToProps = {
  kitchenChange,
  orderChange,
  orderMenuChange,
  changeBillList,
  deleteOrder,
  editOrder,
};

export default connect(mapStateToProps, mapActionsToProps)(OrderChangeBill);
