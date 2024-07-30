'use client';

import { useParams } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { LabContent } from 'src/layouts/lab';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import LabQuestionNewEditForm from '../lab-question-new-edit-form';

// ----------------------------------------------------------------------

export function LabCreateQuestionView() {
  const params = useParams();

  return (
    <LabContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Create Lab Question"
        links={[
          {
            name: 'All Lab',
            href: paths.lab.main(params.lid),
          },
          { name: 'Create Lab Question' },
        ]}
        sx={{
          mb: 3,
        }}
      />

      <LabQuestionNewEditForm />
    </LabContent>
  );
}
