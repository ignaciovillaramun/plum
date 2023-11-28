'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function SignInBtn() {
  const { status, data: session } = useSession();

  return (
    <button onClick={() => signIn('google')}>
      <Image src="/google-logo.png" height={40} width={40} alt="Google Logo" />
    </button>
  );
}
