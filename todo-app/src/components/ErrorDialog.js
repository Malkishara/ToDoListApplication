import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,Grid,Avatar } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';


const ErrorDialog = ({ open, onClose, message }) => {
    const avatarStyle = { backgroundColor: '#F44336' };
    const dialogStyle={align:'center'};
    const contentStyle={align:'center',minWidth: '300px'};
    
    

    return (
        <Dialog open={open} onClose={onClose} style={dialogStyle}>
            <DialogTitle>
                <Grid align='center'>
                        <Avatar style={avatarStyle}><ErrorIcon /></Avatar>  
                    </Grid>
            </DialogTitle>
            <DialogContent style={contentStyle}>
                <Typography align='center'>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
