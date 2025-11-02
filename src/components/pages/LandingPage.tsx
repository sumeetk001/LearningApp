import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { LANDING_PAGE_DATA } from '../../data/subjects';
import { HeroSection } from '../landing/HeroSection';
import { SubjectGrid } from '../landing/SubjectGrid';
import { AnimatedBox } from '../animations/PageTransitions';

export const LandingPage: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection
        title={LANDING_PAGE_DATA.title}
        subtitle={LANDING_PAGE_DATA.subtitle}
        heroImage={LANDING_PAGE_DATA.heroImage}
      />
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Section Introduction */}
        <AnimatedBox animation="fadeIn" delay={0}>
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 2,
              }}
            >
              Choose Your Adventure
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.5,
              }}
            >
              Pick a subject to start your learning journey! Each adventure is 
              designed to be fun, engaging, and perfect for young learners.
            </Typography>
          </Box>
        </AnimatedBox>
        
        {/* Subject Grid */}
        <SubjectGrid subjects={LANDING_PAGE_DATA.subjects} />
      </Container>
    </Box>
  );
};