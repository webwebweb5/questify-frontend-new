// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  FORUM: '/forum',
  RECENT_LAB: '/recent-lab',
  LAB: '/lab',
  START_LAB: '/start-lab',
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
  },
  // CRUD LAB
  createLab: `/create-lab`,
  editLab: (lid) => `/edit-lab/${lid}`,
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
    assignQuestions: (lid) => `${ROOTS.LAB}/${lid}/assign-question`,
    question: {
      new: (lid) => `${ROOTS.LAB}/${lid}/question/new`,
      edit: (lid, qid) => `${ROOTS.LAB}/${lid}/question/edit/${qid}`,
    },
  },
  startLab: (id) => `${ROOTS.START_LAB}/${id}`,
  submittedLab: (id) => `${ROOTS.START_LAB}/${id}/submitted`,
};
