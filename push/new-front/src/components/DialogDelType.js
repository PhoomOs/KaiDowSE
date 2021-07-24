import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Typography } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import React, { useState } from 'react'
import '../collection/iconfollow.css'
const DialogDelType = (props) => {
    const [open, setOpen] = useState(false)
    const openDialog = () => {
        setOpen(true)
    }
    const closeDialog = () => {
        setOpen(false)
    }


    const handleDeleteType = () => {
        props.actionDelete(props.tabId)
        console.log('Tabid has been Deleted ', props.tabId)
        setOpen(false)
    }
    return (
        <div>
            <Button id='delTBut' onClick={openDialog}><DeleteForever color='action' /></Button>
            <Dialog
                open={open}
                onClose={closeDialog}
            >
                <DialogTitle align="left" id="alert-dialog-title">
                    {'ลบหมวดหมู่'}
                </DialogTitle>
                <DialogContent>
                    <Typography>ยืนยันการลบหมวดหมู๋</Typography>
                </DialogContent>
                <DialogActions >
                    <Button onClick={closeDialog} color="primary">
                        ยกเลิก
            </Button>
                    <Button color="primary" autoFocus type="submit" onClick={handleDeleteType}>
                        ยืนยัน
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DialogDelType