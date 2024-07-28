import { CONFIG } from 'src/config-global';

import { LabCreateView } from 'src/sections/overview/create-lab/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create Lab - ${CONFIG.site.name}` };

export default function LabPage() {
  return <LabCreateView />;
}
