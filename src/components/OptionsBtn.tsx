'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OptionsBtn(props: { topicId: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      const res = await fetch(`api/topics?id=${props.topicId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // not working
        router.refresh();
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="px-2 py-1 text-gray-600 focus:outline-none"
        onClick={toggleOptions}
      >
        <span className="text-2xl">&#8942;</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <ul className="py-2">
            <li>
              <Link href={`/editTopic/${props.topicId}`}>
                <button
                  type="button"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Edit
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={removeTopic}
                type="button"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
