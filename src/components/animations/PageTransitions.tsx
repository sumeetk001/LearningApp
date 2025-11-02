import React from 'react';
import { animated, useTransition, useSpring, config } from 'react-spring';
import { Box } from '@mui/material';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isVisible = true,
  direction = 'fade',
  delay = 0,
}) => {
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return { from: { opacity: 0, transform: 'translateY(50px)' } };
      case 'down':
        return { from: { opacity: 0, transform: 'translateY(-50px)' } };
      case 'left':
        return { from: { opacity: 0, transform: 'translateX(50px)' } };
      case 'right':
        return { from: { opacity: 0, transform: 'translateX(-50px)' } };
      default:
        return { from: { opacity: 0, transform: 'scale(0.95)' } };
    }
  };

  const transition = useTransition(isVisible, {
    ...getTransform(),
    to: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px) translateX(0px) scale(1)' : getTransform().from.transform,
    },
    config: config.gentle,
    delay,
  });

  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            {children}
          </animated.div>
        ) : null
      )}
    </>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 600,
}) => {
  const spring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration },
    delay,
  });

  return <animated.div style={spring}>{children}</animated.div>;
};

interface StaggeredFadeInProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
}

export const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({
  children,
  staggerDelay = 100,
  initialDelay = 0,
}) => {
  return (
    <>
      {children.map((child, index) => (
        <FadeIn
          key={index}
          delay={initialDelay + index * staggerDelay}
        >
          {child}
        </FadeIn>
      ))}
    </>
  );
};

interface ScaleOnHoverProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
}

export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({
  children,
  scale = 1.05,
  duration = 200,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const spring = useSpring({
    transform: `scale(${isHovered ? scale : 1})`,
    config: { duration },
  });

  return (
    <animated.div
      style={spring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.div>
  );
};

interface SlideInProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'up' | 'down';
  distance?: number;
  delay?: number;
  duration?: number;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction,
  distance = 50,
  delay = 0,
  duration = 800,
}) => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return `translateX(-${distance}px)`;
      case 'right':
        return `translateX(${distance}px)`;
      case 'up':
        return `translateY(-${distance}px)`;
      case 'down':
        return `translateY(${distance}px)`;
      default:
        return 'translateX(0px)';
    }
  };

  const spring = useSpring({
    from: {
      opacity: 0,
      transform: getInitialTransform(),
    },
    to: {
      opacity: 1,
      transform: 'translateX(0px) translateY(0px)',
    },
    config: config.gentle,
    delay,
  });

  return <animated.div style={spring}>{children}</animated.div>;
};

// Wrapper component for Material-UI Box with animations
interface AnimatedBoxProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  sx?: any;
}

export const AnimatedBox: React.FC<AnimatedBoxProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  sx,
}) => {
  const getAnimation = () => {
    switch (animation) {
      case 'slideUp':
        return { from: { opacity: 0, transform: 'translateY(30px)' } };
      case 'slideDown':
        return { from: { opacity: 0, transform: 'translateY(-30px)' } };
      case 'slideLeft':
        return { from: { opacity: 0, transform: 'translateX(30px)' } };
      case 'slideRight':
        return { from: { opacity: 0, transform: 'translateX(-30px)' } };
      case 'scale':
        return { from: { opacity: 0, transform: 'scale(0.9)' } };
      default:
        return { from: { opacity: 0, transform: 'translateY(10px)' } };
    }
  };

  const spring = useSpring({
    ...getAnimation(),
    to: { opacity: 1, transform: 'translateY(0px) translateX(0px) scale(1)' },
    config: { duration },
    delay,
  });

  return (
    <Box component={animated.div} style={spring} sx={sx}>
      {children}
    </Box>
  );
};