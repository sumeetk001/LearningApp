import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowBack } from '@mui/icons-material';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLandingPage = location.pathname === '/';

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{ 
        backgroundColor: 'primary.main',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }}>
        {!isLandingPage && (
          <Button
            color="inherit"
            onClick={handleBackClick}
            startIcon={<ArrowBack />}
            sx={{
              mr: 2,
              minHeight: 44, // Touch-friendly
              fontSize: '1rem',
            }}
          >
            Back
          </Button>
        )}
        
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            fontWeight: 600,
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={handleHomeClick}
        >
          Kids Learning Adventure
        </Typography>

        <Button
          color="inherit"
          onClick={handleHomeClick}
          startIcon={<Home />}
          sx={{
            minHeight: 44, // Touch-friendly
            fontSize: '1rem',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          Home
        </Button>

        <Box
          component="button"
          onClick={handleHomeClick}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            minHeight: 44,
            minWidth: 44,
            borderRadius: 1,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:focus': {
              outline: '2px solid white',
              outlineOffset: 2,
            },
          }}
        >
          <Home />
        </Box>
      </Toolbar>
    </AppBar>
  );
};