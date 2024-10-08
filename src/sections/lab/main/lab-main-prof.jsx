import { useParams } from 'next/navigation';

import { Box, Stack, Button, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fConvertSeconds } from 'src/utils/format-time';

import { maxLine } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { LabQuestionItem } from './lab-question-item';
import { LabAssignDialog } from './lab-assign-dialog';

// ----------------------------------------------------------------------

export function LabMainProf({ labQuestions, labInfo }) {
  const params = useParams();

  const assignDialog = useBoolean();

  const { laboratoryId, title, durationTime, students } = labInfo;

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h4"> {title} </Typography>
          <Typography variant="body2" sx={{ ...maxLine({ line: 1 }), color: 'text.secondary' }}>
            Duration {fConvertSeconds(durationTime)}.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={{ height: 'fit-content', px: 2, py: 1 }}
          startIcon={<Iconify icon="ic:outline-auto-awesome" />}
          onClick={assignDialog.onTrue}
          disabled={labQuestions?.length === 0 || students?.length === 0}
        >
          Assign
        </Button>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />

      {labQuestions?.length === 0 ? (
        <EmptyContent filled title="Question not found" sx={{ my: 3, py: 4 }} />
      ) : (
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
      )}

      <Button
        component={RouterLink}
        variant="contained"
        sx={{ py: 1.5, mb: 3, width: 'fit-content' }}
        href={paths.lab.question.new(params.lid)}
        startIcon={<Iconify icon="mingcute:add-line" />}
        color="info"
      >
        Add New Question
      </Button>

      <LabAssignDialog
        open={assignDialog.value}
        onClose={assignDialog.onFalse}
        laboratoryId={laboratoryId}
      />
    </>
  );
}
