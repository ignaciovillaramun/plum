'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateItems from '@/components/CreateItems';
import { usePathname } from 'next/navigation';

export default function ImageForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<any | null>(null);
  const [imageBase64, setImage64] = useState<any | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const router = useRouter();
  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();

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

    if (!title.trim() || !image || !description) {
      if (!formSubmitted) {
        setShowAlert(true);
      }
      return;
    }

    try {
      const res = await fetch(`/api/image/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image: imageBase64,
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
    setImage(null);
    setShowAlert(false);
    setFormSubmitted(true);
  };

  return (
    <CreateItems
      name="Image"
      showAlert={showAlert}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      image={image}
      handleSubmit={handleSubmit}
      handleImageUpload={handleImageUpload}
      handleCloseAlert={handleCloseAlert}
    />
  );
}
