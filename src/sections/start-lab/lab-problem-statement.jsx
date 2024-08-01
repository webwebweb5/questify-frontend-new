import { Stack, Divider, Typography } from '@mui/material';

import { Markdown } from 'src/components/markdown';

export default function LabProblemStatement({ submissions }) {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="h4" noWrap>
        Title
      </Typography>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Markdown children={submissions?.laboratory?.problemStatement || '<p>No Instruction</p>'} />
    </Stack>
  );
}
