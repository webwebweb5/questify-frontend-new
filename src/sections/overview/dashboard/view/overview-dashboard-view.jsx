'use client';

import {
  Box,
  Grid,
  Link,
  Card,
  Stack,
  Tooltip,
  useTheme,
  Typography,
  IconButton,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { AnimateAvatar } from 'src/components/animate';

import { useAuthContext } from 'src/auth/hooks';

import { DashboardCard } from '../dashboard-card';
import { JoinLabDialog } from '../join-lab-dialog';

// ----------------------------------------------------------------------

export function OverviewDashboardView() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const openDialog = useBoolean();

  return (
    <>
      <DashboardContent maxWidth="xl">
        <Typography variant="h3"> Welcome, </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                py: 5,
                px: 3,
                textAlign: 'center',
                height: '100%',
                border: `dashed 2px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.1)}`,
              }}
            >
              <Stack alignItems="center">
                <AnimateAvatar
                  width={96}
                  slotProps={{
                    avatar: { src: '', alt: user?.displayName },
                    overlay: {
                      border: 2,
                      spacing: 3,
                      color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
                    },
                  }}
                >
                  {user?.displayName?.charAt(0).toUpperCase()}
                </AnimateAvatar>

                <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
                  {user?.displayName
                    .toLowerCase()
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }} noWrap>
                  <Iconify icon="material-symbols:alternate-email" sx={{ mr: 0.5 }} />
                  {user?.email}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }} noWrap>
                  <Iconify icon="material-symbols:location-city-rounded" sx={{ mr: 0.5 }} />
                  {user?.organization_name_EN}
                </Typography>

                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }} noWrap>
                  <Iconify icon="material-symbols:id-card" sx={{ mr: 0.5 }} /> {user?.userId}
                </Typography>

                {user?.role === 'StdAcc' ? (
                  <Label color="info" sx={{ mt: 1.5 }}>
                    Student
                  </Label>
                ) : (
                  <Label color="secondary" sx={{ mt: 1.5 }}>
                    Professor
                  </Label>
                )}
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={8} justifyContent="center" alignContent="Center">
            <>
              {user?.role !== 'ProfAcc' ? (
                <Box onClick={openDialog.onTrue} sx={{ cursor: 'pointer', mb: 3 }}>
                  <DashboardCard
                    title="Join Lab!"
                    subtitle="Enter the World of Coding at Questify."
                    icon="solar:play-bold"
                  />
                </Box>
              ) : (
                <Box sx={{ cursor: 'pointer', mb: 3 }}>
                  <Link href={paths.createLab}>
                    <DashboardCard
                      title="Create Lab!"
                      subtitle="Create your own world at Questify."
                      icon="solar:add-circle-bold"
                    />
                  </Link>
                </Box>
              )}
            </>
            <Link href={paths.recentLab.root}>
              <DashboardCard
                title="History"
                subtitle="See your recent lab."
                icon="solar:history-bold"
                color="warning"
              />
            </Link>
          </Grid>

          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              mx: 'auto',
              mb: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <Iconify width={16} icon="material-symbols:alternate-email" sx={{ mr: 0.5 }} />
              Questify
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Tooltip title="Asst. Prof. Pathathai Na Lampoon">
                <IconButton>
                  <Box
                    alt="profile pattathai"
                    component="img"
                    src={`${CONFIG.site.basePath}/assets/icons/profile/pattathai_ic.svg`}
                    width={32}
                    height={32}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="Phiriyakorn Maneekongrit">
                <IconButton sx={{ mr: -0.5 }}>
                  <Box
                    alt="profile web"
                    component="img"
                    src={`${CONFIG.site.basePath}/assets/icons/profile/web_ic.svg`}
                    width={32}
                    height={32}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="Sorawee Sriphakdeephongdej">
                <IconButton>
                  <Box
                    alt="profile vee"
                    component="img"
                    src={`${CONFIG.site.basePath}/assets/icons/profile/vee_ic.svg`}
                    width={32}
                    height={32}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Grid>
      </DashboardContent>

      <JoinLabDialog open={openDialog.value} onClose={openDialog.onFalse} />
    </>
  );
}
