import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,Grid,Avatar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const SuccessDialog = ({ open, onClose, message }) => {
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const dialogStyle={align:'center'};
    const contentStyle={align:'center',minWidth: '300px'};

    return (
        <Dialog open={open} onClose={onClose} style={dialogStyle}>
            <DialogTitle>
                
                <Grid align='center'>
                        <Avatar style={avatarStyle}><CheckCircleIcon /></Avatar>  
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

export default SuccessDialog;
