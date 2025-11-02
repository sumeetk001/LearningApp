import React from 'react';
import { Box, CircularProgress, Typography, styled } from '@mui/material';
import { Chip } from '@mui/material';

interface ProgressBadgeProps {
  /**
   * Progress percentage (0-100)
   */
  progress: number;
  /**
   * Size variant for the badge
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Display variant
   */
  variant?: 'circular' | 'chip' | 'minimal';
  /**
   * Color theme
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Whether to show the percentage text
   */
  showPercentage?: boolean;
  /**
   * Accessible label for screen readers
   */
  ariaLabel?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const ProgressContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size'
})<{ size: 'small' | 'medium' | 'large' }>(({ theme, size }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(size === 'small' && {
    width: 32,
    height: 32,
  }),
  ...(size === 'medium' && {
    width: 40,
    height: 40,
  }),
  ...(size === 'large' && {
    width: 48,
    height: 48,
  }),
}));

const ProgressText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'size'
})<{ size: 'small' | 'medium' | 'large' }>(({ theme, size }) => ({
  position: 'absolute',
  fontWeight: 600,
  color: theme.palette.text.primary,
  ...(size === 'small' && {
    fontSize: '0.75rem',
  }),
  ...(size === 'medium' && {
    fontSize: '0.875rem',
  }),
  ...(size === 'large' && {
    fontSize: '1rem',
  }),
}));

const getProgressColor = (progress: number, color: string): string => {
  if (color !== 'primary') return color;
  
  // Dynamic color based on progress
  if (progress >= 90) return 'success';
  if (progress >= 70) return 'primary';
  if (progress >= 40) return 'warning';
  return 'error';
};

const ProgressBadge: React.FC<ProgressBadgeProps> = ({
  progress,
  size = 'medium',
  variant = 'circular',
  color = 'primary',
  showPercentage = true,
  ariaLabel,
  className,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const actualColor = getProgressColor(clampedProgress, color);
  
  const accessibilityProps = {
    role: 'progressbar',
    'aria-valuenow': clampedProgress,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-label': ariaLabel || `Progress: ${clampedProgress}%`,
  };

  if (variant === 'chip') {
    return (
      <Chip
        className={className}
        label={`${clampedProgress}%`}
        size={size === 'large' ? 'medium' : 'small'}
        color={actualColor as any}
        variant="filled"
        sx={{
          fontWeight: 600,
          fontSize: size === 'small' ? '0.75rem' : '0.875rem',
        }}
        {...accessibilityProps}
      />
    );
  }

  if (variant === 'minimal') {
    return (
      <Typography
        className={className}
        variant={size === 'small' ? 'caption' : 'body2'}
        color={`${actualColor}.main`}
        fontWeight={600}
        {...accessibilityProps}
      >
        {clampedProgress}%
      </Typography>
    );
  }

  // Circular variant (default)
  const circularSize = size === 'small' ? 32 : size === 'medium' ? 40 : 48;
  
  return (
    <ProgressContainer size={size} className={className} {...accessibilityProps}>
      <CircularProgress
        variant="determinate"
        value={clampedProgress}
        size={circularSize}
        thickness={size === 'small' ? 3 : 4}
        color={actualColor as any}
        sx={{
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      {showPercentage && (
        <ProgressText size={size}>
          {clampedProgress}%
        </ProgressText>
      )}
    </ProgressContainer>
  );
};

export default ProgressBadge;