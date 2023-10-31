'use client';

import Image from 'next/image';
import SignInBtn from './SignInBtn';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useUser } from './UserProvider';
import Login from '@/app/login/page';

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

  //
  const [themeColor, setThemeColor] = useState('red-plum')
  

  if (userImage) {
    return (
      <div className='bg-zinc-100 h-full'>
        <div className="bg-[url('/bg-gradient.jpeg')] h-52 px-5 pt-12 drop-shadow-lg">
           <p className="font-bold text-center text-2xl text-white">{name}</p>
           <Image
            className="rounded-full mt-[40px] block mx-auto"
            src={userImage}
            width={130}
            height={60}
            alt="Profile Image"
          />{' '}
        </div>
       

        <div className='bg-white mt-24  w-4/5 block mx-auto drop-shadow-md rounded-xl p-6'>
          <div className='mb-10'>
            <p className='text-lg font-medium'>Topics:</p> <span></span>
          </div>
          <div className='flex'>
            <p className='text-lg mr-4 font-medium'>Color Theme</p><div className={`${themeColor} w-6 h-6 rounded-full`}></div>
          </div>
          
        </div>


      </div>
    );
  } else if (!userImage) {
    return <Login />;
  } else {
    return <SignInBtn />;
  }
}

// export function AuthenticatedUserInfo() {
//   const { status } = useSession();

//   if (status === 'authenticated') {
//     return <UserInfo />;
//   } else {
//     return <SignInBtn />;
//   }
// }
