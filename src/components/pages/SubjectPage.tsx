import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

export const SubjectPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 6,
        }}
      >
        <Typography variant="h2" gutterBottom>
          {subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : 'Subject'} Page
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Coming soon! We're preparing awesome {subjectId} content for you.
        </Typography>
      </Box>
    </Container>
  );
};