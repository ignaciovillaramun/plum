'use client';

import { usePathname } from 'next/navigation';
import EditTopicForm from '@/components/EditTopicForm';
import { useEffect, useState } from 'react';

// Define a type for the topic data
type TopicData = {
  title: any;
  topic: any;
  image: any;
};

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topic');
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default function EditTopicPage() {
  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const topic = await getTopicById(id || '');
        if (topic) {
          setData(topic);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  // const { topic } = data || {};
  const { title, image } = data || {};

  return (
    <>
      <EditTopicForm id={id} title={title} image={image} />
    </>
  );
}
