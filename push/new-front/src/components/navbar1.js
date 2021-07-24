import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import kaidowlogo from '../img/kaidowlogo.png';
import Box from '@material-ui/core/Box';
import { Button, Grid, Tab, Tabs } from '@material-ui/core';
import InfoHome from '../pages/InfoHome';
import FeaturePage from '../pages/FeaturePage';
import MyInfo from '../pages/MyInfo';
import ContactMe from '../pages/ContactMe';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Navbar = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#ffc107' }}>
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
              marginRight: '80px',
              marginLeft: '20px',
              cursor: 'pointer',
            }}
          />
          <Tab label="หน้าหลัก" {...a11yProps(0)} style={{ fontWeight: 500 }} />
          <Tab label="ฟีเจอร์" {...a11yProps(1)} style={{ fontWeight: 600 }} />
          <Tab
            label="เกี่ยวกับเรา"
            {...a11yProps(2)}
            style={{ fontWeight: 600 }}
          />
          <Tab
            label="ติดต่อเรา"
            style={{ fontWeight: 600, marginRight: '32%' }}
          />

          <Button
            style={{ color: '#15C527', fontWeight: 600, marginRight: '2%' }}
            href="/login"
          >
            เข้าสู่ระบบ
          </Button>
          <Button
            variant="outlined"
            style={{
              color: '#15C527',
              borderColor: '#15C527',
              fontWeight: 600,
              marginTop: '0.5%',
              marginBottom: '0.6%',
            }}
            href="/signup"
          >
            สมัครสมาชิก
          </Button>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <InfoHome />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FeaturePage />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MyInfo />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ContactMe />
      </TabPanel>
    </div>
  );
};

export default Navbar;
