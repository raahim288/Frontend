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
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  // ✅ Use environment variable for backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleShowPassword = () => setShowPassword(!showPassword);

  const validateEmail = (email) => email.includes('@');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before sending request
    if (!name || !email || !password) {
      toast.error('All fields are required!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (emailError || !validateEmail(email)) {
      toast.error('Please enter a valid email address.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const data = { name, email, password };

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      toast.success('User registered successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to the server!', {
        position: 'top-right',
        autoClose: 3000,
      });
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
          Sign Up
        </Typography>

        <FormControl sx={{ width: '100%' }} component="form" onSubmit={handleSubmit}>
          {/* Name Input */}
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DriveFileRenameOutlineIcon sx={{ color: 'black' }} />
                </InputAdornment>
              ),
            }}
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

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
            onChange={handleEmailChange}
            sx={{ mb: 2 }}
            required
            error={emailError}
            helperText={emailError ? 'Invalid email address' : ''}
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

          {/* Register Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#3f51b5',
              '&:hover': { backgroundColor: '#303f9f' },
              padding: '10px 20px',
              transition: '0.3s',
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
          >
            Register
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
            Already have an account?{' '}
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{ color: '#3f51b5', fontSize: 'inherit' }}
            >
              Login
            </Button>
          </Typography>
        </FormControl>
      </motion.div>
    </Box>
  );
};
