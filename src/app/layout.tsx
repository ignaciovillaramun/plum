'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import { UserProvider } from '@/components/UserProvider';
import { TopicProvider } from '@/components/TopicContext';
import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SelectedLabelProvider } from '@/components/SelectedLabelContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    let value = localStorage.getItem('theme');
    if (value !== null) {
      setTheme(value);
    } else {
      setTheme('bg-red-plum');
    }
  }, []);

  return (
    <html lang="en" className="bg-zinc-100">
      <body className={inter.className}>
        <SelectedLabelProvider>
          <TopicProvider>
            <UserProvider>
              <NextAuthProvider>
                <ThemeProvider value={{ theme, setTheme }}>
                  {children}
                </ThemeProvider>
              </NextAuthProvider>
            </UserProvider>
          </TopicProvider>
        </SelectedLabelProvider>
      </body>
    </html>
  );
}
