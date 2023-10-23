import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
export default function AlertDialog(props) {
    const { openDialog, handleClose, title, dialogFunction } = props



    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {/* {"Use Google's location service?"} */}
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>

                    </Alert>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={dialogFunction} >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}