import { Stack, Button, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fConvertSeconds } from 'src/utils/format-time';

import { maxLine } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { EmptyContent } from 'src/components/empty-content';

// ----------------------------------------------------------------------

export function LabMainStudent({ labQuestion, labInfo, questionEmpty }) {
  const { title, durationTime, maxScore } = labInfo;
  const { questionId, title: QuestionTitle, problemStatement } = labQuestion;
  // const { givenScore, submissionLoading, submissionError, reportLoading, reportError } =
  //   useGetReportByQuestionId(questionId);

  // if (submissionLoading || reportLoading) return <Loading />;
  // if (submissionError || reportError) return <div>Error occurred</div>;

  if (!labInfo) {
    return <EmptyContent filled title="Laboratory not found" sx={{ my: 3, py: 4 }} />;
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h4"> {title} </Typography>
          <Typography variant="body2" sx={{ ...maxLine({ line: 1 }), color: 'text.secondary' }}>
            Duration {fConvertSeconds(durationTime)}.
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Points</Typography>
          <Typography variant="body1" sx={{ ...maxLine({ line: 1 }), color: 'text.secondary' }}>
            0/{maxScore}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />

      {questionEmpty ? (
        <EmptyContent filled title="Laboratory not assigned yet!" sx={{ my: 3, py: 4 }} />
      ) : (
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Typography variant="h4" noWrap>
            {QuestionTitle}
          </Typography>
          <Markdown children={problemStatement} />
          <Button
            color="primary"
            variant="contained"
            sx={{ py: 1.5, mr: 2, mt: 3, width: 'fit-content' }}
            href={paths.startLab(questionId)}
            startIcon={<Iconify icon="carbon:play-filled-alt" />}
          >
            Start Lab
          </Button>
        </Stack>
      )}
    </>
  );
}
