import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { School, Security, Favorite } from '@mui/icons-material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.100',
        borderTop: '1px solid',
        borderColor: 'grey.300',
        mt: 'auto',
        py: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            alignItems: 'start',
            justifyItems: { xs: 'center', md: 'start' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Brand Section */}
          <Box sx={{ maxWidth: { xs: '100%', md: 300 } }}>
            <Box 
              display="flex" 
              alignItems="center" 
              mb={1}
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <School sx={{ color: 'primary.main', mr: 1 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                }}
              >
                Kids Learning Adventure
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                maxWidth: 300,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              Making learning fun and accessible for children aged 5-12 through 
              interactive educational experiences.
            </Typography>
          </Box>

          {/* Learning Links */}
          <Box sx={{ maxWidth: { xs: '100%', md: 'none' } }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              Learning
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              alignItems: { xs: 'center', md: 'flex-start' }
            }}>
              <Link
                href="/"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  fontSize: '0.875rem',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                All Subjects
              </Link>
              <Link
                href="/subjects/math"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  fontSize: '0.875rem',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Math Adventure
              </Link>
              <Link
                href="/subjects/reading"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  fontSize: '0.875rem',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Reading Journey
              </Link>
              <Link
                href="/subjects/science"
                color="text.secondary"
                underline="hover"
                sx={{ 
                  fontSize: '0.875rem',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Science Explorer
              </Link>
            </Box>
          </Box>

          {/* Safety Section */}
          <Box sx={{ maxWidth: { xs: '100%', md: 'none' } }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              Safe Learning
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <Security sx={{ color: 'success.main', mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2" color="text.secondary">
                COPPA Compliant
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.8rem', 
                lineHeight: 1.4,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              We prioritize your child's privacy and safety. No personal data 
              is collected without parental consent.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'grey.300',
            pt: 3,
            mt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Kids Learning Adventure. Made with{' '}
            <Favorite sx={{ color: 'error.main', fontSize: '1rem', mx: 0.5 }} />
            for young learners.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ 
                fontSize: '0.8rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{ 
                fontSize: '0.8rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms of Use
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};