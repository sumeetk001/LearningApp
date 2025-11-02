import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Button,
  Chip
} from '@mui/material';
import { 
  PlayArrow, 
  Star,
  Lock
} from '@mui/icons-material';
import { Subject } from '../../types';
import { AnimatedBox } from '../animations/PageTransitions';

interface SubjectContentProps {
  subject: Subject;
}

export const SubjectContent: React.FC<SubjectContentProps> = ({ subject }) => {
  const isComingSoon = subject.status === 'coming-soon';
  const isMaintenance = subject.status === 'maintenance';

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Status Message */}
      {(isComingSoon || isMaintenance) && (
        <AnimatedBox animation="fadeIn" delay={0}>
          <Box
            sx={{
              textAlign: 'center',
              p: 4,
              mb: 6,
              backgroundColor: isComingSoon ? 'warning.light' : 'error.light',
              borderRadius: 3,
              color: 'white',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {isComingSoon ? '🚧 Coming Soon!' : '⚠️ Temporarily Unavailable'}
            </Typography>
            <Typography variant="body1">
              {isComingSoon
                ? `We're working hard to bring you amazing ${subject.name} content. Check back soon!`
                : `${subject.name} is currently under maintenance. Please try again later.`}
            </Typography>
          </Box>
        </AnimatedBox>
      )}

      {/* Available Content */}
      {!isComingSoon && !isMaintenance && (
        <>
          {/* Introduction Section */}
          <AnimatedBox animation="slideUp" delay={100}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  fontWeight: 600,
                  color: subject.color.primary,
                }}
              >
                What will you learn?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Choose from different types of activities designed to make learning {subject.name.toLowerCase()} 
                fun and engaging. Each activity is crafted for young learners aged 5-12.
              </Typography>
            </Box>
          </AnimatedBox>

          {/* Simple Learning Options */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 4,
              mb: 6,
            }}
          >
            {['Interactive Lessons', 'Practice Games', 'Fun Projects', 'Group Activities'].map((title, index) => (
              <AnimatedBox key={title} animation="slideUp" delay={200 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${subject.color.primary}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: `${subject.color.primary}15`,
                        color: subject.color.primary,
                        mb: 2,
                        display: 'inline-flex',
                      }}
                    >
                      <PlayArrow fontSize="large" />
                    </Box>
                    
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Engaging {subject.name.toLowerCase()} activities designed for young learners.
                    </Typography>

                    <Chip
                      label="Beginner"
                      size="small"
                      color="success"
                      sx={{ mb: 2 }}
                    />

                    <Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: subject.color.primary,
                          color: subject.color.primary,
                          '&:hover': {
                            backgroundColor: `${subject.color.primary}10`,
                          },
                        }}
                        startIcon={<PlayArrow />}
                      >
                        Start Learning
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </AnimatedBox>
            ))}
          </Box>

          {/* Call to Action */}
          <AnimatedBox animation="slideUp" delay={600}>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${subject.color.primary}, ${subject.color.secondary})`,
                borderRadius: 3,
                p: 4,
                textAlign: 'center',
                color: 'white',
              }}
            >
              <Star sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Ready to become a {subject.name} expert?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Start with any activity above and build your knowledge step by step!
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  },
                  minHeight: 48,
                }}
              >
                Get Started Today
              </Button>
            </Box>
          </AnimatedBox>
        </>
      )}

      {/* Coming Soon Placeholder */}
      {isComingSoon && (
        <AnimatedBox animation="slideUp" delay={200}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 4,
            }}
          >
            {[1, 2, 3, 4].map((index) => (
              <Card
                key={index}
                sx={{
                  height: 200,
                  opacity: 0.6,
                }}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Lock sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Learning Activity {index}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Coming Soon
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </AnimatedBox>
      )}
    </Container>
  );
};