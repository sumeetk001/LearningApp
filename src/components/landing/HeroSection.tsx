import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { MediaAsset } from '../../types';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { AnimatedBox } from '../animations/PageTransitions';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  heroImage: MediaAsset;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  heroImage,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: { xs: '60vh', md: '70vh' },
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Text Content */}
          <AnimatedBox animation="slideRight" delay={0}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: 'white',
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: { xs: 1.2, md: 1.1 },
              }}
            >
              {title}
            </Typography>
            
            <Typography
              variant="h4"
              component="p"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                mb: 4,
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                lineHeight: 1.4,
                maxWidth: { md: '90%' },
              }}
            >
              {subtitle}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: { xs: 'stretch', sm: 'center' },
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  padding: '12px 24px',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textAlign: 'center',
                  }}
                >
                  Ages 5-12 • Safe & Fun Learning
                </Typography>
              </Box>
            </Box>
          </AnimatedBox>

          {/* Hero Image */}
          <AnimatedBox animation="slideLeft" delay={200}>
            <Box
              sx={{
                position: 'relative',
                transform: { md: 'rotate(2deg)' },
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: { md: 'rotate(0deg) scale(1.02)' },
                },
              }}
            >
              <ResponsiveImage
                asset={heroImage}
                priority={true}
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  '& img': {
                    borderRadius: 4,
                  },
                }}
              />
              
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  width: 60,
                  height: 60,
                  backgroundColor: theme.palette.warning.main,
                  borderRadius: '50%',
                  display: { xs: 'none', md: 'block' },
                  opacity: 0.8,
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -15,
                  left: -15,
                  width: 40,
                  height: 40,
                  backgroundColor: theme.palette.success.main,
                  borderRadius: '50%',
                  display: { xs: 'none', md: 'block' },
                  opacity: 0.8,
                  animation: 'float 3s ease-in-out infinite 1.5s',
                }}
              />
            </Box>
          </AnimatedBox>
        </Box>
      </Container>

      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          display: { xs: 'none', lg: 'block' },
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '2%',
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          display: { xs: 'none', lg: 'block' },
        }}
      />
    </Box>
  );
};