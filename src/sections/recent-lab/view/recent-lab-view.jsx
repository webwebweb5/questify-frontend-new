'use client';

import { mutate } from 'swr';
import { useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { endpoints } from 'src/utils/axios';

import Loading from 'src/app/(root)/loading';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetLaboratories } from 'src/actions/laboratory';

import { LabList } from '../lab-list';

// ----------------------------------------------------------------------

export function RecentLabView() {
  const { laboratories, laboratoriesLoading } = useGetLaboratories();

  useEffect(() => {
    mutate(endpoints.laboratory.list);
  }, []);

  if (laboratoriesLoading) {
    return <Loading />;
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 2 }}>
        Recent Lab
      </Typography>

      <LabList labs={laboratories} />
    </DashboardContent>
  );
}
