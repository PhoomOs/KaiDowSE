import React, { useState, useEffect, useRef } from 'react';

import { forwardRef } from 'react';

import { Grid, Card } from '@material-ui/core';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Navbar2 from '../components/navbar2';
import kaidowlogo from '../img/kaidowlogo.png';
import { connect } from 'react-redux';
import socket from '../util/socket-io';
import { logChange, refundLog } from '../redux/action/logAction';
import { addOrder } from '../redux/action/orderAction';

// import NavbarAfterLogin from '../components/navbar2';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// const api = axios.create({
//   baseURL: `https://reqres.in/api`,
// });

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}
const mock = [
  {
    id: 1,
    orderId: '1223333',
    orderDate: 'AGeorge',
    orderType: 'Bluth',
    orderByEmployee: 'Eiei',
    orderPrice: 200,
  },
  {
    id: 10,
    orderId: '45467',
    orderDate: 'BGeorge',
    orderType: 'Bluth',
    orderByEmployee: 'nikkeeeee',
    orderPrice: 200,
  },
  {
    id: 545645646,
    orderId: '7866387',
    orderDate: 'CGeorge',
    orderType: 'Bluth',
    orderByEmployee: 'taiiii',
    orderPrice: 200,
  },
  {
    id: 4,
    orderId: '453',
    orderDate: 'DGeorge',
    orderType: 'Bluth',
    orderByEmployee: 'taiiii',
    orderPrice: 200,
  },
  {
    id: 1,
    orderId: '543543',
    orderDate: 'EGeorge',
    orderType: 'Bluth',
    orderByEmployee: 'phoommm',
    orderPrice: 200,
  },
  {
    id: 5,
    orderId: '4534',
    orderDate: 'FGeorge',
    orderType: 'Bluth',
    orderByEmployee: 'dddddddddd',
    orderPrice: 200,
  },
  {
    id: 6,
    orderId: '1234',
    orderDate: 'GGeorge',
    orderType: 'Bluth',
    orderByEmployee: 'asdasdasdasd',
    orderPrice: 200,
  },
];

function OrderLog(props) {
  const socketRef = useRef();
  const [log, setLog] = useState([]);
  var columns = [
    { title: 'id', field: 'id', hidden: true },
    { title: 'หมายเลขคำสั่งซื้อ', field: 'orderId' },
    { title: 'วันที่ - เวลา', field: 'orderDate' },
    { title: 'วิธีการชำระเงิน', field: 'orderType' },
    { title: 'พนักงาน', field: 'orderByEmployee' },
    { title: 'ราคารวม', field: 'orderPrice' },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    console.log('OrderLog Mount');
  }, []);

  useEffect(() => {
    if (props.log !== undefined) {
      setLog(
        props.log.logs.map((log, index) => {
          return {
            id: index,
            orderId: log.id,
            orderDate: log.time,
            orderType: log.orderType,
            orderByEmployee: log.orderByEmployee,
            orderPrice: log.orderPrice,
          };
        })
      );
      console.log('setLog ', props.log);
    }
  }, [props.log]);

  //   const handleRowUpdate = (newData, oldData, resolve) => {
  //     //validation
  //     let errorList = []
  //     if(newData.first_name === ""){
  //       errorList.push("Please enter first name")
  //     }
  //     if(newData.last_name === ""){
  //       errorList.push("Please enter last name")
  //     }
  //     if(newData.email === "" || validateEmail(newData.email) === false){
  //       errorList.push("Please enter a valid email")
  //     }

  //     if(errorList.length < 1){
  //       api.patch("/users/"+newData.id, newData)
  //       .then(res => {
  //         const dataUpdate = [...data];
  //         const index = oldData.tableData.id;
  //         dataUpdate[index] = newData;
  //         setData([...dataUpdate]);
  //         resolve()
  //         setIserror(false)
  //         setErrorMessages([])
  //       })
  //       .catch(error => {
  //         setErrorMessages(["Update failed! Server error"])
  //         setIserror(true)
  //         resolve()

  //       })
  //     }else{
  //       setErrorMessages(errorList)
  //       setIserror(true)
  //       resolve()

  //     }

  //   }

  const handleRowDelete = async (oldData, resolve) => {
    ////////////////////////////////////////////////////////////// REBILL HERE  1. addOrder from id bill  2 remove bill
    // console.log('log = ', props.log.logs);
    // console.log('bill = ', bill);
    console.log('selec : ', selectedDetail);
    let bill = props.log.logs.filter((l) => l.id === selectedDetail)[0];
    let refundItem = {
      guest: bill.guest,
      id: bill.id,
      menuItems: bill.menuItems,
      guest: bill.guest,
      time: bill.time,
      totalPrice: bill.totalPrice,
      status: bill.status,
      type: bill.type,
      paymentStatus: bill.paymentStatus,
    };
    console.log('selected row id = ', selectedRow);
    console.log('selected detail id = ', selectedDetail);
    console.log('select item  = ', bill);
    console.log('refundItem = ', refundItem);
    // console.log('all');
    // console.log('CALL OLD DATA');

    props.addOrder(refundItem);
    props.refundLog({ id: selectedDetail });
    resolve();
  };

  return (
    <div>
      <div
        style={{
          zIndex: 99,
          backgroundImage: `url(${kaidowlogo})`,
          bacgroundPosition: 'center',
          position: 'absolute',
          height: '100%',
          width: '100%',
          overflow: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        {/* <NavbarAfterLogin {...props} /> */}

        <Grid
          container
          spacing={1}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {/* <Grid item xs={3}></Grid> */}
          <Grid item xs={6} m={12}>
            <div>
              {iserror && (
                <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>;
                  })}
                </Alert>
              )}
            </div>
            <Card style={{ marginTop: '40px' }}>
              {console.log('data', data)}
              <MaterialTable
                title="ประวัติใบเสร็จรับเงิน"
                columns={columns}
                data={log}
                icons={tableIcons}
                editable={{
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      handleRowDelete(oldData, resolve);
                    }),
                }}
                onRowClick={(evt, selectedRow) => {
                  console.log('selected Row = ', selectedRow);
                  setSelectedRow(selectedRow.tableData.id);
                  setSelectedDetail(selectedRow.orderId);
                }}
                options={{
                  search: true,
                  filterType: 'checkbox',
                  rowStyle: (rowData) => ({
                    backgroundColor:
                      selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF',
                  }),
                }}
              />
            </Card>
          </Grid>
          {/* <Grid item xs={3}></Grid> */}
        </Grid>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  log: state.log,
  user: state.user,
});

const mapActionsToProps = { logChange, refundLog, addOrder };

export default connect(mapStateToProps, mapActionsToProps)(OrderLog);
