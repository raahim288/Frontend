import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import SummarySection from './SummarySection';
import Footer from './Footer';

export default function LandingDashboard({ goToQuizDashboard }) {
  return (
    <>
      <Navbar onDashboard={goToQuizDashboard} />
      <HeroSection onStartQuiz={goToQuizDashboard} />
      <FeaturesSection />
      <SummarySection />
      <Footer />
    </>
  );
}
