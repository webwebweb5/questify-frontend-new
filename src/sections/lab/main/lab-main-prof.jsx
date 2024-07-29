import { Box, Stack, Button, Divider, Typography } from '@mui/material';

import { maxLine } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { LabQuestionItem } from './lab-question-item';

// ----------------------------------------------------------------------

export function LabMainProf({ labQuestions }) {
  if (labQuestions?.length === 0) {
    return <EmptyContent filled title="Laboratory not found" sx={{ my: 3, py: 4 }} />;
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h4"> Two Sum </Typography>
          <Typography variant="body2" sx={{ ...maxLine({ line: 1 }), color: 'text.secondary' }}>
            Duration 15 min(s).
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={{ height: 'fit-content', px: 2, py: 1 }}
          startIcon={<Iconify icon="ic:outline-assignment" />}
          disabled
        >
          Assign Labs
        </Button>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          // lg: 'repeat(4, 1fr)',
        }}
        sx={{ my: 5 }}
      >
        {/* {labQuestions.map((lab, i) => (
          <LabQuestionItem key={lab.laboratoryId} lab={lab} index={i} />
        ))} */}
        <LabQuestionItem />
      </Box>

      <Button
        variant="contained"
        sx={{ py: 1.5, mb: 3 }}
        startIcon={<Iconify icon="mingcute:add-line" />}
        color="info"
      >
        Add New Question
      </Button>
    </>
  );
}
