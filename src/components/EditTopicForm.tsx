'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface TopicFormProps {
  onSubmit: (topic: { title: string; description: string }) => void;
}

export default function EditTopicForm({ onSubmit }: TopicFormProps) {
  const [title, setTitle] = useState('');
  const [description, setTopic] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (selectedImage: File) => {
    setImage(selectedImage);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if title and description are not empty
    if (!title.trim() || !description.trim()) {
      return;
    }

    // Create a new topic object
    const newTopic = {
      title: title.trim(),
      description: description.trim(),
    };

    // Call the onSubmit callback function to submit the new topic
    onSubmit(newTopic);

    // Clear the form inputs
    setTitle('');
    setTopic('');
    setImage(null);
  };

  return (
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
          htmlFor="description"
        >
          Topic
        </label>
        <textarea
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="topic"
          placeholder="Enter topic"
          value={description}
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
          accept="image/*" // Specify that only image files are allowed
          onChange={(e) => {
            const selectedFile = e.target.files && e.target.files[0];
            if (selectedFile) {
              handleImageUpload(selectedFile);
            }
          }}
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
  );
}
