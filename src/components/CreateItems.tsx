import React, { useState } from 'react';
import Alert from './Alert'; // Assuming you have an Alert component
import Image from 'next/image';

interface CreateItemsProps {
  showAlert: boolean;
  title: string;
  setTitle: (title: string) => void;
  image: File | null;
  handleSubmit: (e: React.FormEvent) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseAlert: () => void;
}

function CreateItems({
  showAlert,
  title,
  setTitle,
  image,
  handleSubmit,
  handleImageUpload,
  handleCloseAlert,
}: CreateItemsProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      {showAlert && (
        <Alert
          title="Error"
          topic="Title and Image cannot be empty"
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
                width={80}
                height={120}
                className="mt-2"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Topic
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateItems;
