'use client';

import { useParams } from 'next/navigation';

import { Stack, Typography } from '@mui/material';

import { LabContent } from 'src/layouts/lab';
import { useGetReportsByLaboratoryId } from 'src/actions/report';

import { Label } from 'src/components/label';

import StudentGradeList from '../student-grade-list';

// ----------------------------------------------------------------------

export function LabGradeView() {
  const params = useParams();

  // const { students } = useGetStudentByLaboratoryId(params.lid);
  const { reports, reportsLoading, reportsError } = useGetReportsByLaboratoryId(params.lid);
  console.log(reports);

  return (
    <LabContent maxWidth="xl">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h4">Grading</Typography>
            <Label>{reports?.length}</Label>
          </Stack>
        </Stack>

        <StudentGradeList reports={reports} />
      </Stack>
    </LabContent>
  );
}
