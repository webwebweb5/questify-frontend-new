'use client';

import { useParams } from 'next/navigation';

import { Box, Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { LabContent } from 'src/layouts/lab';
import Loading from 'src/app/(root)/loading';
import { useGetStudentByLaboratoryId } from 'src/actions/student';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import AssignQuestionsList from '../assign-questions-list';

// ----------------------------------------------------------------------

export function AssignQuestionView() {
  const params = useParams();

  const { students, studentsLoading, studentsError, studentsEmpty } = useGetStudentByLaboratoryId(
    params.lid
  );

  if (studentsLoading) {
    return <Loading />;
  }

  const StudentEmpty = (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
      <Typography variant="h6">Student not found.</Typography>
    </Box>
  );
  const FetchStudentError = (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h6" color="error">
        Something wrong, Please try again.
      </Typography>
    </Box>
  );

  return (
    <LabContent maxWidth="xl">
      <Button
        component={RouterLink}
        href={paths.lab.main(params.lid)}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mb: 3, width: 'fit-content' }}
      >
        Back
      </Button>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4"> Assign Labs </Typography>
      </Stack>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h6">Students</Typography>
            <Label>{students?.length}</Label>
          </Stack>

          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="error"
              startIcon={<Iconify icon="material-symbols:playlist-remove" />}
            >
              Unassign All
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="ic:outline-auto-awesome" />}>
              Random Assign
            </Button>
          </Stack>
        </Stack>

        {studentsEmpty && !studentsError && StudentEmpty}

        {studentsError && FetchStudentError}

        {!studentsEmpty && !studentsError && <AssignQuestionsList students={students} />}
      </Stack>
    </LabContent>
  );
}
