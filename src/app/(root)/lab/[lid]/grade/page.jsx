import { CONFIG } from 'src/config-global';

import { LabGradeView } from 'src/sections/lab/grade/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lab grade - ${CONFIG.site.name}` };

export default function LabGradePage() {
  return <LabGradeView />;
}
