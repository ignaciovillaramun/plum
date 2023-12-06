'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/components/ThemeProvider';

const getAttachmentById = async (id: string) => {
  try {
    const res = await fetch(`/api/attachment/${id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch note');
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default function EditTopicAttachments() {
  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [borderTheme, setBorderTheme] = useState('');
  const [textTheme, setTextTheme] = useState('');
  const { theme, setTheme }: any = useContext(ThemeContext);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const note = await getAttachmentById(id || '');
        if (note) {
          setTitle(note.title);
          setTopic(note.topic);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (theme === 'bg-red-plum') {
      setTextTheme('text-red-plum');
      setBorderTheme('border-red-plum');
    } else if (theme === 'bg-theme-color1') {
      setTextTheme('text-theme-color1');
      setBorderTheme('border-theme-color1');
    } else if (theme === 'bg-theme-color2') {
      setTextTheme('text-theme-color2');
      setBorderTheme('border-theme-color2');
    } else if (theme === 'bg-theme-color3') {
      setTextTheme('text-theme-color3');
      setBorderTheme('border-theme-color3');
    }
  }, [theme]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/attachment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
        }),
      });

      if (res.ok) {
        router.push(`/topics/${topic}`);
      } else {
        throw new Error('Fail to edit a topic');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          <h3 className="text-xl font-medium">Attachment Title</h3>
        </label>
        <input
          className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-12">
        <button
          className={`${borderTheme} ${textTheme} block mx-auto border-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
        >
          Edit Attachment
        </button>
      </div>
    </form>
  );
}
