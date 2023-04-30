'use client';

import axios from '@/api/axios';
import { useEffect } from 'react';

export default function ResetPasswordPage() {
  useEffect(() => {
    (async () => {
      await axios.post('/auth/reset-password');
    })();
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center ">
      <h1 className="text-2xl">Thanks for registration</h1>
      <h2 className="text-lg">Go to your email and continue your registration</h2>
    </main>
  );
}
