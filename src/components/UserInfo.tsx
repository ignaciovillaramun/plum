'use client';

import Image from 'next/image';
import SignInBtn from './SignInBtn';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useContext } from 'react';
import { useUser } from './UserProvider';
import Login from '@/app/login/page';
import { themeColor } from '@/app/layout';
import AOS from 'aos'
import 'aos/dist/aos.css';

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
    console.log(userData);

    setCurrentUser(userData);
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
};

const updateColorTheme = async (userId: String, themeColor: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, themeColor }),
    });

    if (!response.ok) {
      throw new Error('Failed to update color theme');
    }

    const updatedUser = await response.json();

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', themeColor);
      // document.documentElement.style.setProperty('--theme-color', themeColor || 'default-color');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating color theme:', error);
    throw error;
  }
};

export default function UserInfo() {
  const {theme, setTheme}: any = useContext(themeColor);
  const { status, data: session } = useSession();
  const [currentUser, setCurrentUser] = useState({ _id: '', theme: '' });
  const { setUserId, setThemeColor } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const email = session?.user?.email;

  useEffect(() => {

    AOS.init({
      duration: 1300
    })

   },[])


  useEffect(() => {
    if (status === 'authenticated' && email) {
      getCurrentUser(email, setCurrentUser)
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [email, status, setUserId]);

  useEffect(() => {
    if (
      currentUser &&
      typeof currentUser === 'object' &&
      '_id' in currentUser
    ) {
      setUserId(currentUser._id as string);
      setThemeColor(currentUser.theme as string);
    }

    if (
      currentUser &&
      typeof currentUser === 'object' &&
      'theme' in currentUser
    ) {
      setTheme(currentUser.theme as string);
    }
  }, [currentUser, setUserId, setTheme, setThemeColor]);

  let userImage = session?.user?.image
    ? session?.user?.image
    : '/profile-default.png';
  let name = session?.user?.name;

  if (name) {
    const firstChar = name.charAt(0).toUpperCase();
    const restOfStr = name.slice(1);
    name = firstChar + restOfStr;
    console.log(name);
  }

  const colorOptions = [
    { name: 'red', value:  'bg-red-plum'},
    { name: 'p100', value: 'bg-theme-color1'},
    { name: 'p50', value:  'bg-theme-color2'},
    { name: 'p30', value:  'bg-theme-color3'},
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  } else if (name) {
 
   return (
      <div className="bg-zinc-100 h-full">
        <div className="bg-[url('/bg-gradient.jpeg')] bg-no-repeat bg-center bg-cover h-52 px-5 pt-12 drop-shadow-lg md:h-70">
          <p className="font-bold text-center text-2xl text-white md:text-3xl" >{name}</p>
          <Image
            data-aos="fade-in"
            className="rounded-full mt-[40px] block mx-auto md:w-40"
            src={userImage}
            width={130}
            height={60}
            alt="Profile Image"
          />
        </div>

        <div className="bg-white mt-24 w-4/5 block mx-auto drop-shadow-md rounded-xl p-6 md:w-2/4">
          <div className="mb-5">
            <p className="text-lg font-medium">Topics:</p> <span></span>
          </div>
          <div className="flex align-middle">
            <p className="text-lg mr-4 font-medium">Color Theme</p> 
            <div className={`${theme} w-6 h-6 rounded-full`}></div>
          </div>
          <div className="flex space-x-4 mt-5">
              <p className='text-lg mr-3 font-medium'>Pick a color</p>
              {colorOptions.map((colorOption) => (
                <div
                  key={colorOption.value}
                  data-aos="zoom-in"
                  data-aos-delay="400"
                  className={`w-6 h-6 rounded-full ${colorOption.value} cursor-pointer`}
                  onClick={() => {
                    setTheme(colorOption.value);
                    updateColorTheme(currentUser._id, colorOption.value);
                  }}
                ></div>
              ))}
            </div>
        </div>
            <br />
            <br />
            <br />
            <br />
      </div>
    )
  } else if (!name) {
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
