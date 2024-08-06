import { CONFIG } from 'src/config-global';

import { AssignQuestionView } from 'src/sections/lab/assign-question/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Assign Question - ${CONFIG.site.name}` };

export default function AssignQuestionPage() {
  return <AssignQuestionView />;
}
