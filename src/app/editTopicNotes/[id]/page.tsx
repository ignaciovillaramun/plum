'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/components/ThemeProvider';
import Image from 'next/image';

const getNoteById = async (id: string) => {
  try {
    const res = await fetch(`/api/note/${id}`, {
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

export default function EditTopicNotes() {
  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [borderTheme, setBorderTheme] = useState('');
  const [textTheme, setTextTheme] = useState('');
  const { theme, setTheme }: any = useContext(ThemeContext);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const note = await getNoteById(id || '');
        if (note) {
          setDescription(note.description);
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
      const res = await fetch(`/api/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
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
    <div className='p-5 md:py-10 md:w-2/3 md:mx-auto'>
      <Image
        src="/createTopic/letter.png"
        alt="Selected"
        width={150}
        height={150}
        className="block mx-auto"
      />
    <form onSubmit={handleSubmit}>
      <div className="mt-10">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          <h3 className="text-xl font-medium">Note Title</h3>
        </label>
        <input
          className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <p className="text-xl mt-8">Note Description</p>
        <div className="mt-2">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="title"
          ></label>
          <textarea
            className=" border  border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:h-40"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-12">
        <button
          className={`${borderTheme} ${textTheme} block mx-auto border-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
        >
          Edit Note
        </button>
      </div>
    </form>
  </div>
  );
}
