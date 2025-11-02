import React from 'react';
import { Box, Typography } from '@mui/material';
import { Subject } from '../../types';
import { SubjectCard } from './SubjectCard';
import { AnimatedBox } from '../animations/PageTransitions';

interface SubjectGridProps {
  subjects: Subject[];
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects }) => {
  // Separate available and coming soon subjects
  const availableSubjects = subjects.filter(subject => subject.status === 'available');
  const comingSoonSubjects = subjects.filter(subject => subject.status === 'coming-soon');
  const maintenanceSubjects = subjects.filter(subject => subject.status === 'maintenance');

  // Promote popular subjects (you can customize this logic)
  const promotedSubjects = ['math', 'reading', 'science'];

  return (
    <Box>
      {/* Available Subjects */}
      {availableSubjects.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <AnimatedBox animation="fadeIn" delay={100}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                textAlign: 'center',
                mb: 4,
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              Start Learning Now!
            </Typography>
          </AnimatedBox>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: { xs: 3, md: 4 },
              mb: 4,
            }}
          >
            {availableSubjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                animationDelay={200 + index * 100}
                isPromoted={promotedSubjects.includes(subject.id)}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Coming Soon Subjects */}
      {comingSoonSubjects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <AnimatedBox animation="fadeIn" delay={300}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                textAlign: 'center',
                mb: 3,
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              Coming Soon
            </Typography>
          </AnimatedBox>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {comingSoonSubjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                animationDelay={400 + index * 100}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Maintenance Subjects (if any) */}
      {maintenanceSubjects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <AnimatedBox animation="fadeIn" delay={500}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textAlign: 'center',
                mb: 3,
                fontWeight: 600,
                color: 'warning.main',
              }}
            >
              Temporarily Unavailable
            </Typography>
          </AnimatedBox>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {maintenanceSubjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                animationDelay={600 + index * 100}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Empty state */}
      {subjects.length === 0 && (
        <AnimatedBox animation="fadeIn" delay={200}>
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              No subjects available yet
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
            >
              We're working hard to bring you amazing learning content!
            </Typography>
          </Box>
        </AnimatedBox>
      )}

      {/* Learning progress indicator */}
      <AnimatedBox animation="slideUp" delay={800}>
        <Box
          sx={{
            mt: 6,
            p: 4,
            backgroundColor: 'primary.main',
            borderRadius: 3,
            textAlign: 'center',
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              mb: 2,
              fontWeight: 600,
            }}
          >
            Ready to start your learning adventure?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Pick any subject above to begin! Each learning path is designed to be fun, 
            safe, and perfect for kids aged 5-12.
          </Typography>
        </Box>
      </AnimatedBox>
    </Box>
  );
};