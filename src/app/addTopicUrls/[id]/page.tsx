'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateItems from '@/components/CreateItems';
import { usePathname } from 'next/navigation';

export default function NotesForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const router = useRouter();
  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      if (!formSubmitted) {
        setShowAlert(true);
      }
      return;
    }

    try {
      const res = await fetch(`/api/url/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          url,
        }),
      });

      if (res.ok) {
        router.push(`/topics/${id}`);
      } else {
        throw new Error('Fail to create a topic');
      }
    } catch (error) {
      console.log(error);
    }

    // Clear the form inputs
    setTitle('');
    setUrl('');
    setShowAlert(false);
    setFormSubmitted(true);
  };

  return (
    <CreateItems
      name="Url"
      showAlert={showAlert}
      title={title}
      setTitle={setTitle}
      url={url}
      setUrl={setUrl}
      handleSubmit={handleSubmit}
      handleCloseAlert={handleCloseAlert}
    />
  );
}
