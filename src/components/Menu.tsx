'use client';

import React, { useState, useEffect, useContext } from 'react';
import { themeColor } from '@/app/layout';
import Link from 'next/link';



function Menu() {

  // Get the values from state context in Layout
  const {theme, setTheme}: any = useContext(themeColor);

  return (
    <div 
      id="menu"
      className={`bg-${theme} flex justify-between py-3 px-4 w-full fixed bottom-0
            md:fixed md:flex-col md:w-20 md:h-full md:justify-normal z-10`}
    >
      <Link href={'/dashboard'}>
        <svg
          className={`text-white w-9
        md:mb-5`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z" />
        </svg>
      </Link>

      <Link href={'/'}>
        <svg
          className={`text-white w-9
        md:mb-5`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"
          />
        </svg>
      </Link>
      <Link href={'/profile'}>
        <svg
          className={`text-white w-9
        md:mb-5`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
            <path
              fill="currentColor"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2ZM8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0Zm9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984Z"
            />
          </g>
        </svg>
      </Link>
    </div>
  );
}

export default Menu;
