'use client';

import { useParams } from 'next/navigation';

import { Stack, Typography } from '@mui/material';

import { LabContent } from 'src/layouts/lab';
import { useGetStudentByLaboratoryId } from 'src/actions/laboratory';

import { Label } from 'src/components/label';

import StudentGradeList from '../student-grade-list';

// ----------------------------------------------------------------------

export function LabGradeView() {
  const params = useParams();

  const { students } = useGetStudentByLaboratoryId(params.lid);

  return (
    <LabContent maxWidth="xl">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h4">Grading</Typography>
            <Label>{students?.length}</Label>
          </Stack>
        </Stack>

        <StudentGradeList students={students} />
      </Stack>
    </LabContent>
  );
}
