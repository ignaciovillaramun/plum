'use client';

import SignInBtn from '@/components/SignInBtn';
import { signOut as nextAuthSignOut, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { themeColor } from '../layout';
import { useContext } from 'react';


export default function Login() {
  const {theme, setTheme}: any = useContext(themeColor);

  return (
    <>
      <div className="bg-slate-300 w-full h-[320px]">
      <Image
       src="/loginImg.jpg"
       width={500}
       height={500}
       alt="picture"
       className=' h-full w-full object-cover'
      />
      </div>
      <section className="px-8 py-10 md:w-2/6 block mx-auto">
        <h1 className={`text-center ${theme} font-semibold text-3xl`}>
          Login
        </h1>
        <div className="flex border-b border-slate-400 py-3 mt-5">
          <svg
            className="w-7 h-6"
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M320 254.27c-4.5 51-40.12 80-80.55 80s-67.34-35.82-63.45-80s37.12-80 77.55-80s70.33 36 66.45 80Z"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M319.77 415.77c-28.56 12-47.28 14.5-79.28 14.5c-97.2 0-169-78.8-160.49-176s94.31-176 191.51-176C381 78.27 441.19 150 432.73 246c-6.31 71.67-52.11 92.32-76.09 88.07c-22.56-4-41.18-24.42-37.74-63.5l8.48-96.25"
            />
          </svg>
          <input type="text" placeholder="Email" className="w-full ml-1 bg-zinc-100" />
        </div>
        <div className="flex border-b border-slate-400 py-3">
          <svg
            className="w-5 h-6 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
          >
            <path
              fill="none"
              stroke="currentColor"
              d="M4.5 6.5v-3a3 3 0 0 1 6 0v3m-8 0h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"
            />
          </svg>
          <input
            type="Password"
            placeholder="Password"
            className="w-full ml-2  bg-zinc-100"
          />
        </div>
        <button className="block bg-red-plum py-2 px-3 w-3/4 mx-auto mt-7 rounded-xl text-white font-light">
          Login
        </button>
        <p className="text-base text-center mt-5 font-light">
          Or register with email...
        </p>
        <div className="flex justify-between w-3/4 mx-auto my-8">
          <SignInBtn />
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <path
              fill="#1877F2"
              d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
            />
            <path
              fill="#FFF"
              d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
            />
          </svg>
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
            />
          </svg>
        </div>
        <p className="text-base text-center mt-5 font-light">
          New int the app?{' '}
          <span className="text-red-plum font-semibold">Register</span>
        </p>
      </section>
    </>
  );
}
