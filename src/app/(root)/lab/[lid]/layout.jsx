import { CONFIG } from 'src/config-global';
import { LabLayout } from 'src/layouts/lab';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <LabLayout>{children}</LabLayout>;
  }

  return (
    <AuthGuard>
      <LabLayout>{children}</LabLayout>
    </AuthGuard>
  );
}
