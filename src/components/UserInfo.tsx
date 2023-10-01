/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from 'next/image';
import SignInBtn from './SignInBtn';
import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { status, data: session } = useSession();

  if (status === 'authenticated') {
    console.log(session?.user);

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
    } else {
      return <p>No profile image available.</p>;
    }
  } else {
    return <SignInBtn />;
  }
}
