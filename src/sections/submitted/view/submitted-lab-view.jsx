'use client';

import { m } from 'framer-motion';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { textGradient } from 'src/theme/styles';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function SubmittedLabView() {
  const theme = useTheme();

  return (
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
          {/* <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} /> */}
          {/* <Box sx={{ fontSize: 128, my: { xs: 5, sm: 10 } }}>🎉</Box> */}
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
          Go back to lab
        </Button>
      </Stack>
    </Container>
  );
}
