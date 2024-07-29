import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Stack, Avatar, Button, Tooltip, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export function NavVertical({ sx, data, slots, isNavMini, layoutQuery, onToggleNav, ...other }) {
  const theme = useTheme();

  const renderNavVertical = (
    <>
      {slots?.topArea ?? (
        <Box sx={{ pl: 3.5, pb: 1 }}>
          {/* <Logo /> */}
          <Button
            component={RouterLink}
            href={paths.dashboard.root}
            color="inherit"
            startIcon={<Iconify icon="carbon:chevron-left" />}
            sx={{ mt: 3, width: 'fit-content' }}
          >
            Back
          </Button>

          <Avatar
            alt="Two Sum"
            src=""
            variant="rounded"
            sx={{ width: 58, height: 58, mb: 1, mt: 3, ml: 1 }}
          >
            T
          </Avatar>

          <Typography variant="h6" sx={{ my: 2, ml: 1, mr: 1 }}>
            Two Sum
          </Typography>

          <Stack spacing={1}>
            <Typography variant="body2">Invitation Code: </Typography>
            <Tooltip title="Click to copy" placement="right" arrow>
              <Button
                variant="contained"
                startIcon={<Iconify icon="carbon:copy" />}
                // onClick={() => onCopy(classroom?.invitationCode)}
                sx={{ width: 'fit-content' }}
              >
                123456
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      )}

      <Scrollbar fillContent>
        <NavSectionVertical data={data} sx={{ px: 2, pl: 3, flex: '1 1 auto' }} {...other} />
      </Scrollbar>
    </>
  );

  return (
    <Box
      sx={{
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        transition: theme.transitions.create(['width'], {
          easing: 'var(--layout-transition-easing)',
          duration: 'var(--layout-transition-duration)',
        }),
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      {/* <NavToggleButton
        isNavMini={isNavMini}
        onClick={onToggleNav}
        sx={{
          display: 'none',
          [theme.breakpoints.up(layoutQuery)]: {
            display: 'inline-flex',
          },
        }}
      /> */}
      {renderNavVertical}
    </Box>
  );
}
