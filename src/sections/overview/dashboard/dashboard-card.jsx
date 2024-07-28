import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export function DashboardCard({ title, subtitle, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 4,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 1, typography: 'h3' }}>{title}</Box>
        <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
          {subtitle}
        </Box>
      </Box>

      <Iconify width={32} icon={icon} sx={{ flexShrink: 0, color: `${color}.main` }} />

      <SvgColor
        src={`${CONFIG.site.basePath}/assets/background/shape-square.svg`}
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}
