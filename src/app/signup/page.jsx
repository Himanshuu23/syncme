'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SigninPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const result = await signIn('google', { callbackUrl: '/dashboard' });
      if (result?.error) {
        console.error('Signin failed', result.error);
      }
    } catch (error) {
      console.error('Google Signin Error', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-w-screen min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign In</h2>
        <button
          onClick={handleGoogleSignin}
          className="w-full rounded-md bg-red-600 p-2 text-white hover:bg-red-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
}
