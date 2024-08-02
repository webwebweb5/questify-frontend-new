// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  FORUM: '/forum',
  RECENT_LAB: '/recent-lab',
  LAB: '/lab',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    createLab: `${ROOTS.DASHBOARD}/create-lab`,
  },
  // RECENT_LAB
  recentLab: {
    root: ROOTS.RECENT_LAB,
  },
  // FORUM
  forum: {
    root: ROOTS.FORUM,
  },
  // LAB
  lab: {
    root: ROOTS.LAB,
    main: (lid) => `${ROOTS.LAB}/${lid}/main`,
    member: (lid) => `${ROOTS.LAB}/${lid}/member`,
    grade: (lid) => `${ROOTS.LAB}/${lid}/grade`,
    settings: (lid) => `${ROOTS.LAB}/${lid}/settings`,
    question: {
      new: (lid) => `${ROOTS.LAB}/${lid}/question/new`,
    },
  },
};
