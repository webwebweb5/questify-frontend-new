'use client';

import { Stack, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useCurrentRole } from 'src/hooks/use-current-role';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';

import { setSession } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const student =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDIxMTUwMzEiLCJyb2xlIjoiU3RkQWNjIiwiaWF0IjoxNzI4Mjg0MjYwLCJleHAiOjE3MjkxNjQyNjB9.bvuYSOEC3H8lZHklvv9kDIfr5GPunPh9sxSqVc-TN8w';

const professor =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDIxMTgwMjQiLCJyb2xlIjoiUHJvZkFjYyIsImlhdCI6MTcyODI4ODQzMywiZXhwIjoxNzI5MTY4NDMzfQ.PVOj16uzEbiQGfPi_bwMmdzVaJhVvE3nT5N0Xf1HWiA';

// ----------------------------------------------------------------------

export function ForumView() {
  const role = useCurrentRole();

  const changeToStudent = () => {
    setSession(student);
    window.location.reload();
  };

  const changeToProfessor = () => {
    setSession(professor);
    window.location.reload();
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h3"> Forum (WIP) </Typography>

      <Typography variant="body2" sx={{ mt: 4 }}>
        Role:{' '}
        {role === 'StdAcc' ? (
          <Label color="primary">Student</Label>
        ) : (
          <Label color="secondary">Professor</Label>
        )}
      </Typography>

      {/* <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        }}
      /> */}

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={changeToStudent}
          disabled={role !== 'ProfAcc'}
        >
          Student
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={changeToProfessor}
          disabled={role !== 'StdAcc'}
        >
          Professor
        </Button>
      </Stack>
    </DashboardContent>
  );
}
