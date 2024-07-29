import { CONFIG } from 'src/config-global';

import { LabMemberView } from 'src/sections/lab/member/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lab member - ${CONFIG.site.name}` };

export default function LabMemberPage() {
  return <LabMemberView />;
}
