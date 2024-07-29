import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function SettingsItem({ title, sub, action, label, sx, ...other }) {
  return (
    <Paper
      sx={{
        gap: 2,
        display: 'flex',
        position: 'relative',
        alignItems: { md: 'flex-end' },
        flexDirection: { xs: 'column', md: 'row' },
        ...sx,
      }}
      {...other}
    >
      <Stack flexGrow={1} spacing={1}>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2">{title}</Typography>

          {label && label}
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {sub}
        </Typography>
      </Stack>

      {action && action}
    </Paper>
  );
}
