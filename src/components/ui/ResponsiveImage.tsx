import React, { useState, useCallback } from 'react';
import { Box, Skeleton } from '@mui/material';
import { MediaAsset } from '../../types';

interface ResponsiveImageProps {
  asset: MediaAsset;
  sizes?: string;
  style?: React.CSSProperties;
  sx?: any;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  asset,
  sizes = '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw',
  style,
  sx,
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  if (hasError) {
    return (
      <Box
        sx={{
          width: asset.width,
          height: asset.height,
          backgroundColor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'grey.600',
          fontSize: '0.875rem',
          ...sx,
        }}
        style={style}
      >
        Image not available
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', ...sx }} style={style}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={asset.width}
          height={asset.height}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 'inherit',
          }}
        />
      )}
      <Box
        component="img"
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={sizes}
        alt={asset.altText}
        loading={priority ? 'eager' : (asset.loadingStrategy === 'critical' ? 'eager' : asset.loadingStrategy || 'lazy')}
        onLoad={handleLoad}
        onError={handleError}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        style={{
          aspectRatio: `${asset.width} / ${asset.height}`,
        }}
      />
    </Box>
  );
};