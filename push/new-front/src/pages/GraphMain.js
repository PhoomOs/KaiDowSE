import React, { useState } from 'react';
import PropTypes from 'prop-types';
import kaidowlogo from '../img/kaidowlogo.png';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  AppBar,
  Tabs,
  Tab,
  Icon,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';
import { blue } from '@material-ui/core/colors';
import { ArrowBack } from '@material-ui/icons';
const mockDataPrice = {
  series: [
    {
      name: 'Money',
      data: [4500, 3500, 4100, 4700, 2200, 4300],
    },
    {
      name: 'Online Payment',
      data: [1300, 2000, 2000, 4000, 1300, 2700],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '04/04/2021 GMT',
        '04/05/2021 GMT',
        '04/06/2021 GMT',
        '04/07/2021 GMT',
        '04/08/2021 GMT',
        '04/09/2021 GMT',
        '04/10/2021 GMT',
      ],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  },
};
const mockDataOrder = {
  series: [
    {
      name: 'Order',
      data: [36, 33, 31, 43, 25, 29],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '04/04/2021 GMT',
        '04/05/2021 GMT',
        '04/06/2021 GMT',
        '04/07/2021 GMT',
        '04/08/2021 GMT',
        '04/09/2021 GMT',
        '04/10/2021 GMT',
      ],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  },
};
const mockDataQuantityCustomer = {
  series: [
    {
      name: 'Quantity Customer',
      data: [34, 37, 29, 36, 20, 28],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '04/04/2021 GMT',
        '04/05/2021 GMT',
        '04/06/2021 GMT',
        '04/07/2021 GMT',
        '04/08/2021 GMT',
        '04/09/2021 GMT',
        '04/10/2021 GMT',
      ],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  },
};
const mockDataTop = {
  series: [
    {
      name: 'อาหารจานเดียว',
      data: [36, 33, 31, 43, 25, 29],
    },
    {
      name: 'ท๊อปปิ้ง',
      data: [11, 13, 10, 15, 8, 10],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '04/04/2021 GMT',
        '04/05/2021 GMT',
        '04/06/2021 GMT',
        '04/07/2021 GMT',
        '04/08/2021 GMT',
        '04/09/2021 GMT',
        '04/10/2021 GMT',
      ],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  },
};
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
const GraphMain = () => {
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [valueVertiacal, setValueVertical] = useState(0);
  const handleChangeVertical = (event, newValue) => {
    setValueVertical(newValue);
  };
  return (
    <div>
      <Grid container style={{ marginTop: 30 }}>
        <Grid item sm={2}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={valueVertiacal}
            onChange={handleChangeVertical}
            TabIndicatorProps={{ style: { background: '#ffd107' } }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Tab
              label="รายได้รวม"
              style={{
                color: '#15C527',
                fontWeight: 600,
                fontSize: 16,
                height: 100,
                marginBottom: '10%',
              }}
            />
            <Tab
              label="ออเดอร์รวม"
              style={{
                color: '#15C527',
                fontWeight: 600,
                fontSize: 16,
                height: 100,
                marginBottom: '10%',
              }}
            />
            <Tab
              label="จำนวนลูกค้า"
              style={{
                color: '#15C527',
                fontWeight: 600,
                fontSize: 16,
                height: 100,
                marginBottom: '10%',
              }}
            />
            <Tab
              label="อาหารขายดี"
              style={{
                color: '#15C527',
                fontWeight: 600,
                fontSize: 16,
                height: 100,
                marginBottom: '10%',
              }}
            />
          </Tabs>
        </Grid>
        <Grid item sm={10}>
          <TabPanel value={valueVertiacal} index={0}>
            <div className="row" style={{ marginLeft: '10%' }}>
              <div className="mixed-chart">
                <Chart
                  options={mockDataPrice.options}
                  series={mockDataPrice.series}
                  type="bar"
                  width="960"
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={valueVertiacal} index={1}>
            <div className="row" style={{ marginLeft: '10%' }}>
              <div className="mixed-chart">
                <Chart
                  options={mockDataOrder.options}
                  series={mockDataOrder.series}
                  type="bar"
                  width="960"
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={valueVertiacal} index={2}>
            <div className="row" style={{ marginLeft: '10%' }}>
              <div className="mixed-chart">
                <Chart
                  options={mockDataQuantityCustomer.options}
                  series={mockDataQuantityCustomer.series}
                  type="bar"
                  width="960"
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={valueVertiacal} index={3}>
            <div className="row" style={{ marginLeft: '10%' }}>
              <div className="mixed-chart">
                <Chart
                  options={mockDataTop.options}
                  series={mockDataTop.series}
                  type="bar"
                  width="960"
                />
              </div>
            </div>
          </TabPanel>
          ``
        </Grid>
      </Grid>
    </div>
  );
};
export default GraphMain;
