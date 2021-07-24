import React, { Component, PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import '../collection/tools.css';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/Fab';
import CardActionArea from '@material-ui/core/CardActionArea';
import { connect } from 'react-redux';
import { addEmployee, deleteEmployee } from '../redux/action/employeeAction';
import { ThumbDownSharp } from '@material-ui/icons';
import { validateAddEmployee } from '../util/validation';

class employeeDetailCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surName: '',
      phone: '',
      email: '',
      password: '',
      role: '',
    };
  }

  componentWillReceiveProps(nx) {
    if (nx.status === 1) {
      this.setState({
        name: this.props.name,
        surName: this.props.surName,
        phone: this.props.phone,
        email: this.props.email,
        password: this.props.password,
        role: this.props.role,
      });
    }
  }

  handleUploadClick = (event) => {
    var setSelectedFile = this.props.setSelectedFile;
    console.log('setSelectedFile Employee ', this.props.setSelectedFile);
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setSelectedFile([reader.result], file);
    };
    this.props.setUploaded(event.target.files[0]);
    console.log('file Img Employee ', event.target.files[0]);
    this.setState({
      name: this.state.name,
    });
  };

  renderInitialState() {
    //IF ELSE  cant use in jsx
    return (
      <Grid container>
        {this.props.status == 0 ? (
          <img
            width="100%"
            src={this.props.userImage}
            style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
          />
        ) : this.props.status == 1 ? (
          <>
            <input
              accept="image/*"
              id="contained-button-file"
              style={{ display: 'none' }}
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab
                component="span"
                style={{
                  color: '#979797',
                  alignItems: 'center',
                  height: 150,
                  width: 150,
                }}
              >
                <img
                  width="100%"
                  src={this.props.userImage}
                  style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
                />
                {/* <AddPhotoAlternateIcon style={{ height: 50, width: 50 }} /> */}
              </Fab>
            </label>
          </>
        ) : (
          <>
            <input
              accept="image/*"
              id="contained-button-file"
              style={{ display: 'none' }}
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab
                component="span"
                style={{
                  color: '#979797',
                  alignItems: 'center',
                  height: 150,
                  width: 150,
                }}
              >
                <AddPhotoAlternateIcon style={{ height: 50, width: 50 }} />
              </Fab>
            </label>
          </>
        )}
      </Grid>
    );
  }

  renderUploadedState() {
    return (
      <React.Fragment>
        <CardActionArea onClick={() => this.props.imageResetHandler()}>
          <Grid container>
            <img
              width="100%"
              src={this.props.selectedFile}
              style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
            />
          </Grid>
        </CardActionArea>
      </React.Fragment>
    );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //******************************************************************************* PROPS.STATUS 1 =  VIEW ****************************/
  //******************************************************************************* PROPS.STATUS 2 =  EDIT ****************************/
  //******************************************************************************* PROPS.STATUS 3 =  ADD ****************************/
  render() {
    const content = {
      flexGrow: '1',
      padding: '80px 20px 50px 60px',
      margin: '0 0 0 0',
    };
    const btnstyle = {
      margin: '20px auto',
      width: '60%',
      backgroundColor: '#f9fafd',
      fontSize: 18,
    };
    const imgCenter = { textAlign: 'center', padding: '0px 220px 20px 0px' };
    const bar = { display: 'inline', textAlign: 'justify' };
    const ba = {
      display: 'inline',
      jutify: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      texttextAlign: 'center',
    };
    //console.log("detai card err", this.props.errors);
    return (
      <div class="wrapper">
        <div class="profile-card js-profile-card">
          <div class="profile-card__img">
            {(this.props.mainState == 'initial' && this.renderInitialState()) ||
              (this.props.mainState == 'uploaded' &&
                this.renderUploadedState())}
          </div>
          <div class="profile-card__cnt js-profile-cnt">
            <div class="profile-card__name" style={{ fontFamily: 'Athiti' }}>
              {this.props.status === 0 ? (
                this.props.name
              ) : this.props.status === 1 ? (
                <TextField
                  id="employee"
                  placeholder="ชื่อ"
                  class="employeeinput"
                  defaultValue={this.props.name}
                  onChange={this.handleChange}
                  name="name"
                />
              ) : (
                <TextField
                  id="employee"
                  name="name"
                  placeholder="ชื่อ"
                  class="employeeinput"
                  name="name"
                  onChange={this.handleChange}
                  helperText={this.props.errors.name}
                  error={this.props.errors.name ? true : false}
                />
              )}
              &nbsp;
              {this.props.status === 0 ? (
                this.props.surName
              ) : this.props.status === 1 ? (
                <TextField
                  id="employee"
                  name="surName"
                  placeholder="นามสกุล"
                  class="employeeinput"
                  defaultValue={this.props.surName}
                  onChange={this.handleChange}
                />
              ) : (
                <TextField
                  id="employee"
                  name="surName"
                  placeholder="นามสกุล"
                  class="employeeinput"
                  onChange={this.handleChange}
                  helperText={this.props.errors.surName}
                  error={this.props.errors.surName ? true : false}
                />
              )}
            </div>

            <div class="profile-card__txt">
              Tel&nbsp;
              {this.props.status === 0 ? (
                <strong>{this.props.phone}</strong>
              ) : this.props.status === 1 ? (
                <TextField
                  id="employee"
                  class="employeeinput"
                  defaultValue={this.props.phone}
                  onChange={this.handleChange}
                  name="phone"
                />
              ) : (
                <TextField
                  id="employee"
                  name="phone"
                  class="employeeinput"
                  onChange={this.handleChange}
                  helperText={this.props.errors.phone}
                  error={this.props.errors.phone ? true : false}
                />
              )}
            </div>
            <div class="profile-card__txt">
              Password&nbsp;
              {this.props.status === 0 ? (
                '******'
              ) : this.props.status === 1 ? (
                <TextField
                  id="employee"
                  name="password"
                  class="employeeinput"
                  defaultValue={this.props.password}
                  onChange={this.handleChange}
                />
              ) : (
                <TextField
                  id="employee"
                  name="password"
                  class="employeeinput"
                  helperText={this.props.errors.password}
                  error={this.props.errors.password ? true : false}
                  onChange={this.handleChange}
                />
              )}
            </div>
            <div class="profile-card-inf">
              <div class="profile-card-inf__item">
                <div class="profile-card-inf__title">
                  {this.props.status === 0 ? (
                    this.props.email
                  ) : this.props.status === 1 ? (
                    <TextField
                      id="employee"
                      name="email"
                      style={{
                        padding: '12px 20px',
                        margin: '8px 0',
                        display: 'inline-block',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        boxSizing: 'border-box',
                      }}
                      defaultValue={this.props.email}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <TextField
                      id="employee"
                      name="email"
                      style={{
                        padding: '12px 20px',
                        margin: '8px 0',
                        display: 'inline-block',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        boxSizing: 'border-box',
                      }}
                      onChange={this.handleChange}
                      helperText={this.props.errors.email}
                      error={this.props.errors.email ? true : false}
                    />
                  )}
                </div>
                <div class="profile-card-inf__txt">Email</div>
              </div>
            </div>
            <div class="profile-card-social">
              {this.props.status === 0 ? (
                <a class="profile-card-social__item codepen" target="_blank">
                  <span class="icon-font">{this.props.role}</span>
                </a>
              ) : this.props.status === 1 ? (
                <select
                  name="role"
                  id="หน้าที่"
                  value={this.state.role}
                  onChange={(e) => this.setState({ role: e.target.value })}
                  style={{
                    margin: 1,
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    width: 100,
                  }}
                >
                  <option value="chef">chef</option>
                  <option value="cash">cash</option>
                </select>
              ) : (
                <select
                  name="role"
                  id="หน้าที่"
                  onChange={this.handleChange}
                  style={{
                    margin: 1,
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    width: 100,
                  }}
                >
                  <option value="chef">chef</option>
                  <option value="cash">cash</option>
                </select>
              )}
            </div>
            {this.props.status === 0 ? (
              <div class="profile-card-ctr">
                <Button
                  class="profile-card__button button--edit"
                  onClick={() => this.props.handleEditOpen()}
                >
                  แก้ไข
                </Button>
                <Button
                  class="profile-card__button button--delete"
                  onClick={() =>
                    this.props.handleOpenDialog(
                      'ยืนยันการลบพนักงาน ?',
                      this.state,
                      this.props.email,
                      'delete'
                    )
                  }
                >
                  ลบ
                </Button>
              </div>
            ) : this.props.status === 1 ? (
              <div class="profile-card-ctr">
                <Button
                  class="profile-card__button button--edit"
                  onClick={() =>
                    this.props.handleOpenDialog(
                      'ยืนยันการแก้ไขข้อมูลพนักงาน ?',
                      this.state,
                      this.state,
                      'edit'
                    )
                  }
                >
                  ยืนยัน
                </Button>
                <Button
                  class="profile-card__button button--delete"
                  onClick={() => this.props.handleEditClose()}
                >
                  ยกเลิก
                </Button>
              </div>
            ) : (
              <div class="profile-card-ctr">
                <Button
                  class="profile-card__button button--edit"
                  onClick={() => {
                    console.log('CALL ADD EMPLOYEE ', this.state);
                    this.props.handleOpenDialog(
                      'ยืนยันการเพิ่มพนักงาน ?',
                      this.state,
                      this.state,
                      'add'
                    );
                  }}
                >
                  ยืนยัน
                </Button>
                <Button
                  class="profile-card__button button--delete"
                  onClick={() => this.props.handleEditCloseWhenAdd()}
                >
                  ยกเลิก
                </Button>
              </div>
            )}
          </div>
        </div>
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
};

export default connect(mapStateToProps, mapActionsToProps)(employeeDetailCard);
