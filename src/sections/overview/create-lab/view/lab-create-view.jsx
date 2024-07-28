'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { LabNewEditForm } from '../lab-new-edit-form';

// ----------------------------------------------------------------------

export function LabCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new product"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'New Laboratory' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <LabNewEditForm />
    </DashboardContent>
  );
}
