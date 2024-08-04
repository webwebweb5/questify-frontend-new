import { useParams } from 'next/navigation';

import { Box, Stack, Button, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useCurrentRole } from 'src/hooks/use-current-role';

import { maxLine } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { LabQuestionItem } from './lab-question-item';

// ----------------------------------------------------------------------

export function LabMainProf({ labQuestions, labInfo }) {
  const params = useParams();

  const role = useCurrentRole();

  const { title, duration } = labInfo;

  if (labQuestions?.length === 0) {
    return <EmptyContent filled title="Laboratory not found" sx={{ my: 3, py: 4 }} />;
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h4"> {title} </Typography>
          <Typography variant="body2" sx={{ ...maxLine({ line: 1 }), color: 'text.secondary' }}>
            Duration {duration} min(s).
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
        {labQuestions.map((question, i) => (
          <LabQuestionItem key={question.questionId} question={question} index={i} />
        ))}
      </Box>

      <Button
        component={RouterLink}
        variant="contained"
        sx={{ py: 1.5, mb: 3 }}
        href={paths.lab.question.new(params.lid)}
        startIcon={<Iconify icon="mingcute:add-line" />}
        color="info"
      >
        Add New Question
      </Button>
    </>
  );
}
