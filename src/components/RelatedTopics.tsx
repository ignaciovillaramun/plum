'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState, Key, ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeContext } from '@/components/ThemeProvider';
import { usePathname, useRouter } from 'next/navigation';

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
    setDataFunction(profilesData);
  } catch (error) {
    console.error(error);
  }
};

export default function RelatedTopics() {
  const [topics, setProfiles] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [textTheme, setTextTheme] = useState('');
  const { theme, setTheme }: any = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = usePathname();
  const parentId = searchParams?.split('/').pop();

  useEffect(() => {
    fetchData(setProfiles);
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    AOS.init();
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

  useEffect(() => {
    if (Array.isArray(topics) && topics.length > 0) {
      setIsLoading(false);
    }
  }, [topics]);

  const handleAddRelatedTopic = async (topic: any) => {
    const shouldAddTopic = window.confirm(
      `Do you want to add the related topic: ${topic.title}?`
    );
    if (shouldAddTopic) {
      console.log('Data about the topic:', topic);
      try {
        const res = await fetch(`/api/related`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            title: topic.title,
            parentTopic: parentId,
            topicId: topic._id,
            image: topic.image,
            user: topic.user,
          }),
        });

        if (res.ok) {
          router.push(`/topics/${parentId}`);
        } else {
          throw new Error('Fail to create a topic');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (Array.isArray(topics) && topics.length > 0) {
    return (
      <>
        {topics.map(
          (topic: {
            title: ReactNode;
            topic: ReactNode;
            user: ReactNode;
            tag: ReactNode;
            image: any;
            _id: Key | null | undefined;
          }) => {
            if (topic.user === userId && topic._id !== parentId) {
              return (
                <div
                  key={`${topic._id}`}
                  data-aos="fade-up"
                  className="block bg-white shadow-md rounded-lg my-8 mx-auto w-72 md:inline-block md:mr-5"
                >
                  <div className="relative h-36 overflow-hidden rounded-t-lg">
                    <Image
                      src={topic.image}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center top"
                      alt="Dashboard"
                    />
                  </div>
                  <div className=" flex p-4 justify-between items-center">
                    <h2 className="text-xl font-semibold">{topic.title}</h2>
                    <button
                      className=" bg-white shadow-md rounded-full hover:bg-gray-100 focus:outline-none"
                      onClick={() => handleAddRelatedTopic(topic)}
                    >
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
                  </div>
                </div>
              );
            }
          }
        )}
      </>
    );
  } else {
    return <p>No related topics available.</p>;
  }
}
