import React from 'react';
import { Box, Chip, Typography, styled, keyframes } from '@mui/material';
import { Whatshot } from '@mui/icons-material';

interface TrendingBadgeProps {
  /**
   * Size variant for the badge
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Display variant
   */
  variant?: 'chip' | 'icon' | 'text' | 'minimal';
  /**
   * Animation type
   */
  animation?: 'pulse' | 'glow' | 'shake' | 'none';
  /**
   * Whether to show the flame icon
   */
  showIcon?: boolean;
  /**
   * Whether to show the "Trending" text
   */
  showText?: boolean;
  /**
   * Color theme
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Accessible label for screen readers
   */
  ariaLabel?: string;
}

// Animation keyframes
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 152, 0, 0.8), 0 0 30px rgba(255, 152, 0, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5);
  }
`;

const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px);
  }
`;

const TrendingContainer = styled(Box, {
  shouldForwardProp: (prop) => !['animation', 'size'].includes(prop as string)
})<{ animation: string; size: string }>(({ theme, animation, size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  
  // Animation styles
  ...(animation === 'pulse' && {
    animation: `${pulseAnimation} 2s ease-in-out infinite`,
  }),
  ...(animation === 'glow' && {
    animation: `${glowAnimation} 2s ease-in-out infinite`,
    borderRadius: theme.shape.borderRadius,
  }),
  ...(animation === 'shake' && {
    animation: `${shakeAnimation} 0.5s ease-in-out infinite`,
  }),
}));

const TrendingIcon = styled(Whatshot, {
  shouldForwardProp: (prop) => prop !== 'size'
})<{ size: string }>(({ theme, size }) => ({
  color: theme.palette.error.main,
  ...(size === 'small' && {
    fontSize: '1rem',
  }),
  ...(size === 'medium' && {
    fontSize: '1.25rem',
  }),
  ...(size === 'large' && {
    fontSize: '1.5rem',
  }),
}));

const TrendingText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'size'
})<{ size: string }>(({ theme, size }) => ({
  fontWeight: 700,
  color: theme.palette.error.main,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
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

const TrendingBadge: React.FC<TrendingBadgeProps> = ({
  size = 'medium',
  variant = 'chip',
  animation = 'pulse',
  showIcon = true,
  showText = true,
  color = 'error',
  className,
  ariaLabel = 'This subject is trending',
}) => {
  const accessibilityProps = {
    role: 'status',
    'aria-label': ariaLabel,
    'aria-live': 'polite' as const,
  };

  if (variant === 'chip') {
    return (
      <Chip
        className={className}
        icon={showIcon ? <Whatshot /> : undefined}
        label={showText ? 'Trending' : ''}
        size={size === 'large' ? 'medium' : 'small'}
        color={color as any}
        variant="filled"
        sx={{
          fontWeight: 700,
          fontSize: size === 'small' ? '0.75rem' : '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          animation: animation !== 'none' ? `${
            animation === 'pulse' ? pulseAnimation :
            animation === 'glow' ? glowAnimation :
            animation === 'shake' ? shakeAnimation : 'none'
          } ${animation === 'shake' ? '0.5s' : '2s'} ease-in-out infinite` : 'none',
          ...(animation === 'glow' && {
            boxShadow: '0 0 10px rgba(255, 152, 0, 0.6)',
          }),
        }}
        {...accessibilityProps}
      />
    );
  }

  if (variant === 'icon') {
    return (
      <TrendingContainer
        className={className}
        animation={animation}
        size={size}
        {...accessibilityProps}
      >
        <TrendingIcon size={size} />
      </TrendingContainer>
    );
  }

  if (variant === 'text') {
    return (
      <TrendingContainer
        className={className}
        animation={animation}
        size={size}
        {...accessibilityProps}
      >
        <TrendingText size={size}>
          Trending
        </TrendingText>
      </TrendingContainer>
    );
  }

  if (variant === 'minimal') {
    return (
      <TrendingContainer
        className={className}
        animation={animation}
        size={size}
        {...accessibilityProps}
      >
        <TrendingIcon size={size} />
        {showText && (
          <TrendingText size={size} sx={{ fontSize: '0.75rem' }}>
            Hot
          </TrendingText>
        )}
      </TrendingContainer>
    );
  }

  // Default: combined icon and text
  return (
    <TrendingContainer
      className={className}
      animation={animation}
      size={size}
      {...accessibilityProps}
    >
      {showIcon && <TrendingIcon size={size} />}
      {showText && (
        <TrendingText size={size}>
          Trending
        </TrendingText>
      )}
    </TrendingContainer>
  );
};

export default TrendingBadge;