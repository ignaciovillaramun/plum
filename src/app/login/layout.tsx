import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '../providers';
import { UserProvider } from '@/components/UserProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <html>
        <head>

        </head>
        <body>
        <UserProvider>
            <NextAuthProvider>
                 {children}
            </NextAuthProvider>
        </UserProvider>
        </body>
    </html>
  )
}