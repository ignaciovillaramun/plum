import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '../providers';
import { UserProvider } from '@/components/UserProvider';
import Menu from '@/components/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Add Topic Related',
};

export default function Login({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:ml-[80px] bg-zinc-100">{children}</div>
      <Menu />
    </>
  );
}
