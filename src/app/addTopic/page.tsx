'use client';

import Alert from '@/components/Alert';
import Image from 'next/image';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';

export interface TopicFormProps {
  onSubmit: (topic: {
    title: string;
    topic: string;
    image: File | null;
  }) => void;
}

export default function TopicForm({ onSubmit }: TopicFormProps) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [image, setImage] = useState<any | null>(null);
  const [imageBase64, setImage64] = useState<any | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      console.log(e);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        console.log(reader.result);
        setImage64(reader.result);
      };
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title.trim() || !topic.trim() || !image) {
      if (!formSubmitted) {
        setShowAlert(true);
      }
      return;
    }

    const newTopic = {
      title: title.trim(),
      topic: topic.trim(),
      image: imageBase64,
    };

    // Call the onSubmit callback function to submit the new topic
    onSubmit(newTopic);

    // Clear the form inputs
    setTitle('');
    setTopic('');
    setImage(null);
    setShowAlert(false);
    setFormSubmitted(true);
  };

  return (
    <div>
      {showAlert && (
        <Alert
          title="Error"
          topic="Title, Topic or Image cannot be empty"
          onClose={handleCloseAlert}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="topic"
          >
            Topic
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="topic"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
          {image && (
            <div>
              <p>Selected Image:</p>
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                width={20}
                height={20}
                className="mt-2"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Topic
          </button>
        </div>
      </form>
    </div>
  );
}
function setImage(file: File) {
  throw new Error('Function not implemented.');
}
