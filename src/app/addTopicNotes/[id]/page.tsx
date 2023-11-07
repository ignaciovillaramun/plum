'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateItems from '@/components/CreateItems';
import { usePathname } from 'next/navigation';

export default function NotesForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

    if (!title.trim() || !description.trim()) {
      if (!formSubmitted) {
        setShowAlert(true);
      }
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/note/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
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
    setDescription('');
    setShowAlert(false);
    setFormSubmitted(true);
  };

  return (
    <CreateItems
      name="Notes"
      showAlert={showAlert}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      handleCloseAlert={handleCloseAlert}
    />
  );
}
