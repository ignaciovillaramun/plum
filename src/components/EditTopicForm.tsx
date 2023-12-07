'use client';

import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/components/ThemeProvider';

export default function EditTopicForm(props: {
  id: any;
  title: any;
  image: any;
}) {
  const [newTitle, setNewTitle] = useState(props.title);
  const [newImage, setNewImage] = useState(props.image);
  const [newImageBase64, setImage64] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [borderTheme, setBorderTheme] = useState('');
  const [textTheme, setTextTheme] = useState('');
  const { theme, setTheme }: any = useContext(ThemeContext);

  const router = useRouter();

  useEffect(() => {
    setNewTitle(props.title);
    setNewImage(props.image);
    setImage64(props.image);
  }, [props.title, props.image]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);
      setNewImage(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setImage64(reader.result);
      };
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/topics/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newImage: newImageBase64 }),
      });

      if (!res.ok) {
        throw new Error('Fail to update a topic');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 md:w-2/3 md:mx-auto">
      <Image
        src="/createTopic/letter.png"
        alt="Selected"
        width={150}
        height={150}
        className="block mx-auto"
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-gray-700 font-bold mb-5 md:text-2xl"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full mb-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2 md:text-2xl"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="mb-4">
          {selectedImage ? (
            <div>
              <p>Selected Image:</p>
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                width={80}
                height={80}
                className="mt-2"
              />
            </div>
          ) : (
            newImage && (
              <div>
                <p>Current Image:</p>
                <Image
                  src={newImage}
                  alt="Current"
                  width={80}
                  height={80}
                  className="mt-2"
                />
              </div>
            )
          )}
        </div>
        <div className="mb-4">
          <button
            className={`${theme} text-white py-2 px-4 rounded mx-auto block w-1/3`}
            type="submit"
          >
            Edit Topic
          </button>
        </div>
      </form>
    </div>
  );
}
function setNewImage(file: File) {
  throw new Error('Function not implemented.');
}
