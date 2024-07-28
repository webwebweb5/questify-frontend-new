import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function DashboardBigCard({ title, subtitle, sx, ...other }) {
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
        <Box
          sx={{
            mt: 3,
            width: 1,
            height: 320,
            borderRadius: 2,
            bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
            border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
          }}
        />
      </Box>
    </Card>
  );
}
