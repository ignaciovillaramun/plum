'use client';

import Alert from '@/components/Alert';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/components/UserProvider';
import CreateItems from '@/components/CreateItems';

export default function TopicForm({}) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<any | null>(null);
  const [imageBase64, setImage64] = useState<any | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const { user } = useUser();

  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setImage64(reader.result);
      };
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title.trim() || !image) {
      if (!formSubmitted) {
        setShowAlert(true);
      }
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, image: imageBase64, user }),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        throw new Error('Fail to create a topic');
      }
    } catch (error) {
      console.log(error);
    }

    // Clear the form inputs
    setTitle('');
    setImage(null);
    setShowAlert(false);
    setFormSubmitted(true);
  };

  return (
    <CreateItems
      name="Topic"
      showAlert={showAlert}
      title={title}
      setTitle={setTitle}
      // description={''}
      // setDescription={setDescription}
      image={image}
      handleSubmit={handleSubmit}
      handleImageUpload={handleImageUpload}
      handleCloseAlert={handleCloseAlert}
    />
  );
}
function setImage(file: File) {
  throw new Error('Function not implemented.');
}
