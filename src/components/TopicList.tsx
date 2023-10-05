'use client';

import Image from 'next/image';
import OptionsBtn from './OptionsBtn';
import React, { useEffect, useState, Key, ReactNode } from 'react';

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

export default function TopicList() {
  const [topics, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const profilesData = await getTopics();
        setProfiles(profilesData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  if (Array.isArray(topics) && topics.length > 0) {
    return (
      <>
        {topics.map(
          (topic: {
            title: ReactNode;
            topic: ReactNode;
            image: any;
            _id: Key | null | undefined;
          }) => (
            <div
              key={`${topic._id}`}
              className="bg-white shadow-md rounded-lg my-4 w-60"
            >
              <div className="relative h-36 overflow-hidden rounded-t-lg">
                <Image
                  src={topic.image}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center top"
                  alt="Dashboard"
                />
                <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <OptionsBtn topicId={topic._id} />
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
                <h3 className="text-gray-600">{topic.topic}</h3>
              </div>
            </div>
          )
        )}
      </>
    );
  } else {
    return <p>No topics available.</p>;
  }
}
