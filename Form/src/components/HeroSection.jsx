import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function HeroSection({ onStartQuiz }) {
  const summary = `
    Welcome to the Math Quiz SaaS application! Our platform is designed to help students and learners
    of all levels practice and improve their math skills efficiently. With over 10 categories of quizzes,
    including Algebra, Trigonometry, Calculus, Probability, Geometry, Vectors, and Complex Numbers, 
    you can take focused quizzes tailored to your learning needs.
  `;

  return (
    <Box sx={{ bgcolor: '#e3f2fd', py: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>Welcome to Math Quiz SaaS</Typography>
      <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>{summary}</Typography>
      <Button variant="contained" color="primary" onClick={onStartQuiz}>Start Quiz Now</Button>
    </Box>
  );
}
