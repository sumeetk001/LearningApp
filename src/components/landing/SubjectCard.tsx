import React from 'react';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  useTheme 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Subject } from '../../types';
import { AnimatedBox } from '../animations/PageTransitions';
import { 
  School, 
  Science, 
  MenuBook, 
  Palette, 
  MusicNote, 
  Public,
  Construction 
} from '@mui/icons-material';

interface SubjectCardProps {
  subject: Subject;
  animationDelay?: number;
  isPromoted?: boolean;
}

const getSubjectIcon = (subjectId: string) => {
  const iconProps = { fontSize: 'large' as const, sx: { mb: 1 } };
  
  switch (subjectId) {
    case 'math':
      return <School {...iconProps} />;
    case 'science':
      return <Science {...iconProps} />;
    case 'reading':
      return <MenuBook {...iconProps} />;
    case 'art':
      return <Palette {...iconProps} />;
    case 'music':
      return <MusicNote {...iconProps} />;
    case 'social-studies':
      return <Public {...iconProps} />;
    default:
      return <School {...iconProps} />;
  }
};

const getStatusChip = (status: Subject['status']) => {
  switch (status) {
    case 'coming-soon':
      return (
        <Chip
          label="Coming Soon"
          size="small"
          sx={{
            backgroundColor: 'warning.main',
            color: 'white',
            fontSize: '0.75rem',
            height: 24,
          }}
        />
      );
    case 'maintenance':
      return (
        <Chip
          icon={<Construction sx={{ fontSize: '16px !important' }} />}
          label="Maintenance"
          size="small"
          sx={{
            backgroundColor: 'error.main',
            color: 'white',
            fontSize: '0.75rem',
            height: 24,
          }}
        />
      );
    default:
      return null;
  }
};

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  animationDelay = 0,
  isPromoted = false,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    if (subject.status === 'available') {
      navigate(`/subjects/${subject.id}`);
    }
  };

  const isDisabled = subject.status !== 'available';

  return (
    <AnimatedBox animation="slideUp" delay={animationDelay}>
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          border: isPromoted ? `2px solid ${theme.palette.primary.main}` : 'none',
          boxShadow: isPromoted 
            ? `0 8px 32px ${theme.palette.primary.main}40`
            : undefined,
          ...(isDisabled && {
            opacity: 0.7,
            cursor: 'not-allowed',
          }),
          ...(!isDisabled && {
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 12px 40px ${subject.color.primary}30`,
            },
          }),
        }}
      >
        <CardActionArea
          onClick={handleClick}
          disabled={isDisabled}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: 0,
            minHeight: 200,
            '&:hover .MuiCardActionArea-focusHighlight': {
              opacity: 0.1,
            },
          }}
        >
          {/* Header with icon and status */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${subject.color.primary}, ${subject.color.secondary})`,
              color: 'white',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              minHeight: 120,
              justifyContent: 'center',
            }}
          >
            {isPromoted && (
              <Chip
                label="Popular"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: subject.color.primary,
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
            )}

            <Box sx={{ color: 'white', opacity: 0.9 }}>
              {getSubjectIcon(subject.id)}
            </Box>
            
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {subject.name}
            </Typography>
          </Box>

          {/* Content */}
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 3,
              pb: '24px !important',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                flexGrow: 1,
                fontSize: '0.95rem',
                lineHeight: 1.5,
                textAlign: 'center',
                mb: 2,
              }}
            >
              {subject.description}
            </Typography>

            {/* Footer with difficulty and status */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 'auto',
              }}
            >
              <Chip
                label={subject.difficulty}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                  borderColor: subject.color.primary,
                  color: subject.color.primary,
                  '&:hover': {
                    backgroundColor: `${subject.color.primary}10`,
                  },
                }}
              />
              
              {getStatusChip(subject.status)}
            </Box>
          </CardContent>

          {/* Touch indicator for touch devices */}
          {!isDisabled && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: subject.color.primary,
                opacity: 0.6,
                display: { xs: 'block', md: 'none' },
              }}
            />
          )}
        </CardActionArea>
      </Card>
    </AnimatedBox>
  );
};