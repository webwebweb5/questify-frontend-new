import { CONFIG } from 'src/config-global';

import { SubmittedLabView } from 'src/sections/submitted/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Submitted lab - ${CONFIG.site.name}` };

export default function SubmittedLabPage() {
  return <SubmittedLabView />;
}
