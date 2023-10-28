'use client';

import { Document, Page } from 'react-pdf';
import React, { useEffect, useState, Key, ReactNode, Component } from 'react';
import Image from 'next/image';
import AddData from '@/components/AddData';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SingleViewImg from '@/components/SingleViewImg';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const getImages = async () => {
  try {
    const res = await fetch('/api/image', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch images');
    }
    const imagesData = await res.json();
    console.log('Images data:', imagesData);

    return imagesData;
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getAttachments = async () => {
  try {
    const res = await fetch('/api/attachment', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch attachments');
    }
    const attachmentData = await res.json();
    console.log('Attachment data:', attachmentData);

    return attachmentData;
  } catch (error) {
    console.log('Error: ', error);
  }
};

const fetchImagesData = async (setDataFunction: any) => {
  try {
    const imagesData = await getImages();
    const imagesWithIndex = imagesData.map((image: any, index: string) => ({
      ...image,
      index,
    }));

    setDataFunction(imagesWithIndex);
  } catch (error) {
    console.error(error);
  }
};

const fetchAttachmentsData = async (setDataFunction: any) => {
  try {
    const attachmentsData = await getAttachments();
    const attachmentsWithIndex = attachmentsData.map(
      (attachments: any, index: string) => ({
        ...attachments,
        index,
      })
    );

    setDataFunction(attachmentsWithIndex);
  } catch (error) {
    console.error(error);
  }
};

export default function Course() {
  const [images, setImages] = useState<
    {
      title: ReactNode;
      topic: ReactNode;
      description: ReactNode;
      image: any;
      index: any;
      _id: Key | null | undefined;
    }[]
  >([]);
  const [attachments, setAttachments] = useState<
    {
      title: ReactNode;
      topic: ReactNode;
      attachment: any;
      index: any;
      _id: Key | null | undefined;
    }[]
  >([]);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [lightBoxKey, setLightBoxKey] = useState(0);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();

  useEffect(() => {
    fetchImagesData(setImages);
    fetchAttachmentsData(setAttachments);
    if (typeof window !== 'undefined') {
      setTopicId(id || null);
    }
  }, [id]);

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setIsLoading(false);
    }
  }, [images]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
    setLightBoxKey((prevKey) => prevKey + 1); // Trigger a re-render of Lightbox // not working
  };

  const openNewWindow = (url: any) => {
    let pdfWindow = window.open('');
    if (pdfWindow) {
      pdfWindow.document.write(
        `<iframe width='100%' height='100%' src=${url}></iframe>`
      );
    }
  };

  const wordAlert = () => {
    alert('Word document does not have a preview, download instead');
  };

  function isPDF(base64data: any) {
    const parts = base64data.split(';');

    if (parts.length >= 2) {
      const fileType = parts[0].split(':')[1];
      const pdf = fileType === 'application/pdf' ? true : false;
      return pdf;
    } else {
      // Unable to extract the file type
      return null;
    }
  }

  // Sample data for demonstration purposes
  const courseData = {
    attachments: ['Attachment 1.pdf', 'Attachment 2.docx'],
    notes: 'These are course notes.',
    urls: ['https://example.com/url1', 'https://example.com/url2'],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Information</h1>

      <h2 className="text-xl font-semibold mb-2">Images</h2>
      {/* Images Section */}
      <div className="mb-4 overflow-x-auto whitespace-nowrap">
        {Array.isArray(images) && images.length > 0
          ? images.map(
              (image: {
                title: ReactNode;
                topic: ReactNode;
                description: ReactNode;
                image: any;
                index: any;
                _id: Key | null | undefined;
              }) => {
                if (image.topic == topicId) {
                  return (
                    <div
                      key={image._id}
                      className="inline-block mr-4 rounded-2xl shadow-lg border border-gray-200 p-2 transform transition-transform hover:scale-105"
                      onClick={() => openLightbox(image.index)}
                    >
                      <Image
                        src={image.image}
                        alt={`Image ${image._id}`}
                        width={200}
                        height={200}
                        className="rounded-lg"
                        loading="lazy"
                      />
                      <div className="mt-2 text-center font-semibold text-gray-700">
                        {image.title}
                      </div>
                    </div>
                  );
                }
              }
            )
          : null}
        <Link href={`/addTopicImage/${id}`}>
          <AddData onAdd={() => {}} />
        </Link>
      </div>

      {/* Pictures SIgle View */}
      {isOpen && images.length > 0 && (
        <div
          onClick={closeLightbox}
          className="absolute top-0 w-full h-full bg-black bg-opacity-90 p-10 flex justify-center z-50"
        >
          <SingleViewImg
            imgPath={images[photoIndex]?.image}
            altText={`picture ${photoIndex}`}
            description={images[photoIndex]?.description}
          />
        </div>
      )}

      {/* Attachments Section */}
      <h2 className="text-xl font-semibold mb-2">Attachments</h2>
      {Array.isArray(attachments) && attachments.length > 0
        ? attachments.map(
            (attachment: {
              title: ReactNode;
              topic: ReactNode;
              attachment: any;
              index: any;
              _id: Key | null | undefined;
            }) => {
              if (attachment.topic == topicId) {
                return (
                  <>
                    <div
                      key={attachment._id}
                      className="inline-block mr-4 rounded-2xl shadow-lg border border-gray-200 p-2 transform transition-transform hover:scale-105"
                      // onClick={() => openLightbox(attachment.index)}
                    >
                      {isPDF(attachment.attachment) ? (
                        <Image
                          src="/pdf.png"
                          alt={`Attachment ${attachment._id}`}
                          width={200}
                          height={200}
                          className="rounded-lg"
                          loading="lazy"
                          onClick={() => openNewWindow(attachment.attachment)}
                        />
                      ) : (
                        <Image
                          src="/word.png"
                          alt={`Attachment ${attachment._id}`}
                          width={200}
                          height={200}
                          className="rounded-lg"
                          loading="lazy"
                          onClick={wordAlert}
                        />
                      )}

                      <div className="mt-2 text-center font-semibold text-gray-700">
                        {attachment.title}
                      </div>
                      <a
                        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        href={attachment.attachment}
                        download
                      >
                        Download File
                      </a>
                    </div>
                  </>
                );
              }
            }
          )
        : null}
      <Link href={`/addTopicAttachment/${id}`}>
        <AddData onAdd={() => {}} />
      </Link>

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
    </div>
  );
}
