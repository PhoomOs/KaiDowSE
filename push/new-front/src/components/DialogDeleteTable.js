import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CardActionArea,
} from '@material-ui/core';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import '../collection/iconfollow.css';
import useDialog from '../hooks/useDialog';

const DialogDeleteTable = (props, ref) => {
  const [open, openDialog, closeDialog] = useDialog();
  const [id, setId] = useState('');
  //   console.log('dialogDelete');
  const onSuccess = () => {
    console.log('Call onSuccess DeleteDialog');
    props.onDelete(id);
    closeDialog();
  };
  //   useEffect(() => {
  //     console.log('MOUNTH DIALODDELETE');
  //     return () => {
  //       console.log('return DialogDelete');
  //     };
  //   }, []);

  useImperativeHandle(ref, () => ({
    openDialog: (s) => {
      console.log('open : ', s);
      setId(s);
      return openDialog();
    },
    closeDialog: () => closeDialog(),
  }));
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogContent>
        <Grid>
          <Typography>ยืนยันการลบข้อมูล</Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()} color="primary">
          ยกเลิก
        </Button>
        <Button onClick={() => onSuccess()} color="primary" autoFocus>
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default React.forwardRef(DialogDeleteTable);
