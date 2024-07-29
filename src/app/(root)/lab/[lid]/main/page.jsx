import { CONFIG } from 'src/config-global';

import { LabMainView } from 'src/sections/lab/main/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lab main - ${CONFIG.site.name}` };

export default function LabMainPage() {
  return <LabMainView />;
}
