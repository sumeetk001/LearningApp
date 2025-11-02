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
import ProgressBadge from '../ui/ProgressBadge';
import TrendingBadge from '../ui/TrendingBadge';
import { 
  School, 
  Science, 
  MenuBook, 
  Palette, 
  MusicNote, 
  Public,
  Construction,
  History,
  BugReport,
  FlightTakeoff,
  Accessibility,
  Landscape
} from '@mui/icons-material';

interface SubjectCardProps {
  subject: Subject;
  animationDelay?: number;
  isPromoted?: boolean;
  progress?: number; // Progress percentage (0-100)
  showProgress?: boolean;
  showTrending?: boolean;
  showCategory?: boolean;
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
    case 'ancient-civilizations':
      return <History {...iconProps} />;
    case 'insects':
      return <BugReport {...iconProps} />;
    case 'physics':
      return <Science {...iconProps} />;
    case 'birds':
      return <FlightTakeoff {...iconProps} />;
    case 'human-body':
      return <Accessibility {...iconProps} />;
    case 'rocks-and-minerals':
      return <Landscape {...iconProps} />;
    default:
      return <School {...iconProps} />;
  }
};

const getCategoryChip = (category: Subject['category'], color: string) => {
  const categoryLabels: Record<Subject['category'], string> = {
    'mathematics': 'Math',
    'science': 'Science',
    'language-arts': 'Language',
    'social-studies': 'Social Studies',
    'arts': 'Arts',
    'music': 'Music',
    'physical-education': 'PE',
    'life-skills': 'Life Skills'
  };

  const categoryColors: Record<Subject['category'], string> = {
    'mathematics': '#1976d2',
    'science': '#388e3c',
    'language-arts': '#f57c00',
    'social-studies': '#7b1fa2',
    'arts': '#e91e63',
    'music': '#00796b',
    'physical-education': '#ff5722',
    'life-skills': '#795548'
  };

  return (
    <Chip
      label={categoryLabels[category]}
      size="small"
      sx={{
        fontSize: '0.7rem',
        height: 20,
        backgroundColor: categoryColors[category] || color,
        color: 'white',
        fontWeight: 600,
        '& .MuiChip-label': {
          px: 1,
        },
      }}
    />
  );
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
  progress = 0,
  showProgress = true,
  showTrending = true,
  showCategory = true,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    if (subject.status === 'available') {
      navigate(`/subjects/${subject.id}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const isDisabled = subject.status !== 'available';
  const hasProgress = progress > 0;
  const isTrending = showTrending && subject.isTrending;

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
            : isTrending
              ? `0 4px 20px ${theme.palette.error.main}20`
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
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        onKeyPress={handleKeyPress}
        aria-label={`${subject.name} - ${subject.difficulty} difficulty. ${subject.description}${hasProgress ? ` Progress: ${progress}%` : ''}${isTrending ? ' Trending subject!' : ''}`}
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
          {/* Header with icon, status, and badges */}
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
            {/* Top badges row */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                right: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              {/* Category chip */}
              {showCategory && (
                <Box>
                  {getCategoryChip(subject.category, subject.color.primary)}
                </Box>
              )}

              {/* Progress and trending badges */}
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {showProgress && hasProgress && (
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      padding: '2px',
                    }}
                  >
                    <ProgressBadge
                      progress={progress}
                      size="small"
                      variant="circular"
                      color="primary"
                      showPercentage={false}
                      ariaLabel={`${progress}% complete`}
                    />
                  </Box>
                )}
                
                {isTrending && (
                  <TrendingBadge
                    size="small"
                    variant="icon"
                    animation="pulse"
                    showIcon={true}
                    showText={false}
                    ariaLabel="This subject is trending"
                  />
                )}
              </Box>
            </Box>

            {/* Promoted badge */}
            {isPromoted && (
              <Chip
                label="Popular"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 32,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: subject.color.primary,
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
            )}

            {/* Icon and title */}
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

            {/* Lesson count and duration */}
            {subject.lessonCount && (
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  opacity: 0.8,
                  fontSize: '0.75rem',
                }}
              >
                {subject.lessonCount} lessons
                {subject.estimatedDuration && ` • ${subject.estimatedDuration}`}
              </Typography>
            )}
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

            {/* Progress bar for ongoing subjects */}
            {showProgress && hasProgress && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {progress}%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    height: 6,
                    backgroundColor: 'grey.200',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: `${progress}%`,
                      height: '100%',
                      backgroundColor: subject.color.primary,
                      borderRadius: 3,
                      transition: 'width 0.3s ease-in-out',
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* Tags */}
            {subject.tags && subject.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {subject.tags.slice(0, 3).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.7rem',
                      height: 20,
                      borderColor: subject.color.primary,
                      color: subject.color.primary,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                ))}
                {subject.tags.length > 3 && (
                  <Chip
                    label={`+${subject.tags.length - 3}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.7rem',
                      height: 20,
                      borderColor: 'grey.400',
                      color: 'grey.600',
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                )}
              </Box>
            )}

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