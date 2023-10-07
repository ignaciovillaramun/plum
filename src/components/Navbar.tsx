'use client';

import Link from 'next/link';
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { status } = useSession();
  const router = useRouter(); // Initialize the router

  // const { data: session } = useSession();

  const signOut = async () => {
    try {
      localStorage.removeItem('userId');

      await nextAuthSignOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const navigateToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Link className="font-bold text-lg text-purple-700" href={'/'}>
        Plum
      </Link>
      <Link href={'/dashboard'}>Dashboard</Link>
      <Link href={'/'}>Courses</Link>
      <Link href={'/profile'}>Profile</Link>
      {status === 'authenticated' ? (
        <button
          onClick={() => signOut()}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sing Out
        </button>
      ) : (
        <button
          onClick={navigateToProfile}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sing In
        </button>
      )}
    </div>
  );
}
