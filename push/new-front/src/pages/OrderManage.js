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
import '../collection/tools.css';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '600',
    marginTop: '64px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const OrderManage = (props) => {
  const dialogOrderAddMenuRef = useRef();
  const classes = useStyles();
  const [data, setData] = useState({ menuTypes: [], menuItems: [] });
  const [tabs, setAddTab] = useState([<Tab />]);
  const [toppingTab, setToppingTab] = useState([]);
  const [tabId, setTabId] = useState('ALL');
  const [itemValue, setitemValue] = useState([]);
  const [tabsContent, setTabsContent] = useState([]);
  const [status, setStatus] = useState('ADD');
  const [editId, setEditId] = useState('');

  const [stateMenu, setStateMenu] = useState('default');
  const [totalOrder, setTotalOrder] = useState([]);
  const [select, setSelect] = useState('');
  const [table, setTable] = useState('');
  const [guest, setGuest] = useState(0);
  const [time, setTime] = useState('');

  const [selectedIndex, setSelectedIndex] = useState();
  const handleStateMenu = (item, index) => {
    setStateMenu(item);
    setSelectedIndex(index);
    if (item === 'addOn') {
      setTabId(toppingTab[0].key);
    }
  };
  useEffect(() => {
    // props.getAllMenuItems();
    let id = props.match.params.path.split(':')[1];
    if (id !== undefined) {
      setStatus('EDIT');
      setEditId(id);
      // console.log(props.order.orderItems);
      let order = props.order.orderItems.filter((order) => order.id === id)[0];
      console.log('data from : ', order);
      setGuest(order.guest);
      setTime(order.time);

      if (order.type !== 0) {
        setSelect(1);
        setTable(order.type);
      } else {
        setSelect(0);
      }

      setTotalOrder(order.menuItems);

      let newItemvalue = [];
      order.menuItems.map((orderz, index) => {
        let newItem = { index: orderz.quantity, addOn: [] };
        orderz.addOn.map((addOnz, index) => {
          newItem.addOn.push(addOnz.quantity);
        });
        newItemvalue.push(newItem);
      });
    }
  }, []);

  const onsubmit = () => {
    console.log('submit status = ', status);
    console.log('submit form : ', {
      time: Date.now(),
      id: uuidv4(),
      status: 0,
      type: select == 0 ? 0 : table,
      guest: guest,
      totalPrice: totalOrder.reduce((prev, cur) => {
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
      menuItems: totalOrder
        .filter((item) => item.quantity != 0)
        .map((item) => ({
          ...{
            ...item,
            addOn: item.addOn
              .filter((addOn) => addOn.quantity != 0)
              .map((ee) => ({ ...ee, orderType: select == 0 ? 0 : table })),
          },
          orderType: select == 0 ? 0 : table,
        })),
      paymentStatus: false,
    });
    status === 'ADD'
      ? props.addOrder({
          time: Date.now(),
          id: uuidv4(),
          status: 0,
          type: select == 0 ? 0 : table,
          guest: guest,
          paymentStatus: true,
          totalPrice: totalOrder.reduce((prev, cur) => {
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
          menuItems: totalOrder
            .filter((item) => item.quantity != 0)
            .map((item) => ({
              ...{
                ...item,
                addOn: item.addOn
                  .filter((addOn) => addOn.quantity != 0)
                  .map((ee) => ({ ...ee, orderType: select == 0 ? 0 : table })),
              },
              orderType: select == 0 ? 0 : table,
            })),
        })
      : props.editOrder({
          time: time,
          id: editId,
          type: select == 0 ? 0 : table,
          guest: guest,
          totalPrice: totalOrder.reduce((prev, cur) => {
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
          menuItems: totalOrder
            .filter((item) => item.quantity != 0)
            .map((item) => ({
              ...{
                ...item,
                addOn: item.addOn
                  .filter((addOn) => addOn.quantity != 0)
                  .map((ee) => ({ ...ee, orderType: select == 0 ? 0 : table })),
              },
              orderType: select == 0 ? 0 : table,
            })),
        });

    props.history.push('/mainNav/orderManage');
  };

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  useEffect(() => {
    if (tabId == 'ALL') {
      setTabsContent([]);
      if (stateMenu !== 'addOn') {
        data.menuItems.map((el) => setTabsContent((old) => [...old, el]));
      } else {
        data.menuItems.map((el) => {
          if (el.isTopping) setTabsContent((old) => [...old, el]);
        });
      }
    } else {
      setTabsContent([]);
      data.menuItems.map((el) => {
        if (el.menuType === tabId) {
          setTabsContent((old) => [...old, el]);
        }
      });
    }

    if (stateMenu === 'addOn') {
      setToppingTab([]);
      console.log('ADDONNNNNN = ', data);
      data.menuTypes.map((el) => {
        if (el.isTopping) {
          setToppingTab((old) => [
            ...old,
            <Tab label={el.typeName} key={el.typeId} value={el.typeId} />,
          ]);
        }
      });
    } else {
      setAddTab([
        data.menuTypes.map((el) => (
          <Tab label={el.typeName} key={el.typeId} value={el.typeId} />
        )),
      ]);
    }
  }, [data, tabId, stateMenu]);

  useEffect(() => {
    setData({
      menuTypes: props.menu.menuTypes,
      menuItems: props.menu.menuItems,
    });
    props.menu.menuItems.map((el) => setTabsContent((old) => [...old, el]));

    props.menu.menuTypes.map((el) => {
      if (el.isTopping) {
        setToppingTab((old) => [
          ...old,
          <Tab label={el.typeName} key={el.typeId} value={el.typeId} />,
        ]);
      }
    });
  }, [props.menu]);

  const handleTabChange = (event, newTabId) => {
    event.preventDefault();
    setTabId(newTabId);
  };
  const handleAddNewMenu = (child) => {
    setTotalOrder((prevValue) => {
      return [...prevValue, child];
    });

    setitemValue((prevValue) => {
      return [...prevValue, { index: 1, addOn: [] }];
    });
  };

  const handleAddAddOn = (child) => {
    let newTotal = totalOrder;
    newTotal[selectedIndex].addOn.push(child);
    setTotalOrder(newTotal);
    handleStateMenu('default', -1);
    setTabId('ALL');
  };

  const handleAddValue = (idx) => {
    // let newTotal = totalOrder;
    let newTotal = totalOrder.map((order, ind) =>
      idx === ind
        ? {
            ...order,
            totalPrice: (order.quantity + 1) * order.price.price,
            quantity: order.quantity + 1,
          }
        : order
    );

    setTotalOrder(newTotal);

    setitemValue((prevValue) => {
      let copyArray = prevValue.map((val, i) =>
        i == idx ? { ...val, index: val.index + 1 } : val
      );

      return copyArray;
    });
  };

  const handleAddAddOnQuantity = (index, indexAddOn) => {
    let newTotal = totalOrder.map((order, ind) =>
      index === ind
        ? {
            ...order,
            addOn: [
              order.addOn.map((addOn, ix) =>
                ix === indexAddOn
                  ? {
                      ...addOn,
                      totalPrice:
                        (addOn.quantity + 1) * parseInt(addOn.price.price),
                      quantity: addOn.quantity + 1,
                    }
                  : addOn
              ),
            ][0],
          }
        : order
    );
    setTotalOrder(newTotal);
    setitemValue((prevValue) => {
      let copyArray = prevValue.map((val, i) =>
        i == index
          ? {
              ...val,
              addOn: [val.addOn.map((q, id) => (id == indexAddOn ? q + 1 : q))],
            }
          : val
      );
      return copyArray;
    });
  };

  const handleDelValue = (idx) => {
    // let newTotal = totalOrder;
    let newTotal = totalOrder.map((order, ind) =>
      idx === ind
        ? {
            ...order,
            totalPrice: (order.quantity - 1) * order.price.price,
            quantity: order.quantity - 1,
          }
        : order
    );

    setTotalOrder(newTotal);

    setitemValue((prevValue) => {
      let copyArray = prevValue.map((val, i) =>
        i == idx ? { ...val, index: val.index - 1 } : val
      );

      return copyArray;
    });
  };

  const handleDelAddOnQuantity = (index, indexAddOn) => {
    let newTotal = totalOrder.map((order, ind) =>
      index === ind
        ? {
            ...order,
            addOn: [
              order.addOn.map((addOn, ix) =>
                ix === indexAddOn
                  ? {
                      ...addOn,
                      totalPrice:
                        (addOn.quantity - 1) * parseInt(addOn.price.price),
                      quantity: addOn.quantity - 1,
                    }
                  : addOn
              ),
            ][0],
          }
        : order
    );
    setTotalOrder(newTotal);
    setitemValue((prevValue) => {
      let copyArray = prevValue.map((val, i) =>
        i == index
          ? {
              ...val,
              addOn: [val.addOn.map((q, id) => (id == indexAddOn ? q - 1 : q))],
            }
          : val
      );
      return copyArray;
    });
  };

  return (
    <div class={classes.root}>
      <DialogOrderAddMenu
        ref={dialogOrderAddMenuRef}
        onSuccess={handleAddNewMenu}
        onAddAddOn={handleAddAddOn}
      />
      <Grid container>
        <Grid item sm={7}>
          <Card style={{ marginLeft: 10 }}>
            <Tabs
              value={tabId}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {stateMenu === 'default' ? (
                <Tab label="ALL" value="ALL" />
              ) : (
                console.log()
              )}
              {stateMenu === 'default'
                ? tabs.map((child) => child)
                : toppingTab.map((child) => child)}
            </Tabs>
          </Card>
          <Card style={{ marginLeft: 10, marginTop: 20 }}>
            <GridList
              cellHeight={120}
              cols={3}
              spacing={45}
              style={{
                width: 800,
                margin: '20px 15px 20px px',
              }}
            >
              {tabsContent.map((child) =>
                stateMenu === 'default' ? (
                  <GridListTile
                    a-key={child.menuId}
                    key={child.menuId}
                    style={{ cursor: 'pointer' }}
                    onClick={function (event) {
                      dialogOrderAddMenuRef.current.openDialog(child, 'menu');
                      handleStateMenu('default', -1);
                    }}
                    style={{
                      marginTop: 5,
                      width: '25%',
                    }}
                  >
                    <img src={child.menuImg} a-key={child.menuId} />
                    <GridListTileBar
                      title={child.menuName}
                      a-key={child.menuId}
                    />
                  </GridListTile>
                ) : (
                  <GridListTile
                    a-key={child.menuId}
                    key={child.menuId}
                    style={{ cursor: 'pointer' }}
                    onClick={function (event) {
                      // handleAddAddOn
                      dialogOrderAddMenuRef.current.openDialog(
                        { ...child, memId: totalOrder[selectedIndex] },
                        'addOn'
                      );
                      // handleStateMenu('default', -1);
                    }}
                    style={{
                      marginTop: 5,
                      width: '25%',
                    }}
                  >
                    <img src={child.menuImg} a-key={child.menuId} />
                    <GridListTileBar
                      title={child.menuName}
                      a-key={child.menuId}
                    />
                  </GridListTile>
                )
              )}
            </GridList>
          </Card>
        </Grid>
        <Grid item sm={5}>
          <Card
            style={{
              padding: '10px 10px 10px 10px',
              borderStyle: 'solid',
              borderColor: 'black',
              height: 800,
              width: 550,
              marginLeft: 30,
              borderRadius: 8,
            }}
          >
            <Grid container>
              <Grid item sm={4}>
                <FormControl variant="outlined" style={{ width: 120 }}>
                  <InputLabel>เลือกรูปแบบ</InputLabel>
                  <Select value={select} onChange={handleChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>ทานที่ร้าน</MenuItem>
                    <MenuItem value={0}>กลับบ้าน</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {select > 0 ? (
                <Grid item sm={8}>
                  <TextField
                    onChange={(e) => {
                      setTable(e.target.value);
                    }}
                    value={table}
                    variant="outlined"
                    label="โต๊ะที่"
                    style={{ marginLeft: 20, width: 120 }}
                  ></TextField>
                  <TextField
                    value={guest}
                    onChange={(e) => {
                      setGuest(e.target.value);
                    }}
                    variant="outlined"
                    label="จำนวนท่าน"
                    style={{ marginLeft: 60, width: 120 }}
                  ></TextField>
                </Grid>
              ) : (
                <Grid item sm={8}>
                  <TextField
                    onChange={(e) => {
                      setGuest(e.target.value);
                    }}
                    variant="outlined"
                    label="จำนวนท่าน"
                    style={{ marginLeft: 60, width: 120 }}
                  ></TextField>
                </Grid>
              )}
              <Grid item sm={12}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20,
                    fontWeight: 900,
                    fontSize: 22,
                    marginBottom: 20,
                  }}
                >
                  รายการอาหาร
                </Typography>
                <div>
                  {totalOrder.map((child, index) => {
                    return (
                      <Grid key={index}>
                        <List
                          onClick={(e) => {
                            if (e.target.getAttribute('a-key') != null)
                              return handleStateMenu(
                                'addOn',
                                e.target.getAttribute('a-key')
                              );
                          }}
                        >
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography
                                  a-key={index}
                                  class="texthidden"
                                  style={{
                                    width: '35%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {`${child.name} : (${child.price.detail})  
                                  ${child.price.price} บาท`}
                                </Typography>
                              }
                            />

                            <ListItemSecondaryAction>
                              <Grid
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                {child.quantity === 0 ? (
                                  <IconButton disabled="true">
                                    <RemoveCircleOutline fontSize="small" />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    onClick={() => handleDelValue(index)}
                                  >
                                    <RemoveCircleOutline fontSize="small" />
                                  </IconButton>
                                )}

                                <Typography
                                  style={{
                                    fontSize: 16,
                                    width: 50,
                                    marginLeft: 35,
                                    marginTop: 17,
                                  }}
                                >
                                  {child.quantity}
                                </Typography>
                                <IconButton
                                  onClick={() => handleAddValue(index)}
                                >
                                  <AddCircleOutline fontSize="small" />
                                </IconButton>
                                <Typography
                                  style={{
                                    fontSize: 16,
                                    width: 50,
                                    marginRight: 90,
                                    marginLeft: 10,
                                    display: 'inline',
                                  }}
                                >
                                  <FormControl
                                    variant="outlined"
                                    style={{ width: 170 }}
                                  >
                                    <InputLabel>
                                      {child.totalPrice} บาท
                                    </InputLabel>
                                  </FormControl>
                                </Typography>
                              </Grid>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </List>

                        {child.addOn.length != 0
                          ? child.addOn.map((topping, indexAddOn) => {
                              return (
                                <List>
                                  <ListItem style={{ marginLeft: 20 }}>
                                    <ArrowRight fontSize="medium" />
                                    <ListItemText primary={topping.name} />
                                    <ListItemSecondaryAction>
                                      <Grid
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                        }}
                                      >
                                        {child.quantity === 0 ? (
                                          <IconButton disabled="true">
                                            <RemoveCircleOutline fontSize="small" />
                                          </IconButton>
                                        ) : (
                                          <IconButton
                                            onClick={() =>
                                              handleDelAddOnQuantity(
                                                index,
                                                indexAddOn
                                              )
                                            }
                                          >
                                            <RemoveCircleOutline fontSize="small" />
                                          </IconButton>
                                        )}

                                        <Typography
                                          onClick={() =>
                                            handleStateMenu('addOn', -1)
                                          }
                                          style={{
                                            fontSize: 16,
                                            width: 50,
                                            marginLeft: 35,
                                            marginTop: 17,
                                          }}
                                        >
                                          {topping.quantity}
                                        </Typography>
                                        <IconButton
                                          onClick={() =>
                                            handleAddAddOnQuantity(
                                              index,
                                              indexAddOn
                                            )
                                          }
                                        >
                                          <AddCircleOutline fontSize="small" />
                                        </IconButton>
                                        <Typography
                                          style={{
                                            fontSize: 16,
                                            width: 50,
                                            marginRight: 90,
                                            marginLeft: 10,
                                            display: 'inline',
                                          }}
                                        >
                                          <FormControl
                                            variant="outlined"
                                            style={{ width: 180 }}
                                          >
                                            <InputLabel>
                                              {topping.totalPrice} บาท
                                            </InputLabel>
                                          </FormControl>
                                        </Typography>
                                      </Grid>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                </List>
                              );
                            })
                          : console.log()}
                      </Grid>
                    );
                  })}
                </div>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'left',
                    marginTop: 20,
                    marginLeft: 20,
                    fontWeight: 600,
                    fontSize: 22,
                    bottom: 20,
                  }}
                >
                  รวมทั้งสิ้น&nbsp;
                  {totalOrder.reduce((prev, cur) => {
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
                  }, 0)}
                  &nbsp;บาท
                </Typography>
                <div style={{ marginTop: '5%' }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    style={{ borderColor: '#ffc107' }}
                    onClick={() => onsubmit()}
                  >
                    ยืนยัน
                  </Button>
                  {stateMenu === 'default' ? (
                    console.log()
                  ) : (
                    <Button
                      variant="outlined"
                      style={{ borderColor: '#ffc107', marginLeft: '30%' }}
                      onClick={() => handleStateMenu('default', -1)}
                    >
                      ย้อนกลับ
                    </Button>
                  )}
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  menu: state.menu,
  UI: state.UI,
  order: state.order,
});

const mapActionsToProps = {
  getAllMenuItems,
  addOrder,
  editOrder,
};

export default connect(mapStateToProps, mapActionsToProps)(OrderManage);
