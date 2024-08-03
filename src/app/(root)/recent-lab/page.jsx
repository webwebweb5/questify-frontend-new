import { CONFIG } from 'src/config-global';

import { RecentLabView } from 'src/sections/recent-lab/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Recent Lab - ${CONFIG.site.name}` };

export default function RecentLabPage() {
  return <RecentLabView />;
}
