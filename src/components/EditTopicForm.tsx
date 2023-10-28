'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTopicForm(props: {
  id: any;
  title: any;
  image: any;
}) {
  const [newTitle, setNewTitle] = useState(props.title);
  const [newImage, setNewImage] = useState(props.image);
  const [newImageBase64, setImage64] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const router = useRouter();

  useEffect(() => {
    setNewTitle(props.title);
    setNewImage(props.image);
    setImage64(props.image);
  }, [props.title, props.image]);

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
      const res = await fetch(`http://localhost:3000/api/topics/${props.id}`, {
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
        // Redirect to Dashboard not working
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex w-8/10 mx-auto">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
