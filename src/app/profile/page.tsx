'use client';

import React, { useEffect, useState, useContext } from 'react';
import UserInfo from '@/components/UserInfo';
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/components/ThemeProvider';

export default function Profile() {
  const { status } = useSession();
  const router = useRouter(); // Initialize the router
  const { theme, setTheme }: any = useContext(ThemeContext);
  console.log('hello3', status);
  console.log(status === 'authenticated');

  // const { data: session } = useSession();

  const signOut = async () => {
    try {
      localStorage.removeItem('userId');
      localStorage.removeItem('theme');

      await nextAuthSignOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handleSignOut = () => {
    signOut();
    router.push('/profile');
  };

  // const navigateToProfile = () => {
  //   router.push('/profile');
  // };
  return (
    <div className="bg-zinc-100 pb-40">
      <UserInfo />

      {status === 'authenticated' && (
        <button
          onClick={handleSignOut}
          className={`${theme} block w-2/4 mx-auto text-white px-6 py-4 rounded-md`}
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
