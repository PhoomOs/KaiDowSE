import React, {
  useState,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import OrderManage from '../pages/OrderManage';
import {
  Grid,
  Button,
  Typography,
  Link,
  Card,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';

import '../collection/iconfollow.css';
import useDialog from '../hooks/useDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRight from '@material-ui/icons/ArrowRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
// import Calculator from './kitchenOrder/calcalatorDialog';
const useStyles = makeStyles((theme) => ({
  card: {
    // marginRight:20,
    width: 'auto',
    minWidth: '270px',
    height: 'auto',
    margin: '10px 10px 10px 10px',
    borderRadius: '12px',
    backgroundColor: '#EBE5E5',
    padding: 3,
  },
  cardDetail: {
    // marginRight:20,
    width: 'auto',
    minWidth: '230px',
    height: 'auto',
    margin: '20px 30px 10px 30px',
    borderRadius: '12px',
    backgroundColor: '#EBE5E5',
    padding: 5,
  },
}));
const DialogEditTable = (props, ref) => {
  const classes = useStyles();
  const [open, openDialog, closeDialog] = useDialog();
  const [value, setValue] = useState(0);
  const [more, setMore] = useState(null);
  const [detail, setDetail] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedList, setSelectedList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleCloseAddItem = () => {
    closeDialog();
  };
  useImperativeHandle(ref, () => ({
    openDialog: (data) => {
      handleResetState();
      setDetail(data);
      return openDialog();
    },
    closeDialog: () => closeDialog(),
  }));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleClickMore = (event) => {
    setMore(event.currentTarget);
  };
  const handleCloseMore = () => {
    setMore(null);
  };
  const handleResetState = () => {
    setSelectedList([]);
    setIsCheckAll(false);
    setValue(0);
  };
  const handleSplitOrder = () => {
    // console.log('call handleSplit!!');
    console.log('order = ', detail);
    console.log('list = ', selectedList);
    // console.log('all = ', isCheckAll);
    // current [ 1,2,3,4]  other = [3,4]
    //                            1
    if (selectedList.length === detail.menuItems.length) {
      console.log('CANTTTTTTTTTT');
    } else {
      if (selectedList.length != 0) {
        let changeMenu = [];
        let newMenu = [];
        detail.menuItems.map((menu) => {
          let added = true;
          selectedList.map((id) => {
            if (id === menu.id) {
              added = false;
              newMenu.push(menu);
            }
          });
          if (added) {
            changeMenu.push(menu);
          }
        });
        // console.log('ChangeMenu = ', changeMenu);
        // console.log('newMenu = ', newMenu);

        let changeOrder = { ...detail, menuItems: changeMenu };
        let newOrder = { ...detail, id: uuidv4(), menuItems: newMenu };
        console.log('changeOrder = ', changeOrder);
        console.log('newOrder = ', newOrder);
        props.addOrder({
          ...newOrder,
          totalPrice: newOrder.menuItems.reduce((prev, cur) => {
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
          ...changeOrder,
          totalPrice: changeOrder.menuItems.reduce((prev, cur) => {
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
        handleResetState();
        closeDialog();
      } else {
        console.log('please Select');
      }
    }
  };
  const handleMergeOrder = () => {
    if (selectedList.length != 0) {
      props.changeBillList({
        type: 'merge',
        payload: selectedList,
        isCheckAll: selectedList.length === detail.menuItems.length,
      });
      props.history.push(`/mainNav/orderChangeBill:${detail.id}`);
      handleResetState();
      closeDialog();
    } else {
      console.log('CANT!!');
    }
  };
  const renders = useCallback(() => {
    if (open && detail != undefined) {
      switch (value) {
        case 0:
          return (
            <div>
              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <Card class={classes.card}>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      รายการอาหาร
                    </Typography>
                    <Grid
                      container
                      style={{
                        fontSize: 10,
                        textAlign: 'center',
                        fontFamily: 'Athiti',
                        marginBottom: 2,
                      }}
                    >
                      <Grid item sm={6} style={{ marginTop: 1 }}>
                        ทั้งหมด
                      </Grid>
                      <Grid
                        item
                        sm={3}
                        style={{ paddingRight: '8%', marginTop: 1 }}
                      >
                        จำนวน
                      </Grid>
                      <Grid item sm={3} style={{ marginTop: 1 }}>
                        ราคา
                      </Grid>
                    </Grid>

                    {detail.menuItems.map((child, index) => {
                      return (
                        <Grid>
                          {/* {console.log('child = ', child)} */}
                          <List>
                            <ListItem>
                              <ListItemText>
                                <Typography
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: 100,
                                  }}
                                >
                                  {child.name}
                                </Typography>
                              </ListItemText>
                              <ListItemSecondaryAction>
                                <Grid style={{ display: 'flex' }}>
                                  <Typography
                                    style={{
                                      textAlign: 'right',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      fontSize: 16,
                                      width: 60,
                                      paddingRight: '10%',
                                    }}
                                  >
                                    {child.quantity}
                                  </Typography>
                                  <Typography
                                    style={{
                                      textAlign: 'right',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      fontSize: 16,
                                      width: 60,
                                    }}
                                  >
                                    {child.price.price}
                                  </Typography>
                                </Grid>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          {child.addOn.map((topping) => {
                            return (
                              <List>
                                <ListItem style={{ marginLeft: '1%' }}>
                                  <ArrowRight fontSize="medium" />
                                  <ListItemText>
                                    <Typography
                                      style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        width: 80,
                                      }}
                                    >
                                      {topping.name}
                                    </Typography>
                                  </ListItemText>
                                  <ListItemSecondaryAction>
                                    <Grid style={{ display: 'flex' }}>
                                      <Typography
                                        style={{
                                          textAlign: 'right',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontSize: 16,
                                          width: 60,
                                          paddingRight: '10%',
                                        }}
                                      >
                                        {topping.quantity}
                                      </Typography>
                                      <Typography
                                        style={{
                                          textAlign: 'right',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontSize: 16,
                                          width: 60,
                                        }}
                                      >
                                        {topping.totalPrice}
                                      </Typography>
                                    </Grid>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              </List>
                            );
                          })}
                        </Grid>
                      );
                    })}
                  </Card>
                </Grid>
                <Grid item sm={6}>
                  <Card
                    style={{
                      marginTop: '5%',
                      textAlign: 'center',
                      width: '200px',
                      marginLeft: '15%',
                      height: '20%',
                      boxShadow: '0px 0px 0px 3px #FFC107',
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginTop: '6.5%',
                      }}
                    >
                      แก้ไขโต๊ะ
                    </Typography>
                  </Card>
                  <Card class={classes.cardDetail}>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      เบอร์โต๊ะ : {detail.type}
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      ราคารวม : {detail.totalPrice} บาท
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      เวลา : {detail.time}
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      จำนวนท่าน : {detail.guest} ท่าน
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
        case 1:
          return (
            <div>
              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <Card class={classes.card}>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      รายการอาหาร
                    </Typography>
                    <Grid
                      container
                      style={{
                        fontSize: 10,
                        textAlign: 'center',
                        fontFamily: 'Athiti',
                      }}
                    >
                      <Grid item sm={6}>
                        <input
                          a-key={'ALL'}
                          type="checkbox"
                          style={{
                            marginRight: 10,
                            borderRadius: 10,
                            borderColor: '#e5e5e5',
                          }}
                          disabled={true}
                          onChange={(e) => {
                            setIsCheckAll((prev) => !prev);
                          }}
                        />
                        ทั้งหมด
                      </Grid>
                      <Grid
                        item
                        sm={3}
                        style={{
                          paddingRight: '8%',
                          marginTop: '0.8%',
                        }}
                      >
                        จำนวน
                      </Grid>
                      <Grid item sm={3} style={{ marginTop: '0.8%' }}>
                        ราคา
                      </Grid>
                    </Grid>

                    {detail.menuItems.map((child, index) => {
                      return (
                        <Grid>
                          <List>
                            <ListItem>
                              <ListItemText
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <Typography
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: 110,
                                  }}
                                >
                                  <input
                                    a-key={child.id}
                                    type="checkbox"
                                    style={{ marginRight: 10 }}
                                    disabled={isCheckAll}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedList((prev) => [
                                          ...prev,
                                          e.target.getAttribute('a-key'),
                                        ]);
                                      } else {
                                        setSelectedList(
                                          selectedList.filter(
                                            (id) =>
                                              id !=
                                              e.target.getAttribute('a-key')
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  {child.name}
                                </Typography>
                              </ListItemText>
                              <ListItemSecondaryAction>
                                <Grid style={{ display: 'flex' }}>
                                  <Typography
                                    style={{
                                      fontSize: 16,
                                      textAlign: 'right',
                                      width: 60,
                                      paddingRight: '10%',
                                    }}
                                  >
                                    {child.quantity}
                                  </Typography>
                                  <Typography
                                    style={{
                                      textAlign: 'right',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      fontSize: 16,
                                      width: 60,
                                    }}
                                  >
                                    {child.totalPrice}
                                  </Typography>
                                </Grid>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          {child.addOn.map((topping) => {
                            return (
                              <List>
                                <ListItem style={{ marginLeft: '1%' }}>
                                  <ArrowRight fontSize="medium" />
                                  <ListItemText>
                                    <Typography
                                      style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        width: 80,
                                      }}
                                    >
                                      {topping.name}
                                    </Typography>
                                  </ListItemText>
                                  <ListItemSecondaryAction>
                                    <Grid style={{ display: 'flex' }}>
                                      <Typography
                                        style={{
                                          textAlign: 'right',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontSize: 16,
                                          width: 60,
                                          paddingRight: '10%',
                                        }}
                                      >
                                        {topping.quantity}
                                      </Typography>
                                      <Typography
                                        style={{
                                          textAlign: 'right',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontSize: 16,
                                          width: 60,
                                        }}
                                      >
                                        {topping.totalPrice}
                                      </Typography>
                                    </Grid>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              </List>
                            );
                          })}
                        </Grid>
                      );
                    })}
                  </Card>
                </Grid>
                <Grid item sm={6}>
                  <Card
                    style={{
                      marginTop: '5%',
                      textAlign: 'center',
                      width: '200px',
                      marginLeft: '15%',
                      height: '20%',
                      boxShadow: '0px 0px 0px 3px #968787',
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginTop: '10%',
                      }}
                    >
                      แยกบิล
                    </Typography>
                  </Card>
                  <Card class={classes.cardDetail}>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      เบอร์โต๊ะ : {detail.type}
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      ราคารวม : {detail.totalPrice} บาท
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      เวลา : {detail.time}
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      จำนวนท่าน : {detail.guest} ท่าน
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
        case 2:
          return (
            <div>
              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <Card class={classes.card}>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      รายการอาหาร
                    </Typography>
                    <Grid
                      container
                      style={{
                        fontSize: 10,
                        textAlign: 'center',
                        fontFamily: 'Athiti',
                      }}
                    >
                      <Grid item sm={6}>
                        <input
                          a-key={'ALL'}
                          type="checkbox"
                          style={{
                            marginRight: 10,
                            borderRadius: 10,
                            borderColor: '#fff',
                          }}
                          onChange={(e) => {
                            setIsCheckAll((prev) => !prev);
                          }}
                        />
                        ทั้งหมด
                      </Grid>
                      <Grid
                        item
                        sm={3}
                        style={{
                          paddingRight: '8%',
                          marginTop: '0.8%',
                        }}
                      >
                        จำนวน
                      </Grid>
                      <Grid item sm={3} style={{ marginTop: '0.8%' }}>
                        ราคา
                      </Grid>
                    </Grid>
                    {detail.menuItems.map((child, index) => {
                      return (
                        <Grid>
                          <List>
                            <ListItem>
                              <ListItemText
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <Typography
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: 110,
                                  }}
                                >
                                  <input
                                    a-key={child.id}
                                    type="checkbox"
                                    style={{ marginRight: 10 }}
                                    disabled={isCheckAll}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedList((prev) => [
                                          ...prev,
                                          e.target.getAttribute('a-key'),
                                        ]);
                                      } else {
                                        setSelectedList(
                                          selectedList.filter(
                                            (id) =>
                                              id !=
                                              e.target.getAttribute('a-key')
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  {child.name}
                                </Typography>
                              </ListItemText>
                              <ListItemSecondaryAction>
                                <Grid style={{ display: 'flex' }}>
                                  <Typography
                                    style={{
                                      fontSize: 16,
                                      textAlign: 'right',
                                      width: 60,
                                      paddingRight: '10%',
                                    }}
                                  >
                                    {child.quantity}
                                  </Typography>
                                  <Typography
                                    style={{
                                      textAlign: 'right',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      fontSize: 16,
                                      width: 60,
                                    }}
                                  >
                                    {child.totalPrice}
                                  </Typography>
                                </Grid>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          {child.addOn.map((topping) => {
                            return (
                              <List>
                                <ListItem style={{ marginLeft: '1%' }}>
                                  <ArrowRight fontSize="medium" />
                                  <ListItemText>
                                    <Typography
                                      style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        width: 80,
                                      }}
                                    >
                                      {topping.name}
                                    </Typography>
                                  </ListItemText>
                                  <ListItemSecondaryAction>
                                    <Grid style={{ display: 'flex' }}>
                                      <Typography
                                        style={{
                                          textAlign: 'right',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontSize: 16,
                                          width: 60,
                                          paddingRight: '10%',
                                        }}
                                      >
                                        {topping.quantity}
                                      </Typography>
                                      <Typography
                                        style={{
                                          textAlign: 'right',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontSize: 16,
                                          width: 60,
                                        }}
                                      >
                                        {topping.totalPrice}
                                      </Typography>
                                    </Grid>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              </List>
                            );
                          })}
                        </Grid>
                      );
                    })}
                  </Card>
                </Grid>
                <Grid item sm={6}>
                  <Card
                    style={{
                      marginTop: '5%',
                      textAlign: 'center',
                      width: '200px',
                      marginLeft: '15%',
                      height: '20%',
                      boxShadow: '0px 0px 0px 3px #968787',
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginTop: '10%',
                      }}
                    >
                      รวมบิล
                    </Typography>
                  </Card>
                  <Card class={classes.cardDetail}>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      เบอร์โต๊ะ : {detail.type}
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      ราคารวม : {detail.totalPrice} บาท
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      เวลา : {detail.time} น.
                    </Typography>
                    <Typography
                      style={{
                        margin: '10px 10px 10px 10px',
                        fontSize: 18,
                      }}
                    >
                      จำนวนท่าน : {detail.guest} ท่าน
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
      }
    }
  }, [value, open, isCheckAll]);

  return (
    <div>
      <Dialog open={open} onClose={handleCloseAddItem}>
        <DialogTitle open={open} onClose={handleCloseAddItem}>
          <DialogContent>{renders()}</DialogContent>
          <DialogActions>
            {value === 0 ? (
              <>
                <Button onClick={() => closeDialog()} color="primary">
                  ยกเลิก
                </Button>
                <Button
                  onClick={() => {
                    props.history.push(`/mainNav/editOrder:${detail.id}`);
                  }}
                  color="primary"
                >
                  แก้ไข
                </Button>
                {/* //////////////////////////////////////////////////////////////////
          //Click for calculator  */}
                <Button
                  onClick={() => {
                    props.history.push(`/mainNav/checkoutOrder:${detail.id}`);
                  }}
                  color="primary"
                  autoFocus
                >
                  ชำระเงิน
                </Button>
                <Button onClick={(e) => handleClickMore(e)}>
                  <MoreHorizIcon color="primary" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setValue(0);
                    handleResetState();
                  }}
                  color="primary"
                >
                  ยกเลิก
                </Button>
                <Button
                  onClick={() => {
                    // 1 = split   edit old order  create new order
                    value === 1 ? handleSplitOrder() : handleMergeOrder();
                  }}
                  color="primary"
                >
                  ยืนยัน
                </Button>
              </>
            )}
          </DialogActions>
        </DialogTitle>
        <Menu
          aria-controls="simple-menu"
          aria-haspopup="true"
          more={more}
          keepMounted
          open={Boolean(more)}
          onClose={handleCloseMore}
          style={{ left: '64%', top: '30%' }}
        >
          {value === 0 ? (
            <Grid></Grid>
          ) : (
            <MenuItem
              onClick={(e) => {
                handleChange(e, 0);
                handleCloseMore();
              }}
            >
              แก้ไข
            </MenuItem>
          )}
          {value === 1 ? (
            <MenuItem disabled>แยกบิล</MenuItem>
          ) : (
            <MenuItem
              onClick={(e) => {
                handleChange(e, 1);
                handleCloseMore();
              }}
            >
              แยกบิล
            </MenuItem>
          )}
          {value === 2 ? (
            <MenuItem disabled>รวมบิล</MenuItem>
          ) : (
            <MenuItem
              onClick={(e) => {
                handleChange(e, 2);
                handleCloseMore();
              }}
            >
              รวมบิล
            </MenuItem>
          )}
        </Menu>
      </Dialog>
    </div>
  );
};
export default React.forwardRef(DialogEditTable);
