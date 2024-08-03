'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { paths } from 'src/routes/paths';

import Loading from 'src/app/(root)/loading';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetLaboratoryById } from 'src/actions/laboratory';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { LabNewEditForm } from '../lab-new-edit-form';

// ----------------------------------------------------------------------

export function LabEditView() {
  const params = useParams();
  const router = useRouter();

  const { laboratory, laboratoryLoading, laboratoryError, mutateLaboratory } = useGetLaboratoryById(
    params.lid
  );

  useEffect(() => {
    mutateLaboratory();
  }, [mutateLaboratory]);

  if (laboratoryLoading) return <Loading />;
  if (laboratoryError) return router.push('/');

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit laboratory"
        links={[{ name: 'Recent Lab', href: paths.recentLab.root }, { name: 'Edit Laboratory' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <LabNewEditForm currentLab={laboratory} />
    </DashboardContent>
  );
}
