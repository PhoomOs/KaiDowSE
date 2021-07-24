import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import kaidowlogo from '../img/kaidowlogo.png';
import Box from '@material-ui/core/Box';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Button, Grid, Tab, Tabs, Menu, MenuItem } from '@material-ui/core';

import { connect, useDispatch } from 'react-redux';
import { Close } from '@material-ui/icons';
import Fade from '@material-ui/core/Fade';
import MenuNav from '../components/MenuNav';
import KitchenManage from '../pages/KitchenManage';
import OrderManage from '../pages/OrderManage';
import OrderList from '../pages/OrderList';
import EmployeeManage from '../pages/EmployeeManage';
import SettingMain from '../pages/settingMain';
import Coupon from '../pages/Coupon';
import CheckoutOrder from '../pages/CheckoutOrder';
import OrderLog from '../pages/OrderLog';
import PaymentStatus from '../pages/PaymentStatus';
import OrderChangeBill from '../pages/OrderChangeBill';
import PaymentInfo from '../pages/PaymentInfo';
import { logoutUser } from '../redux/action/userAction';
import { kitchenChange } from '../redux/action/kitchenAction';
import { orderChange, orderMenuChange } from '../redux/action/orderAction';
import { logChange } from '../redux/action/logAction';
import socket from '../util/socket-io';
import Manual from '../pages/Manual';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const NavbarAfterLogin = (props) => {
  const socketRef = useRef();
  const [value, setValue] = useState(1);
  const [burger, setBurger] = useState(null);

  useEffect(() => {
    if (props.match.params.path == 'kitchenOrder') {
      setValue(1);
    }
    socketRef.current = new socket();
    return () => {
      console.log('unmount orderList');
      socketRef.current.unListeningKitchen();
    };
  }, []);

  useEffect(() => {
    if (props.user.store !== undefined) {
      socketRef.current.setDetail(
        props.user.store,
        props.kitchenChange,
        props.orderChange,
        props.orderMenuChange,
        props.logChange
      );
      socketRef.current.listeningKitchen();
    }
  }, [props.user.store]);

  const handleChange = (event, newValue) => {
    console.log('newValue : ', newValue);
    setValue(newValue);
    if (newValue == 1) {
      props.history.push('/mainNav3/kitchenOrder');
    }
  };
  const handleResetTab = () => {
    setValue(4);
  };

  const handleClickBurger = (event) => {
    setBurger(event.currentTarget);
  };
  const handleCloseBurger = () => {
    setBurger(null);
  };
  const menufont = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  };
  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: '#ffc107', position: 'relative' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <img
            src={kaidowlogo}
            width={36}
            height={36}
            style={{
              marginTop: '0.5%',
              marginRight: '52%',
              marginLeft: '60px',
              cursor: 'pointer',
            }}
            onClick={() => props.history.push('/main')}
          />
          <Tab label="ออเดอร์ห้องครัว" style={{ fontWeight: 600 }} />
          {burger === null ? (
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={(e) => handleClickBurger(e)}
              style={{ marginLeft: '10px', marginRight: '30px' }}
            >
              <DehazeIcon style={{ color: '#fff' }} />
            </Button>
          ) : (
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={(e) => handleClickBurger(e)}
              style={{ marginLeft: '10px', marginRight: '30px' }}
            >
              <Close style={{ color: '#fff' }} />
            </Button>
          )}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={1}>
        <KitchenManage {...props} socket={socketRef} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Manual {...props} socket={socketRef} />
      </TabPanel>

      <Menu
        id="fade-menu"
        burger={burger}
        keepMounted
        open={burger}
        onClose={handleCloseBurger}
        TransitionComponent={Fade}
        style={{ left: '87%', top: '-40%', width: '20%' }}
      >
        <MenuItem
          onClick={(e) => {
            handleCloseBurger();
          }}
          style={menufont}
          value={5}
        >
          คู่มือ
        </MenuItem>

        <MenuItem
          onClick={() => props.logoutUser(props.history)}
          style={menufont}
        >
          ออกจาระบบ
        </MenuItem>
        <Typography style={menufont}>
          <img src={kaidowlogo} height={20} width={20} />
        </Typography>
      </Menu>
    </div>
  );
};
const mapStateToProps = (state) => ({
  orders: state.order,
  lists: state.kitchen,
  user: state.user,
});
const mapActionsToProps = {
  logoutUser,
  kitchenChange,
  orderChange,
  orderMenuChange,
  logChange,
};

export default connect(mapStateToProps, mapActionsToProps)(NavbarAfterLogin);
