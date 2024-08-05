import { CONFIG } from 'src/config-global';

import { LabCreateQuestionView } from 'src/sections/lab/create-question/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lab create question - ${CONFIG.site.name}` };

export default function LabNewQuestionPage() {
  return <LabCreateQuestionView />;
}
