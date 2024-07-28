import { CONFIG } from 'src/config-global';

import { ForumView } from 'src/sections/forum/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Forum - ${CONFIG.site.name}` };

export default function ForumPage() {
  return <ForumView />;
}
