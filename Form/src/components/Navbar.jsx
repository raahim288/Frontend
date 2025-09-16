import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/quiz'); // Navigate to quiz dashboard
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Math Quiz App
        </Typography>
        <Button color="inherit" onClick={goToDashboard}>
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}
