import { Stack, Button, Divider, Typography } from '@mui/material';

import { maxLine } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function LabMainStudent() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h4"> UX/UI </Typography>
          <Typography variant="body2" sx={{ ...maxLine({ line: 1 }), color: 'text.secondary' }}>
            Duration 15 min(s).
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Points</Typography>
          <Typography variant="body1" sx={{ ...maxLine({ line: 1 }), color: 'text.secondary' }}>
            0/10
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h4" noWrap>
          Lorem ipsum dolor sit amet.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae tempore sit enim est
          itaque provident error possimus corrupti! Quam quos qui officiis quaerat, beatae
          blanditiis facilis ipsa. Nostrum voluptatum veritatis provident adipisci quidem velit
          maxime odit eveniet repudiandae! Quas, et eveniet fugiat quo obcaecati a id vitae
          consequatur nemo ad.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          sx={{ py: 1.5, mr: 2, mt: 3, width: 'fit-content' }}
          startIcon={<Iconify icon="carbon:play-filled-alt" />}
        >
          Start Lab
        </Button>
      </Stack>
    </>
  );
}
