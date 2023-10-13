// import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import { UserProvider } from '@/components/UserProvider';
import Menu from '@/components/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plum',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <NextAuthProvider>
            <div className="relative">
              <Menu />
              <div className="mt-20 ml-20">{children}</div>
            </div>
          </NextAuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
