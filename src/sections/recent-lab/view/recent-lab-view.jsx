'use client';

import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { LabList } from '../lab-list';

// ----------------------------------------------------------------------

export function RecentLabView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 2 }}>
        Recent Lab
      </Typography>

      <LabList />
    </DashboardContent>
  );
}
