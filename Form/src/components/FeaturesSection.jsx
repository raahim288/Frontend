import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
  const features = [
    { title: '10 Math Categories', description: 'Covers everything from basics to complex numbers.' },
    { title: 'Multiple Question Types', description: 'MCQs and True/False questions for engaging learning.' },
    { title: 'Track Results', description: 'Save your scores and view them anytime.' },
    { title: 'Instant Feedback', description: 'Get immediate feedback after completing a quiz.' },
    { title: 'User-Friendly Design', description: 'Clean and intuitive UI to focus on learning.' },
  ];

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">Features & Highlights</Typography>
      <Grid container spacing={4}>
        {features.map((feature, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2">{feature.description}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
