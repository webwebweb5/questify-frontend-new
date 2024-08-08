import { Box } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Stack, Divider, Typography } from '@mui/material';

import Loading from 'src/app/(root)/loading';
import { useGetQuestionById } from 'src/actions/question';

import { Markdown } from 'src/components/markdown';

export default function LabProblemStatement({ submissions }) {
  const params = useParams();

  const { question, questionLoading, questionError } = useGetQuestionById(params.id);

  if (questionLoading) return <Loading />;
  if (questionError) return <Box>Something wrong</Box>;

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="h4" noWrap>
        {question?.title || 'Title'}
      </Typography>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Markdown children={question?.problemStatement || '<p>No Instruction</p>'} />
    </Stack>
  );
}
