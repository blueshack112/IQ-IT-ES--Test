import { Box, Typography } from '@mui/material';
import React from 'react';
import { pageHeadingSx } from 'modules/app/styles';
import DashboardPage from './components/DashboardPage';

const DashboardScreen = () => {
  return (
    <Box>
      <Typography variant="h2" sx={pageHeadingSx}>
        Dashboard
      </Typography>
      <DashboardPage />
    </Box>
  );
};

export default DashboardScreen;
