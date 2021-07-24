import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { validateAddEmployee } from '../util/validation.js';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ConfirmDialog = (props) => {
  const [openSnack, setOpenSnack] = useState(false);
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const onSuccessDialog = () => {
    ////onSuccess in super
    console.log('After onSuccessDialog ', props.content);
    setOpenSnack(true);
    props.handleClose();

    const { valid, errors } = validateAddEmployee(props.content);
    if (props.check2 === 'delete') {
      props.onSuccess(props.data);
    } else {
      if (!valid) {
        console.log('err', errors);
        props.setErrors(errors);
      } else if (valid) {
        props.onSuccess(props.data);
      }
    }
  };

  const onUnSuccess = (handleClose) => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align="left" id="alert-dialog-title">
          {props.header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.check2 === 'delete'
              ? 'ยืนยันที่จะลบ?'
              : Object.keys(props.content).map((key, index) =>
                  key !== 'errors' ? (
                    <h5>{key + ' : ' + props.content[key]} </h5>
                  ) : (
                    console.log()
                  )
                )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => onUnSuccess(props.handleClose)}
          >
            ยกเลิก
          </Button>
          <Button onClick={() => onSuccessDialog()} color="primary" autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
      {/* <div className={classes.root}>
        <Snackbar
          open={openSnack}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </div> */}
    </div>
  );
};

export default ConfirmDialog;
