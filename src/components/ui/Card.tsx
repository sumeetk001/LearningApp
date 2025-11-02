import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

interface CustomCardProps extends MuiCardProps {
  children: React.ReactNode;
  interactive?: boolean;
  elevation?: number;
}

export const Card: React.FC<CustomCardProps> = ({
  children,
  interactive = false,
  elevation = 2,
  sx,
  ...props
}) => {
  return (
    <MuiCard
      elevation={elevation}
      sx={{
        borderRadius: 3,
        transition: 'all 0.3s ease-in-out',
        ...(interactive && {
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => theme.shadows[8],
          },
          '&:active': {
            transform: 'translateY(-2px)',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
};