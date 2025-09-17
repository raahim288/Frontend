import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
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

  // ✅ Use environment variable for backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleShowPassword = () => setShowPassword(!showPassword);

  // **Handle Login Submission**
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and password are required!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    try {
  const response = await fetch(`${API_URL}/verify-otp`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, otp }),
});


      const result = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        toast.success(result.message || 'OTP sent to your email!', { position: 'top-right', autoClose: 3000 });
      } else {
        toast.error(result.message || 'Failed to login', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to the server!', { position: 'top-right', autoClose: 3000 });
    }
  };

  // **Handle OTP Verification**
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter the OTP!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'OTP verified successfully!', { position: 'top-right', autoClose: 3000 });
        setTimeout(() => navigate('/LandingDashboard'), 1500);
      } else {
        toast.error(result.message || 'Invalid OTP', { position: 'top-right', autoClose: 3000 });
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
        backgroundColor: 'black',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 60 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          borderRadius: '10px',
          background: 'white',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        <ToastContainer />
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: '20px',
            color: 'black',
            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          Login
        </Typography>

        <FormControl sx={{ width: '100%' }} component="form" onSubmit={handleSubmit}>
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
                    {showPassword ? (
                      <VisibilityIcon sx={{ color: 'black' }} />
                    ) : (
                      <VisibilityOffIcon sx={{ color: 'black' }} />
                    )}
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

          {/* Login Button */}
          <Button
            type="submit"
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

          {/* OTP Verification Section */}
          {isOtpSent && (
            <>
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ mt: 2, mb: 2 }}
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
