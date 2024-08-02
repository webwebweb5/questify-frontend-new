'use client';

import { useRouter } from 'next/navigation';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { CONFIG } from 'src/config-global';

import { SocialIcon } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_CMU_OAUTH_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const authorizationUrl = `https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=cmuitaccount.basicinfo`;
    router.push(authorizationUrl);
  };

  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;

  const renderHead = (
    <Stack alignItems="center" spacing={1.5} sx={{ mb: 5 }}>
      <Box sx={{ position: 'relative' }}>
        <Typography variant="h4" sx={{ position: 'relative', zIndex: 1 }}>
          Sign in to Questify
        </Typography>
        <Box
          sx={{
            right: 0,
            bottom: 4,
            width: 70,
            height: 10,
            opacity: 0.48,
            bgcolor: 'primary.main',
            position: 'absolute',
            zIndex: 0,
          }}
        />
      </Box>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} textAlign="center">
          Revolutionizing software engineering education with AI, cloud computing, and modern web
          technologies!
        </Typography>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        onClick={handleLogin}
        variant="contained"
      >
        <Box
          component="div"
          sx={{
            height: 24,
            display: 'inline-flex',
            mr: 2,
          }}
        >
          <Box
            component="img"
            alt="cmu-logo"
            src={`${CONFIG.site.basePath}/assets/sub-logo/cmu-sub-logo.png`}
          />
        </Box>
        Login with CMU Account
      </LoadingButton>
    </Stack>
  );

  const renderSignInWithSocials = (
    <>
      <Divider
        sx={{
          my: 3,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, :after': { borderTopStyle: 'dashed' },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={1}>
        <IconButton>
          <SocialIcon icon="google" width={22} />
        </IconButton>

        <IconButton>
          <SocialIcon icon="github" width={22} />
        </IconButton>

        <IconButton>
          <SocialIcon icon="twitter" width={22} />
        </IconButton>
      </Stack>
    </>
  );

  return (
    <>
      {renderLogo}

      {renderHead}

      {renderForm}

      {renderSignInWithSocials}
    </>
  );
}
