import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  IconButton, 
  Chip,
  Collapse,
  styled,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Close as CloseIcon,
  Star as StarIcon,
  Announcement as AnnouncementIcon,
  TrendingUp as TrendingUpIcon,
  NewReleases as NewReleasesIcon
} from '@mui/icons-material';
import { FeaturedContent, FeaturedAction } from '../../types';

interface FeaturedBannerProps {
  /**
   * Featured content data
   */
  content: FeaturedContent;
  /**
   * Size variant
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Display variant
   */
  variant?: 'elevated' | 'outlined' | 'filled';
  /**
   * Whether the banner can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: (contentId: string) => void;
  /**
   * Callback when action button is clicked
   */
  onActionClick?: (action: FeaturedAction, contentId: string) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether to show the banner in compact mode
   */
  compact?: boolean;
}

const BannerContainer = styled(Paper, {
  shouldForwardProp: (prop) => !['bannerType', 'size', 'compact'].includes(prop as string)
})<{ 
  bannerType: FeaturedContent['type']; 
  size: string; 
  compact: boolean 
}>(({ theme, bannerType, size, compact }) => {
  const getBackgroundColor = () => {
    switch (bannerType) {
      case 'announcement':
        return alpha(theme.palette.info.main, 0.1);
      case 'promotion':
        return alpha(theme.palette.secondary.main, 0.1);
      case 'update':
        return alpha(theme.palette.success.main, 0.1);
      case 'warning':
        return alpha(theme.palette.warning.main, 0.1);
      default:
        return alpha(theme.palette.primary.main, 0.1);
    }
  };

  const getBorderColor = () => {
    switch (bannerType) {
      case 'announcement':
        return theme.palette.info.main;
      case 'promotion':
        return theme.palette.secondary.main;
      case 'update':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    position: 'relative',
    backgroundColor: getBackgroundColor(),
    borderLeft: `4px solid ${getBorderColor()}`,
    borderRadius: theme.shape.borderRadius,
    padding: compact 
      ? theme.spacing(1, 2) 
      : size === 'small' 
        ? theme.spacing(2) 
        : size === 'large' 
          ? theme.spacing(3) 
          : theme.spacing(2.5),
    margin: theme.spacing(1, 0),
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[4],
    },
  };
});

const ContentWrapper = styled(Box)<{ compact: boolean }>(({ theme, compact }) => ({
  display: 'flex',
  alignItems: compact ? 'center' : 'flex-start',
  gap: theme.spacing(2),
  width: '100%',
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bannerType'
})<{ bannerType: FeaturedContent['type'] }>(({ theme, bannerType }) => {
  const getIconColor = () => {
    switch (bannerType) {
      case 'announcement':
        return theme.palette.info.main;
      case 'promotion':
        return theme.palette.secondary.main;
      case 'update':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: getIconColor(),
    minWidth: 24,
  };
});

const TextContent = styled(Box)<{ compact: boolean }>(({ theme, compact }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: compact ? 'row' : 'column',
  alignItems: compact ? 'center' : 'flex-start',
  gap: compact ? theme.spacing(2) : theme.spacing(1),
}));

const ActionsWrapper = styled(Box)<{ compact: boolean }>(({ theme, compact }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  flexWrap: compact ? 'nowrap' : 'wrap',
  marginTop: compact ? 0 : theme.spacing(1),
}));

const DismissButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
  width: 32,
  height: 32,
  '&:hover': {
    backgroundColor: alpha(theme.palette.action.hover, 0.1),
  },
}));

const getTypeIcon = (type: FeaturedContent['type']) => {
  switch (type) {
    case 'announcement':
      return <AnnouncementIcon />;
    case 'promotion':
      return <StarIcon />;
    case 'update':
      return <TrendingUpIcon />;
    case 'warning':
      return <NewReleasesIcon />;
    default:
      return <AnnouncementIcon />;
  }
};

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
  content,
  size = 'medium',
  variant = 'elevated',
  dismissible = true,
  onDismiss,
  onActionClick,
  className,
  compact = false,
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    if (onDismiss) {
      // Small delay to allow exit animation
      setTimeout(() => onDismiss(content.id), 200);
    }
  }, [content.id, onDismiss]);

  const handleActionClick = useCallback((action: FeaturedAction) => {
    if (onActionClick) {
      onActionClick(action, content.id);
    }
  }, [content.id, onActionClick]);

  const getBannerVariant = () => {
    switch (variant) {
      case 'outlined':
        return { variant: 'outlined' as const };
      case 'filled':
        return { elevation: 0 };
      default:
        return { elevation: 2 };
    }
  };

  return (
    <Collapse in={isVisible} timeout={200}>
      <BannerContainer
        className={className}
        bannerType={content.type}
        size={size}
        compact={compact}
        {...getBannerVariant()}
      >
        {dismissible && (
          <DismissButton
            onClick={handleDismiss}
            size="small"
            aria-label="Dismiss banner"
          >
            <CloseIcon fontSize="small" />
          </DismissButton>
        )}

        <ContentWrapper compact={compact}>
          <IconWrapper bannerType={content.type}>
            {getTypeIcon(content.type)}
          </IconWrapper>

          <TextContent compact={compact}>
            <Box>
              <Typography
                variant={
                  compact ? 'body2' : 
                  size === 'small' ? 'subtitle2' : 
                  size === 'large' ? 'h6' : 'subtitle1'
                }
                fontWeight={600}
                gutterBottom={!compact}
              >
                {content.title}
              </Typography>
              
              {!compact && content.description && (
                <Typography
                  variant={size === 'large' ? 'body1' : 'body2'}
                  color="text.secondary"
                  gutterBottom
                >
                  {content.description}
                </Typography>
              )}

              {content.badge && (
                <Chip
                  label={content.badge.text}
                  size="small"
                  color={content.badge.color as any}
                  variant={content.badge.variant}
                  sx={{ mt: compact ? 0 : 0.5 }}
                />
              )}
            </Box>

            {content.actions && content.actions.length > 0 && (
              <ActionsWrapper compact={compact}>
                {content.actions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    variant={action.variant || 'contained'}
                    color={action.color || 'primary'}
                    size={compact ? 'small' : size === 'large' ? 'medium' : 'small'}
                    startIcon={action.icon}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </ActionsWrapper>
            )}
          </TextContent>
        </ContentWrapper>
      </BannerContainer>
    </Collapse>
  );
};

export default FeaturedBanner;