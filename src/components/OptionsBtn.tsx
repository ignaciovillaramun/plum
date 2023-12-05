'use client';

import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/components/ThemeProvider';

export default function OptionsBtn(props: {
  api?: any;
  fetchData?: ((props: any) => (event: any) => void) | undefined;
  profiles?: any;
  link?: any;
}) {
  const { theme, setTheme }: any = useContext(ThemeContext);
  const [textTheme, setTextTheme] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const removeTopic = async () => {
    try {
      // const confirmed = confirm('Are you sure');

      // if (confirmed) {
      const res = await fetch(`${props.api}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
        if (props.fetchData) {
          props.fetchData(props.profiles);
        }
      } else {
        console.error('Error deleting the topic:', res.status, res.statusText);
      }
      // }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const optionsMenu = document.querySelector('.options-menu');

      if (optionsMenu && !optionsMenu.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (theme === 'bg-red-plum') {
      setTextTheme('text-red-plum');
    } else if (theme === 'bg-theme-color1') {
      setTextTheme('text-theme-color1');
    } else if (theme === 'bg-theme-color2') {
      setTextTheme('text-theme-color2');
    } else if (theme === 'bg-theme-color3') {
      setTextTheme('text-theme-color3');
    }
  }, [theme]);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className=" text-gray-600 focus:outline-none"
        onClick={toggleOptions}
      >
        <span className={`text-4xl ${textTheme}`}>&#8942;</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-[-115px] mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 options-menu">
          <ul className="py-2">
            <li>
              <Link href={`${props.link}`}>
                <button
                  type="button"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Edit
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={removeTopic}
                type="button"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
