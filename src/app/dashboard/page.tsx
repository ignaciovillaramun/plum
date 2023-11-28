'use client';
import TopicList from '@/components/TopicList';
import Link from 'next/link';
import { ThemeContext } from '@/components/ThemeProvider';
import { useContext, useEffect, useState, Suspense } from 'react';

export default function DashBoard() {
  const { theme, setTheme }: any = useContext(ThemeContext);
  const [textTheme, setTextTheme] = useState('');
  const [label, setLabel] = useState('asdasdadsasd');

  const handleOptionChange = (event: any) => {
    setLabel(event.target.value);
  };

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

  return (
    <div>
      <div className="flex items-center justify-between mt-8 mb-5 px-6 md:px-20">
        <h1 className={`text-4xl ${textTheme}`}>Dashboard</h1>
        <label htmlFor="dropdown">Select an option:</label>
        <select id="dropdown" value={label} onChange={handleOptionChange}>
          <option value="option1">Religion</option>
          <option value="option2">Mathematics</option>
        </select>{' '}
        <Link href={'/addTopic'}>
          <button className=" bg-white shadow-md rounded-full hover:bg-gray-100 focus:outline-none">
            <svg
              className={`w-10 ${textTheme}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1200"
            >
              <path
                fill="currentColor"
                d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-95.801 261.841h191.602v242.358h242.358v191.602H695.801v242.358H504.199V695.801H261.841V504.199h242.358V261.841z"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="w-full">
        <div className="flex-col pb-24 md:flex-row md:px-20">
          <Suspense fallback={<p>Loading feed...</p>}>
            <TopicList label={label} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
