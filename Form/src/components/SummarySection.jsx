import React from 'react';
import { Container, Typography } from '@mui/material';

export default function SummarySection() {
  const summary = `
    Our platform is designed to provide a seamless learning experience. 
    Practice quizzes anytime, track your performance, and focus on areas where you need improvement.
    With a modern, interactive interface, learning math has never been this engaging and fun!
  `;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>Why Choose Math Quiz SaaS?</Typography>
      <Typography variant="body1" paragraph>{summary}</Typography>
    </Container>
  );
}
