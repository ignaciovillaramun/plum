'use client';

import Image from 'next/image';
import SignInBtn from './SignInBtn';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useUser } from './UserProvider';

const getCurrentUser = async (email: any, setCurrentUser: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${email}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await res.json();
    setCurrentUser(userData);
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
};

export default function UserInfo() {
  const { status, data: session } = useSession();
  const [currentUser, setCurrentUser] = useState([]);
  const { setUserId } = useUser();
  const email = session?.user?.email;

  useEffect(() => {
    if (status === 'authenticated' && email) {
      getCurrentUser(email, setCurrentUser).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [email, status, setUserId]);

  if (currentUser && typeof currentUser === 'object' && '_id' in currentUser) {
    setUserId(currentUser._id as string);
  }

  let userImage = session?.user?.image;
  let name = session?.user?.name;
  if (name) {
    const firstChar = name.charAt(0).toUpperCase();
    const restOfStr = name.slice(1);
    name = firstChar + restOfStr;
  }

  if (userImage) {
    return (
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3">
        <div className="flex items-center">
          <Image
            className="rounded-full"
            src={userImage}
            width={60}
            height={60}
            alt="Profile Image"
          />{' '}
          <span className="font-bold pl-4">{name}</span>
        </div>
        <div>
          Name: <span className="font-bold">{name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
      </div>
    );
  } 
}

export function AuthenticatedUserInfo() {
  const { status } = useSession();

  if (status === 'authenticated') {
    return <UserInfo />;
  } else {
    return <SignInBtn />;
  }
}
