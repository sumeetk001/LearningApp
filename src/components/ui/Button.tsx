import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface CustomButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: 'small' | 'medium' | 'large' | 'touch-friendly';
  children: React.ReactNode;
}

export const Button: React.FC<CustomButtonProps> = ({
  size = 'medium',
  children,
  sx,
  ...props
}) => {
  const getSizeProps = () => {
    switch (size) {
      case 'touch-friendly':
        return {
          size: 'large' as const,
          sx: {
            minHeight: 56,
            fontSize: '1.2rem',
            padding: '16px 32px',
            ...sx,
          },
        };
      case 'large':
        return {
          size: 'large' as const,
          sx: {
            minHeight: 48,
            fontSize: '1.1rem',
            ...sx,
          },
        };
      case 'small':
        return {
          size: 'small' as const,
          sx: {
            minHeight: 36,
            fontSize: '0.9rem',
            ...sx,
          },
        };
      default:
        return {
          size: 'medium' as const,
          sx: {
            minHeight: 44,
            fontSize: '1rem',
            ...sx,
          },
        };
    }
  };

  return (
    <MuiButton
      {...getSizeProps()}
      {...props}
    >
      {children}
    </MuiButton>
  );
};