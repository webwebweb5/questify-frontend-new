'use client';

import { useParams } from 'next/navigation';

import { useCurrentRole } from 'src/hooks/use-current-role';

import { LabContent } from 'src/layouts/lab';
import { useGetQuestionsProf } from 'src/actions/question';
import { useGetLaboratoryById } from 'src/actions/laboratory';

import { LabMainProf } from '../lab-main-prof';
import { LabMainStudent } from '../lab-main-student';

// ----------------------------------------------------------------------

export function LabMainView() {
  const role = useCurrentRole();

  const params = useParams();

  const { laboratory } = useGetLaboratoryById(params.lid);

  const { questions } = useGetQuestionsProf(params.lid);

  return (
    <LabContent maxWidth="xl">
      {role === 'ProfAcc' ? (
        <LabMainProf labInfo={laboratory} labQuestions={questions} />
      ) : (
        <LabMainStudent labInfo={laboratory} />
      )}
    </LabContent>
  );
}
