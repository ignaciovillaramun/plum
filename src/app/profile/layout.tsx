'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '../providers';
import { UserProvider } from '@/components/UserProvider';
import Menu from '@/components/Menu';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Dashboard',
// };

export default function Login({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  console.log('hello2', status);

  return (
    <>
      {status === 'authenticated' ? (
        <>
          <div className="md:ml-[80px] bg-zinc-100">{children}</div>
          <Menu />
        </>
      ) : (
        <>
          <div className=" bg-zinc-100">{children}</div>
        </>
      )}
    </>
  );
}
