import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ mt: 4, py: 3, backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Math Quiz SaaS. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="#" color="inherit" underline="hover">Privacy Policy</Link> | 
        <Link href="#" color="inherit" underline="hover"> Terms of Service</Link>
      </Typography>
    </Box>
  );
}
