'use client';

import React, { useEffect, useState } from 'react';
import UserInfo from '@/components/UserInfo';
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { status } = useSession();
  const router = useRouter(); // Initialize the router

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
    <div className="">
      <UserInfo />
      {status === 'authenticated' && (
        <button
          onClick={handleSignOut}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sing Out
        </button>
      )}
    </div>
  );
}
