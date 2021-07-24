import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import { connect } from 'react-redux';
import '../cellection/nav.css';

class Home extends Component {
  render() {
    return (
      < nav >
        <ul class="menu">
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="/employeem">Employee</a>
          </li>
          <li>
            <a href="/menum">Menu</a>
          </li>
          <li>
            <a href="/graph">Graph</a>
          </li>
          <li>
            <a href="/settingmain">Setting</a>
          </li>
          <li>
            <a href="#!">NULL</a>
          </li>
          <li>
            <a href="#!">NULL</a>
          </li>
        </ul>
      </nav >
    );
  }
}

export default Home;
