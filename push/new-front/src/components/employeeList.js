import React, { Component, PureComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme } from '@material-ui/core/styles';
import { Grid, Button, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import '../collection/tools.css';

class EmployeeList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: true,
    };
  }

  handleClick = (event) => {
    this.setState((state) => ({
      edit: !state.edit,
    }));
  };

  render() {
    // console.log('this.props.data.userImage ',this.props.data.userImage)
    return (
      <Card
        class="card_item"
        style={{
          width: '250%',
          height: '12%',
          borderRadius: 20,
          marginTop: '30%',
          padding: '20%',
          fontFamily: 'Quicksand',
        }}
        onClick={(e) => this.props.onSelectList(e, this.props.data.email)}
      >
        <img
          src={this.props.data.userImage}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'absolute',
            marginTop: '1%',
            marginLeft: '-5%',
            boxShadow: '0px 0px 0px 3px #fff,0px 2px 10px 1px #333',
          }}
        />
        <Typography>
          {this.props.data.name}
          <br />
          {this.props.data.surName}
        </Typography>
      </Card>
    );
  }
}

export default EmployeeList;
