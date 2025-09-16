import React, { useState } from 'react';
import { Box, Button, FormControl, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();


  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const data = { email, password };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsOtpSent(true); // Show OTP input field
        toast.success(result.message, { position: 'top-right', autoClose: 3000 });
      } else {
        toast.error('Error: ' + result.message, { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to the server!', { position: 'top-right', autoClose: 3000 });
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message, { position: 'top-right', autoClose: 3000 });
        navigate('/navbar');
      } else {
        toast.error('Error: ' + result.message, { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to the server!', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black', // Set background color to black
        padding: '2rem',
        perspective: '1200px', // 3D effect on the container
      }}
    >
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 60 }}
        style={{
          width: '400px',
          padding: '2rem',
          borderRadius: '10px',
          background: 'white',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        <ToastContainer />
        <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: 'black' }}>
          Login
        </Typography>

        <FormControl sx={{ width: '100%', p: 2 }} onSubmit={handleSubmit}>
          {/* Email Input */}
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'black' }} />
                </InputAdornment>
              ),
            }}

            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          {/* Password Input */}
          <TextField

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsIcon sx={{ color: 'black' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityIcon sx={{ color: 'black' }} /> : <VisibilityOffIcon sx={{ color: 'black' }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#3f51b5',
              '&:hover': { backgroundColor: '#303f9f' },
              padding: '10px 20px',
              transition: '0.3s',
            }}
          >
            Login
          </Button>
         <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      marginTop: '10px',
                      color: 'gray',
                      fontSize: { xs: '0.8rem', sm: '1rem' },
                    }}
                  >
                    Don't have an account?{' '}
                    <Button
                      variant="text"
                      onClick={() => navigate('/')}
                      sx={{ color: '#3f51b5', fontSize: 'inherit' }}
                    >
                      Register
                    </Button>
                  </Typography>

          {/* OTP Input (only visible when OTP is sent) */}
          {isOtpSent && (
            <>
              <TextField
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <Button
                onClick={handleVerifyOtp}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': { backgroundColor: '#388e3c' },
                  padding: '10px 20px',
                  transition: '0.3s',
                }}
              >
                Verify OTP
              </Button>
            </>
          )}
        </FormControl>
      </motion.div>
    </Box>
  );
};
