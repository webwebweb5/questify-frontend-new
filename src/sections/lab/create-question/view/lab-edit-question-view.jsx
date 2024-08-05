'use client';

import { Box } from 'lucide-react';
import { useParams } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { LabContent } from 'src/layouts/lab';
import Loading from 'src/app/(root)/loading';
import { useGetQuestionById } from 'src/actions/question';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import LabQuestionNewEditForm from '../lab-question-new-edit-form';

// ----------------------------------------------------------------------

export function LabEditQuestionView() {
  const params = useParams();

  const { question, questionLoading, questionError } = useGetQuestionById(params.qid);

  if (questionLoading) return <Loading />;
  if (questionError) return <Box>Something wrong</Box>;

  return (
    <LabContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit Lab Question"
        links={[
          {
            name: 'All Lab',
            href: paths.lab.main(params.lid),
          },
          { name: 'Edit Lab Question' },
        ]}
        sx={{
          mb: 3,
        }}
      />

      <LabQuestionNewEditForm currentLabQuestion={question} />
    </LabContent>
  );
}
