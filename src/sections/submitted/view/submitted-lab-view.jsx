'use client';

import { m } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import Loading from 'src/app/(root)/loading';
import { textGradient } from 'src/theme/styles';
import { useGetReportByQuestionId } from 'src/actions/report';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function SubmittedLabView() {
  const theme = useTheme();

  const params = useParams();

  const router = useRouter();

  const { report, reportError, reportLoading } = useGetReportByQuestionId(params.id);

  if (report?.submitStatus === 'IN_PROGRESS') return router.push('/');

  if (reportLoading) return <Loading />;
  if (reportError)
    return (
      <Container
        component={MotionContainer}
        sx={{ textAlign: 'center', mt: { xs: 4, md: 8, lg: 12 } }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Something Wrong!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary', mb: 6 }}>
            Sorry, we couldn’t fetch the data you’re looking for. Perhaps you’ve mistyped the URL?
            or Maybe a mistake from the Backend
          </Typography>
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Go to home
        </Button>
      </Container>
    );

  return (
    report?.submitStatus !== 'IN_PROGRESS' && (
      <Container
        component={MotionContainer}
        sx={{ textAlign: 'center', mt: { xs: 4, md: 8, lg: 12 } }}
      >
        <Stack justifyContent="center" alignItems="center">
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              <Box
                component={m.span}
                animate={{ backgroundPosition: '200% center' }}
                transition={{
                  duration: 20,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                sx={{
                  ...textGradient(
                    `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
                  ),
                  backgroundSize: '400%',
                }}
              >
                Laboratory submitted!
              </Box>
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              Great job! Your effort is the key to success. Wishing you all the best.
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Box
              component="img"
              alt="congrats"
              src={`${CONFIG.site.basePath}/assets/illustrations/congrats-illustration.svg`}
              sx={{ width: 380, maxWidth: 1, flexShrink: 0, height: 'auto', my: { xs: 5, sm: 10 } }}
            />
          </m.div>

          <Button
            component={RouterLink}
            href="/"
            size="large"
            variant="contained"
            sx={{ width: 'fit-content' }}
          >
            Back to home page
          </Button>
        </Stack>
      </Container>
    )
  );
}
