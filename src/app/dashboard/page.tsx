'use client';
import TopicList from '@/components/TopicList';
import Link from 'next/link';
import { ThemeContext } from '@/components/ThemeProvider';
import {
  useContext,
  useEffect,
  useState,
  Suspense,
  ReactNode,
  Key,
} from 'react';

import { useSelectedLabel } from '@/components/SelectedLabelContext';
const getTopics = async () => {
  try {
    const res = await fetch('/api/topics', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return res.json();
  } catch (error) {
    console.log('Error: ', error);
  }
};

const fetchData = async (setDataFunction: any) => {
  try {
    const profilesData = await getTopics();

    if (profilesData) {
      const uniqueTagsSet = new Set(
        profilesData
          .filter((topic: any) => topic.tag)
          .map((topic: any) => {
            const lowercasedTag = topic.tag.toLowerCase();

            return lowercasedTag;
          })
      );

      const uniqueTagsArray = Array.from(uniqueTagsSet);

      setDataFunction(uniqueTagsArray);
    }
  } catch (error) {
    console.error(error);
  }
};

export default function DashBoard() {
  const { selectedLabel, setSelectedLabel } = useSelectedLabel();

  const { theme, setTheme }: any = useContext(ThemeContext);
  const [textTheme, setTextTheme] = useState('');
  const [topics, setProfiles] = useState([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedLabel(selectedValue);
    localStorage.setItem('selectedLabel', selectedValue);
  };
  useEffect(() => {
    fetchData(setProfiles);
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

  // const { title, image, tag } = data || {};

  return (
    <div>
      <div className="flex items-center justify-between mt-8 mb-5 px-6 md:px-20">
        <h1 className={`text-4xl ${textTheme}`}>Dashboard</h1>
        <label htmlFor="dropdown">Select an option:</label>
        <select
          id="dropdown"
          value={selectedLabel || ''}
          onChange={handleOptionChange}
        >
          <option value="" disabled>
            Select one Option
          </option>
          <option value=""> -- Default Option --</option>

          {Array.isArray(topics) &&
            topics.length > 0 &&
            topics.map((tag: string, index: number) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
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
            <TopicList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
