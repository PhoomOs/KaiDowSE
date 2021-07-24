import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
function Alert(props) {
  return (
    <Snackbar open={props.open} autoHideDuration={2000} onClose={props.onClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={props.onClose}
        severity={props.severity}
      >
        {props.children}
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert;