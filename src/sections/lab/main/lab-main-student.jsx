import { Stack, Button, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fConvertSeconds } from 'src/utils/format-time';

import { maxLine } from 'src/theme/styles';
import Loading from 'src/app/(root)/loading';
import { useGetReportByQuestionId } from 'src/actions/report';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { EmptyContent } from 'src/components/empty-content';

// ----------------------------------------------------------------------

export function LabMainStudent({ labQuestion, labInfo, questionEmpty }) {
  if (!labQuestion) {
    return <EmptyContent filled title="Laboratory not assigned" sx={{ my: 3, py: 4 }} />;
  }

  const { title, durationTime, maxScore } = labInfo;
  const { questionId, title: QuestionTitle, problemStatement } = labQuestion;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { report, reportLoading, reportError } = useGetReportByQuestionId(questionId);

  if (reportLoading) return <Loading />;

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
            {report?.givenScore !== null && reportError?.status !== 'NOT_FOUND'
              ? report?.givenScore
              : '-'}
            /{maxScore}
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
            disabled={report?.submission?.status === 'INACTIVE'}
          >
            Start Lab
          </Button>
        </Stack>
      )}
    </>
  );
}
