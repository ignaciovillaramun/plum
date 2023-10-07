'use client';

import React from 'react';
import Image from 'next/image';
import AddData from '@/components/AddData';

export default function Course() {
  // Sample data for demonstration purposes
  const courseData = {
    images: [
      'https://lh3.googleusercontent.com/a/ACg8ocL7B_2ujtGrcNct_4hfLzShSItmg7_tZ5uHaSR63wkrJw=s96-c',
      'https://lh3.googleusercontent.com/a/ACg8ocL7B_2ujtGrcNct_4hfLzShSItmg7_tZ5uHaSR63wkrJw=s96-c',
      'https://lh3.googleusercontent.com/a/ACg8ocL7B_2ujtGrcNct_4hfLzShSItmg7_tZ5uHaSR63wkrJw=s96-c',
      'https://lh3.googleusercontent.com/a/ACg8ocL7B_2ujtGrcNct_4hfLzShSItmg7_tZ5uHaSR63wkrJw=s96-c',
      'https://lh3.googleusercontent.com/a/ACg8ocL7B_2ujtGrcNct_4hfLzShSItmg7_tZ5uHaSR63wkrJw=s96-c',
      'https://lh3.googleusercontent.com/a/ACg8ocL7B_2ujtGrcNct_4hfLzShSItmg7_tZ5uHaSR63wkrJw=s96-c',
    ],
    attachments: ['Attachment 1.pdf', 'Attachment 2.docx'],
    notes: 'These are course notes.',
    urls: ['https://example.com/url1', 'https://example.com/url2'],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Information</h1>

      {/* Images Section */}
      <div className="mb-4 overflow-x-auto whitespace-nowrap">
        {courseData.images.map((imageUrl, index) => (
          <div key={index} className="inline-block mr-4">
            <Image
              src={imageUrl}
              alt={`Image ${index + 1}`}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        ))}
        <AddData onAdd={() => {}} />
      </div>

      {/* Attachments Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Attachments</h2>
        <ul>
          {courseData.attachments.map((attachment, index) => (
            <li key={index}>
              <a
                href={`path/to/attachment/${attachment}`}
                download
                className="text-blue-500 hover:underline"
              >
                {attachment}
              </a>
            </li>
          ))}
        </ul>
        <AddData onAdd={() => {}} />
      </div>

      {/* Notes Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <p className="text-gray-700">{courseData.notes}</p>
      </div>

      {/* URLs Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">URLs</h2>
        <ul>
          {courseData.urls.map((url, index) => (
            <li key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Button Component */}
      {/* <SectionButton /> */}
    </div>
  );
}
