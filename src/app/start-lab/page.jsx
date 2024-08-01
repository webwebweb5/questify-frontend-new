import { CONFIG } from 'src/config-global';

import { StartLabView } from 'src/sections/start-lab/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Start lab - ${CONFIG.site.name}` };

export default function StartLabPage() {
  return <StartLabView />;
}
