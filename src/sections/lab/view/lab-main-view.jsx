'use client';

import { LabContent } from 'src/layouts/lab';

import { LabMainProf } from '../lab-main-prof';

// ----------------------------------------------------------------------

export function LabMainView() {
  return (
    <LabContent maxWidth="xl">
      {/* <LabMainStudent /> */}
      <LabMainProf />
    </LabContent>
  );
}
