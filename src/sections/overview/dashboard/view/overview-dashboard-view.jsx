'use client';

import { Grid, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { DashboardCard } from '../dashboard-card';
import { DashboardBigCard } from '../dashboard-big-card';

// ----------------------------------------------------------------------

export function OverviewDashboardView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h3"> Welcome, </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <DashboardCard
            title="Join Lab!"
            subtitle="Enter the World of Coding at Questify."
            icon="solar:play-bold"
          />
          {/* <DashboardCard
            title="Create Lab!"
            subtitle="Create your own world at Questify."
            icon="solar:add-circle-bold"
          /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardCard
            title="History"
            subtitle="See your recent lab."
            icon="solar:history-bold"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <DashboardBigCard
            title="Still Active Lab"
            subtitle="See your active lab."
            icon="solar:history-bold"
            color="warning"
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
