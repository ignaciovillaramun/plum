'use client';
import Menu from '@/components/Menu';
import { useSession } from 'next-auth/react';

export default function Login({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

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
