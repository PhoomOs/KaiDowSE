import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
} from '@material-ui/core';
import useDialog from '../hooks/useDialog'
import { Button, TextField } from '@material-ui/core';
import { useDispatch } from "react-redux";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import {
    doSomething,
    falseDialog
} from "../redux/action/uiAction";

import { validateAddMenuType } from "../util/validation";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DialogAddMenuType = forwardRef((props, ref) => {
    const [open, openDialog, closeDialog] = useDialog();
    const [typeName, setTypeName] = useState('');
    const dispatch = useDispatch();
    const [isToggled, setIsToggled] = React.useState(false);
    const useStyles = makeStyles({
        switchBase: {

            "&$checked": {
                color: yellow[600]
            },
            "&$checked + $track": {
                backgroundColor: yellow[500]
            }
        },
        checked: {},
        track: {},

    });
    const inClose = () => {
        setTypeName('');
        setIsToggled(false);
        closeDialog();

    }



    useImperativeHandle(ref, () => ({
        openDialog: () => (
            openDialog()
        ),
        closeDialog: () => (

            closeDialog()

        ),
        resetState: () => (
            setTypeName('')
        ),


        getState: () => (
            typeName

        ),

        getTopping: () => (
            isToggled
        )

    })
    );


    const handleAddTab = (e) => {
        e.preventDefault();
        const { valid, errors } = validateAddMenuType(typeName);
        if (!valid) {
            dispatch(
                falseDialog(errors.typeName)
            )
        }
        else {
            props.onSuccess(typeName);
        }


    }
    const stateEdit = React.useCallback(() =>
        setIsToggled(!isToggled),

    );

    const classes = useStyles();
    return (
        <div>
            {/* {console.log('show props UI from store', props.UI)} */}
            <Dialog
                open={open}
                onClose={inClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleAddTab}>
                    <DialogTitle align="left" id="alert-dialog-title">
                        {'เพิ่มหมวดหมู่'}
                    </DialogTitle>
                    <DialogContent style={{ padding: '8px 24px 0px 24px', display: 'column' }} >
                        <TextField
                            variant="outlined"
                            id="addType"
                            name="addType"
                            type="text"
                            width="100"
                            marginRight="10px"
                            marginLeft="10px"
                            value={typeName}
                            onChange={(e) => setTypeName(e.target.value)}
                        />


                        <FormGroup>

                            <FormControlLabel style={{ padding: '8px 0px 0px 0px' }}
                                control={
                                    <Switch
                                        checked={isToggled}
                                        onChange={stateEdit}
                                        value="jason"
                                        color="primary"
                                        classes={{
                                            root: classes.root,
                                            switchBase: classes.switchBase,
                                            thumb: classes.thumb,
                                            track: classes.track,
                                            checked: classes.checked
                                        }}

                                    />
                                }
                                label="เมนูเพิ่มเติม ?"
                            />

                        </FormGroup>

                    </DialogContent>

                    <DialogActions style={{ padding: '0px 0px ' }}>
                        <Button onClick={closeDialog} color="primary">
                            ยกเลิก
            </Button>
                        <Button color="primary" autoFocus type="submit">
                            ยืนยัน
            </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div >

                <Snackbar open={props.UI.sending} autoHideDuration={2000} >
                    <Alert severity="success">
                        ADD Success !!
                </Alert>
                </Snackbar>

                <Snackbar open={props.UI.cantSending} autoHideDuration={2000} >
                    <Alert severity="error">
                        {props.UI.text}
                    </Alert>
                </Snackbar>
            </div>
        </div>)
})

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapActionsToProps = {
    doSomething,
    falseDialog
};


export default connect(mapStateToProps, mapActionsToProps, null, { forwardRef: true })(DialogAddMenuType);