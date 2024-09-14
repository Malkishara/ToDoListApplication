import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';


const Header = () => {
    const header={ backgroundColor: '#1976d2', }
    const title={flexGrow: 1,
        textAlign: 'center',}
    

  return (
    <AppBar position="static" style={header}>
      <Toolbar>
        <Typography variant="h4" style={title}>
          Todo List App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
