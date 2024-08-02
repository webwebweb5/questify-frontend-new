'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SplashScreen } from 'src/components/loading-screen';

import { login } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';

function CallbackPage() {
  const { user, checkUserSession } = useAuthContext();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const code = searchParams.get('code');
      if (code) {
        await login(code);
        await checkUserSession?.();
      }
    };

    handleLogin();
  }, [checkUserSession, searchParams]);

  useEffect(() => {
    if (user) {
      console.log(user);
      router.push('/');
    }
  }, [router, user]);

  return <SplashScreen />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="">Loading...</div>}>
      <CallbackPage />
    </Suspense>
  );
}
