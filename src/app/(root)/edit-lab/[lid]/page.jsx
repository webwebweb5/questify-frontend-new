import { CONFIG } from 'src/config-global';

import { LabEditView } from 'src/sections/overview/lab/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Edit Lab - ${CONFIG.site.name}` };

export default function LabEditPage() {
  return <LabEditView />;
}
