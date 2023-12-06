'use client';
import RelatedTopics from '@/components/RelatedTopics';
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
        <h1 className={`text-4xl ${textTheme}`}>Add Topic Related</h1>
      </div>
      <div className="w-full">
        <div className="flex-col pb-24 md:flex-row md:px-20">
          <Suspense fallback={<p>Loading feed...</p>}>
            <RelatedTopics />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
