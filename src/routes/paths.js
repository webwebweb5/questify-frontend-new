// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  FORUM: '/forum',
  RECENT_LAB: '/recent-lab',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  // RECENT_LAB
  recentLab: {
    root: ROOTS.RECENT_LAB,
  },
  // FORUM
  forum: {
    root: ROOTS.FORUM,
  },
};