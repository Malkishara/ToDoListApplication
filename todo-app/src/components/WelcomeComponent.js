import React,{useState,useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function WelcomeComponent() {
  
  const [user,setUser]=useState({});
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userString=localStorage.getItem('loggedInUser');
    if (userString) {
        
       setUser(JSON.parse(userString));
        
      } else {
        console.log('No user data found in localStorage');
      }
  }, []);

  const handleLogout = () => {
    const result = logout();
    if (result.success) {
            navigate('/login');
    }
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container alignItems="center">
         
          <Grid item xs={6} style={{ textAlign: 'left' }}>
            <Typography variant="h6">
              Welcome, {user.name}
            </Typography>
          </Grid>
          
         
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default WelcomeComponent;
