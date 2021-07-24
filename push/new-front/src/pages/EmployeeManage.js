import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Navbar2 from '../components/navbar2';
import { Grid, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// import "../collection/tools.css";
import EmployeeDetailCard from '../components/employeeDetailCard';
import EmployeeList from '../components/employeeList';
import ConfirmDialog from '../components/confirmDialog';
import { connect } from 'react-redux';
import {
  addEmployee,
  deleteEmployee,
  getAllEmployee,
  updateEmployee,
} from '../redux/action/employeeAction';

const drawerWidth = 160;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class EmployeeManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTime: true,
      status: 0,
      selected: '',

      dataforCard: {
        name: '',
        surName: '',
        phone: '',
        email: '',
        password: '',
        role: '',
        uid: '',
        //userId
      },
      //for dialog
      open: false,
      dialogTitle: '',
      dialogData: '',
      //for image
      imgFile: '',
      mainState: 'initial',
      imageUploaded: 0,
      selectedFile: null,
      data: [],
      dialogAction: '',
      dialogContent: '',
      typeAction: '',
      errors: {},
      errorState: false,
      check2: '',
    };
  }

  componentDidMount() {
    // this.props.getAllEmployee();
    console.log('EMPLOYEE MOUNT', this.props.employee);
  }

  componentWillReceiveProps(nx) {
    if (this.state.firstTime) {
      this.setState({
        dataforCard: nx.employee.employees[0],
      });
      this.setState({ firstTime: false });
    }
  }

  setSelectedFile = (result, file) => {
    this.setState({
      selectedFile: result,
      imgFile: file,
    });
  };

  setUploaded = (file) => {
    this.setState({
      mainState: 'uploaded',
      selectedFile: file,
      imageUploaded: 1,
    });
  };

  setErrors = (err) => {
    console.log('err from main', err);
    this.setState({
      errors: err,
      errorState: true,
    });
  };
  handleOpenDialog = (header, dialogContent, dialogData, status) => {
    //when opendialog packing data to send to dialog by props *******************************************************************
    const formData = new FormData();
    switch (status) {
      case 'add':
        if (this.state.mainState === 'uploaded') {
          formData.append(
            `userImage_${this.state.selectedFile}`,
            this.state.imgFile,
            this.state.imgFile.name
          );
        }
        Object.keys(dialogContent).forEach((key) => {
          formData.append(key, dialogContent[key]);
        });
        this.setState({
          dialogTitle: header,
          dialogContent: dialogContent,
          open: true,
          dialogData: formData,
          dialogAction: this.props.addEmployee,
          typeAction: status,
          check2: 'add',
        });

        break;
      case 'delete':
        this.setState({
          dialogTitle: header,
          dialogContent: dialogContent,
          open: true,
          dialogData: dialogData,
          dialogAction: this.props.deleteEmployee,
          typeAction: status,
          check2: 'delete',
        });
        break;
      case 'edit':
        this.state.mainState === 'uploaded'
          ? formData.append(
              `userImage_${this.state.selectedFile}`,
              this.state.imgFile,
              this.state.imgFile.name
            )
          : console.log();
        Object.keys(dialogContent).forEach((key) => {
          formData.append(key, dialogContent[key]);
        });
        this.setState({
          dialogTitle: header,
          dialogContent: dialogContent,
          open: true,
          dialogData: formData,
          dialogAction: this.props.updateEmployee,
          typeAction: status,
          check2: 'edit',
        });
        break;
    }
  };

  handleCloseDialog = (event, data) => {
    this.setState({
      open: false,
      dialogTitle: '',
      dialogContent: '',
      dialogData: '',
      dialogAction: '',
      typeAction: '',
      errors: {},
      status: 0,
      dataforCard: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        role: '',
        uid: '',
        userImage: '',
      },
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnack: false, errors: {}, status: 0 });
  };

  handleUploadClick = (event) => {
    console.log('use upload');
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result],
      });
    };
    console.log(url);
    this.setState({
      mainState: 'uploaded',
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  imageResetHandler = (event) => {
    this.setState({
      mainState: 'initial',
      selectedFile: null,
      imageUploaded: 0,
    });
  };

  handleEditOpen = (event) => {
    this.setState((state) => ({
      status: 1,
    }));
  };

  handleEditClose = (event) => {
    this.setState((state) => ({
      status: 0,
    }));
  };

  handleEditCloseWhenAdd = (event) => {
    // console.log('close Daialog');
    this.setState((state) => ({
      status: 0,
      errors: {},
    }));
    this.setState({ dataforCard: this.props.employee.employees[0] });
  };

  handleAddEmployee = (event) => {
    this.setState((state) => ({
      status: 2,
      dataforCard: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        role: '',
        uid: '',
        userImage: '',
      },
    }));
  };

  onSelectList = (e, email) => {
    this.setState({ selected: email });
    this.handleEditClose();

    let datas = this.props.employee.employees.filter(
      (el) => el.email === email
    )[0];

    this.setState({ dataforCard: datas });
  };

  render() {
    const dataforCard = this.state.dataforCard;
    const drawerContainer = { overflow: 'auto', width: 250 };
    const drawer = { width: drawerWidth, flexShrink: '0', zIndex: '0' };
    const appBar = { zIndex: '1' };
    // console.log('in Emplotyee store ', this.props.employee.employees);

    return (
      <div style={{ background: '#f9afafd' }}>
        <Grid container>
          <Grid
            item
            sm={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Grid style={{ marginTop: '25%' }}>
              {this.props.employee.employees.map((data, index) => {
                if (data.role === 'Owner') {
                  return;
                } else {
                  return (
                    <EmployeeList
                      data={data}
                      userImage={dataforCard.userImage}
                      index={index}
                      key={data.email}
                      onSelectList={this.onSelectList}
                    />
                  );
                }
              })}
            </Grid>
            <Grid
              style={{
                position: 'absolute',
                marginLeft: '5%',
                marginTop: '2%',
              }}
            >
              {this.state.status !== 1 ? (
                <Button
                  variant="outlined"
                  onClick={(e) => this.handleAddEmployee(e)}
                  style={{
                    width: 60,
                    height: 60,
                    borderColor: '#ffc107',
                    borderStyle: 'solid',
                    borderRadius: '50%',
                  }}
                >
                  +
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={(e) => this.handleAddEmployee(e)}
                  style={{
                    width: 60,
                    height: 60,
                    borderColor: '#ffc107',
                    borderStyle: 'solid',
                    borderRadius: '50%',
                  }}
                  disabled
                >
                  +
                </Button>
                /* </Button>
                // <Button
                //   variant="outlined"
                //   onClick={(e) => this.handleAddEmployee(e)}
                //   style={{
                //     height: '5%',
                //     borderColor: '#ffc107',
                //     borderStyle: 'solid',
                //   }}
                //   disabled
                // >
                //   เพิ่มพนักงาน
                // </Button> */
              )}
            </Grid>
          </Grid>
          <Grid item sm={9} style={{ background: '#f9fafd' }}>
            <EmployeeDetailCard
              name={dataforCard.name}
              surName={dataforCard.surName}
              phone={dataforCard.phone}
              email={dataforCard.email}
              password={dataforCard.password}
              role={dataforCard.role}
              userImage={dataforCard.userImage}
              errors={this.state.errors}
              errorState={this.state.errorState}
              handleEditOpen={this.handleEditOpen}
              handleEditClose={this.handleEditClose}
              status={this.state.status}
              handleOpenDialog={this.handleOpenDialog}
              handleCloseDialog={this.handleCloseDialog}
              mainState={this.state.mainState}
              setSelectedFile={this.setSelectedFile}
              setUploaded={this.setUploaded}
              imageResetHandler={this.imageResetHandler}
              selectedFile={this.state.selectedFile}
              isDialogOpen={this.state.open}
              handleEditCloseWhenAdd={this.handleEditCloseWhenAdd}
            />
          </Grid>
        </Grid>
        <ConfirmDialog
          //handle Open Dialog
          open={this.state.open}
          handleClose={this.handleCloseDialog}
          ///Detail for dialog
          title={this.state.dialogTitle}
          content={this.state.dialogContent}
          ///follow by dialog action
          onSuccess={this.state.dialogAction}
          data={this.state.dialogData}
          //set State
          check2={this.state.check2}
          setErrors={this.setErrors}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employee: state.employee,
  UI: state.UI,
});

const mapActionsToProps = {
  addEmployee,
  deleteEmployee,
  getAllEmployee,
  updateEmployee,
};

export default connect(mapStateToProps, mapActionsToProps)(EmployeeManage);
