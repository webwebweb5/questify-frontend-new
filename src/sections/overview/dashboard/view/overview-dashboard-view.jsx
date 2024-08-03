'use client';

import { Grid, Link, Stack, Avatar, Typography, ListItemText } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { useAuthContext } from 'src/auth/hooks';

import { DashboardCard } from '../dashboard-card';
import { DashboardBigCard } from '../dashboard-big-card';

// ----------------------------------------------------------------------

export function OverviewDashboardView() {
  const { user } = useAuthContext();

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h3"> Welcome, </Typography>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Avatar
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            // border: (theme) => `solid 2px ${theme.vars.palette.grey['500Channel']}`,
          }}
        >
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <ListItemText
          primary={user?.displayName
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
          secondary={user?.userId}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />
      </Stack>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          {user?.role !== 'ProfAcc' ? (
            <DashboardCard
              title="Join Lab!"
              subtitle="Enter the World of Coding at Questify."
              icon="solar:play-bold"
            />
          ) : (
            <Link href={paths.createLab} underline="none">
              <DashboardCard
                title="Create Lab!"
                subtitle="Create your own world at Questify."
                icon="solar:add-circle-bold"
              />
            </Link>
          )}
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
