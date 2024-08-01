import { CONFIG } from 'src/config-global';
import { StartLabLayout } from 'src/layouts/start-lab';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <StartLabLayout>{children}</StartLabLayout>;
  }

  return (
    <AuthGuard>
      <StartLabLayout>{children}</StartLabLayout>
    </AuthGuard>
  );
}
