'use client';

import Image from 'next/image';
import OptionsBtn from './OptionsBtn';
import React, { useEffect, useState, Key, ReactNode } from 'react';
import Link from 'next/link';

const getTopics = async () => {
  try {
    const res = await fetch('api/topics', {
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

export default function TopicList() {
  const [topics, setProfiles] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(setProfiles);
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(topics) && topics.length > 0) {
      setIsLoading(false);
    }
  }, [topics]);

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
            image: any;
            _id: Key | null | undefined;
          }) => {
            if (topic.user == userId) {
              return (
                <div
                  key={`${topic._id}`}
                  className="bg-white shadow-md rounded-lg my-4 w-60"
                >
                  <div className="relative h-36 overflow-hidden rounded-t-lg">
                    <Link href={`/courses/${topic._id}`}>
                      <div className="relative h-36 overflow-hidden rounded-t-lg">
                        <Image
                          src={topic.image}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center top"
                          alt="Dashboard"
                        />
                      </div>
                    </Link>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-red rounded-full flex items-center justify-center">
                      <OptionsBtn
                        topicId={topic._id}
                        fetchData={() => fetchData}
                        profiles={setProfiles}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {topic.title}
                    </h2>
                    <h3 className="text-gray-600">{topic.topic}</h3>
                  </div>
                </div>
              );
            }
          }
        )}
      </>
    );
  } else {
    return <p>No topics available.</p>;
  }
}
