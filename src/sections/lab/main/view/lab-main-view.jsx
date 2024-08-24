'use client';

import { useParams } from 'next/navigation';

import { useCurrentRole } from 'src/hooks/use-current-role';

import { LabContent } from 'src/layouts/lab';
import Loading from 'src/app/(root)/loading';
import { useGetQuestionsProf } from 'src/actions/question';
import { useGetLaboratoryById } from 'src/actions/laboratory';

import { LabMainProf } from '../lab-main-prof';
import { LabMainStudent } from '../lab-main-student';

// ----------------------------------------------------------------------

export function LabMainView() {
  const role = useCurrentRole();

  const params = useParams();

  const { laboratory, laboratoryLoading } = useGetLaboratoryById(params.lid);

  const { questions, questionsEmpty, questionsLoading } = useGetQuestionsProf(params.lid);

  if (questionsLoading || laboratoryLoading) return <Loading />;

  return (
    <LabContent maxWidth="xl">
      {role === 'ProfAcc' ? (
        <LabMainProf
          labInfo={laboratory}
          labQuestions={questions}
          questionsEmpty={questionsEmpty}
        />
      ) : (
        <LabMainStudent
          labInfo={laboratory}
          labQuestion={questions[0]}
          questionEmpty={questionsEmpty}
        />
      )}
    </LabContent>
  );
}
