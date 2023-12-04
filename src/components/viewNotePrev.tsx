import React, { useEffect, useState, ReactNode, Key } from 'react';

export default function ViewNote(id: any, title: any, description: any) {
  return (
    <div className="bg-gray-100 p-8">
      <div
        key={id}
        className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mb-4"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        {/* Description */}
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
