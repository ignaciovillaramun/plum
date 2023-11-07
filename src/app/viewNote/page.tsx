'use client';

import React, { useEffect, useState, ReactNode, Key } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ViewNote() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const description = searchParams.get('description');

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-yellow-200 p-4 rounded-lg shadow-md border w-9/12 border-gray-300">
        <div>
          <h1 className="text-xl font-semibold mb-2 uppercase">
            Title: {title}
          </h1>
          <p className="text-gray-600">
            {description
              ? description.split('\n').map((line, index) => (
                  <span key={index} className="">
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))
              : 'No description available'}
          </p>
        </div>
        {/* Additional content for your viewNote page */}
      </div>
    </div>
  );
}
