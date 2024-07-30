import { Card, Stack, CardHeader, Typography } from '@mui/material';

import { Field } from 'src/components/hook-form';

export default function LabQuestionProblemForm() {
  return (
    <Card>
      <CardHeader title="Instruction" />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Lab Title</Typography>
          <Field.Text name="title" placeholder="e.g. calculate area of triangle" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Problem statement</Typography>
          <Field.Editor fullItem name="problemStatement" sx={{ maxHeight: 480 }} />
        </Stack>
      </Stack>
    </Card>
  );
}
