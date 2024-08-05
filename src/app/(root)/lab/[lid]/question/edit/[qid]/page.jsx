import { CONFIG } from 'src/config-global';

import { LabEditQuestionView } from 'src/sections/lab/create-question/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lab edit question - ${CONFIG.site.name}` };

export default function LabEditQuestionPage() {
  return <LabEditQuestionView />;
}
