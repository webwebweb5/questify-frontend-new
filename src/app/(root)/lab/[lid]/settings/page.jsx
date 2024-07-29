import { CONFIG } from 'src/config-global';

import { LabSettingsView } from 'src/sections/lab/settings/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lab settings - ${CONFIG.site.name}` };

export default function LabSettingsPage() {
  return <LabSettingsView />;
}
