import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, Chip } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Subject } from '../../types';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { AnimatedBox } from '../animations/PageTransitions';

interface SubjectHeaderProps {
  subject: Subject;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({ subject }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const getDifficultyColor = (difficulty: Subject['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${subject.color.primary}, ${subject.color.secondary})`,
        color: 'white',
        py: { xs: 4, md: 6 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <AnimatedBox animation="slideDown" delay={0}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{
              mb: 3,
              '& .MuiBreadcrumbs-separator': {
                color: 'rgba(255,255,255,0.7)',
              },
            }}
          >
            <Link
              component="button"
              onClick={handleHomeClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                '&:hover': {
                  color: 'white',
                  textDecoration: 'underline',
                },
              }}
            >
              <Home sx={{ mr: 0.5, fontSize: '1rem' }} />
              Home
            </Link>
            <Typography
              color="white"
              sx={{ fontSize: '0.875rem', fontWeight: 500 }}
            >
              {subject.name}
            </Typography>
          </Breadcrumbs>
        </AnimatedBox>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 300px' },
            gap: { xs: 3, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Text Content */}
          <AnimatedBox animation="slideRight" delay={200}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  mb: 2,
                }}
              >
                {subject.name}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 400,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  mb: 3,
                  opacity: 0.95,
                  lineHeight: 1.4,
                }}
              >
                {subject.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  label={`${subject.difficulty} level`}
                  color={getDifficultyColor(subject.difficulty)}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-label': {
                      textTransform: 'capitalize',
                    },
                  }}
                />
                
                <Chip
                  label="Ages 5-12"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          </AnimatedBox>

          {/* Cover Image */}
          <AnimatedBox animation="slideLeft" delay={400}>
            <Box
              sx={{
                position: 'relative',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'rotate(0deg) scale(1.05)',
                },
              }}
            >
              <ResponsiveImage
                asset={{
                  id: `${subject.id}-cover`,
                  altText: `${subject.name} learning activities and materials`,
                  src: subject.coverImage,
                  width: 300,
                  height: 200,
                  loadingStrategy: 'eager',
                }}
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  '& img': {
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </AnimatedBox>
        </Box>
      </Container>

      {/* Background Decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          display: { xs: 'none', lg: 'block' },
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '3%',
          width: 80,
          height: 80,
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          display: { xs: 'none', lg: 'block' },
        }}
      />
    </Box>
  );
};