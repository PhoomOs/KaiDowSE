import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from '../calculator/calculator';
import useDialog from '../hooks/useDialog';
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
// ***********
const CalculatorDialog = (props, ref) => {
  useImperativeHandle(ref, () => ({
    openDialog: () => openDialog(),
    closeDialog: () => closeDialog(),
  }));
  const [open, openDialog, closeDialog] = useDialog();
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Calculator
            Close={closeDialog}
            priceSummary={props.priceSummary}
            currentId={props.currentId}
            history={props.history}
            handleResetTab={props.handleResetTab}
            orderId={props.orderId}
            store={props.store}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.forwardRef(CalculatorDialog);
