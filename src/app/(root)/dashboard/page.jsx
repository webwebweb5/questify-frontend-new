import { CONFIG } from 'src/config-global';

import { OverviewDashboardView } from 'src/sections/overview/dashboard/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function DashboardPage() {
  return <OverviewDashboardView />;
}
