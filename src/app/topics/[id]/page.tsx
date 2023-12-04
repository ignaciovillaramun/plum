'use client';

import { Document, Page } from 'react-pdf';
import React, {
  useEffect,
  useState,
  Key,
  ReactNode,
  Component,
  useContext,
} from 'react';
import Image from 'next/image';
import AddData from '@/components/AddData';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SingleViewImg from '@/components/SingleViewImg';
import { useRouter } from 'next/navigation';
import { pdfjs } from 'react-pdf';
import { ThemeContext } from '@/components/ThemeProvider';
import { Suspense } from 'react';
import OptionsBtn from '@/components/OptionsBtn';

//BACKEND HOOKS
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

type Note = {
  title: string | undefined;
  topic: ReactNode;
  description: string | undefined;
  index: any;
  _id: Key | null | undefined;
};

const getHeaderImages = async (id: any, setHeaderImage: any) => {
  try {
    const res = await fetch(`/api/topics/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await res.json();
    setHeaderImage(userData.image);
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
};

const getImages = async () => {
  try {
    const res = await fetch('/api/image', {
      method: 'GET',
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
      method: 'GET',
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

const getNotes = async () => {
  try {
    const res = await fetch('/api/note', {
      method: 'GET',
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

const getUrls = async () => {
  try {
    const res = await fetch('/api/url', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch images');
    }
    const urlsData = await res.json();
    console.log('Images data:', urlsData);

    return urlsData;
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

const fetchNotesData = async (setDataFunction: any) => {
  try {
    const notesData = await getNotes();
    const notesWithIndex = notesData.map((notes: any, index: string) => ({
      ...notes,
      index,
    }));

    setDataFunction(notesWithIndex);
  } catch (error) {
    console.error(error);
  }
};

const fetchUrlsData = async (setDataFunction: any) => {
  try {
    const urlsData = await getUrls();
    const urlsWithIndex = urlsData.map((url: any, index: string) => ({
      ...url,
      index,
    }));

    setDataFunction(urlsWithIndex);
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
  const [urls, setUrls] = useState<
    {
      title: ReactNode;
      url: ReactNode;
      topic: ReactNode;
      index: any;
      _id: Key | null | undefined;
    }[]
  >([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const { theme, setTheme }: any = useContext(ThemeContext);
  const [textTheme, setTextTheme] = useState('');
  const [topicId, setTopicId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [lightBoxKey, setLightBoxKey] = useState(0);
  const [numPages, setNumPages] = useState<number>();
  const [headerImage, setHeaderImage] = useState('');
  const [pageNumber, setPageNumber] = useState<number>(1);

  //UI HOOKS
  const [openImage, setOpenImage] = useState([false, 'rotate-0']);
  const [openAttachments, setOpenAttachments] = useState([false, 'rotate-0']);
  const [openNotes, setOpenNotes] = useState([false, 'rotate-0']);
  const [openUrls, setOpenUrls] = useState([false, 'rotate-0']);

  // CHange text colore based in color theme
  useEffect(() => {
    if (theme === 'bg-red-plum') {
      setTextTheme('text-red-plum');
    } else if (theme === 'bg-theme-color1') {
      setTextTheme('text-theme-color1');
    } else if (theme === 'bg-theme-color2') {
      setTextTheme('text-theme-color2');
    } else if (theme === 'bg-theme-color3') {
      setTextTheme('text-theme-color3');
    }
  }, [theme]);

  const router = useRouter();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();

  useEffect(() => {
    fetchImagesData(setImages);
    fetchAttachmentsData(setAttachments);
    fetchNotesData(setNotes);
    getHeaderImages(id, setHeaderImage);
    fetchUrlsData(setUrls);
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
    urls: [
      { name: 'Node Js', url: 'https://nodejs.org/en/' },
      {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/questions/5119041/how-can-i-get-a-web-sites-favicon',
      },
    ],
  };

  return (
    <div className="pb-40">
      {/* Attachments Section */}
      <Image
        className="w-full max-h-56 object-cover md:max-h-[320px]"
        width={100}
        height={100}
        alt="course Picture"
        src={headerImage}
      />
      <h1 className="text-2xl text-center font-bold mb-6 px-8 pt-8 md:text-4xl md:mb-10">
        Topic Information
      </h1>

      <div
        className="flex mb-2 px-8 py-5 bg-zinc-200 justify-between md:px-16"
        onClick={() => {
          openImage[0]
            ? setOpenImage([false, 'rotate-0'])
            : setOpenImage([true, 'rotate-180']);
        }}
      >
        <h2 className="text-xl font-semibold">Images</h2>
        <svg
          className={`${textTheme} w-6 text-theme-color ${openImage[1]}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
        >
          <g transform="translate(0 1024) scale(1 -1)">
            <path
              fill="currentColor"
              d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
            />
          </g>
        </svg>
      </div>

      {openImage[0] && (
        <section className="relative pl-8 py-5 scrollbar-hide min-h-[150px]">
          <div className="mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
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
          </div>
          <div className="absolute inset-y-1/4 end-0 drop-shadow-lg">
            <Link href={`/addTopicImage/${id}`}>
              <AddData onAdd={() => {}} />
            </Link>
          </div>
        </section>
      )}

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
      <div
        className=" flex mb-2 px-8 py-5 bg-zinc-200 justify-between md:px-16"
        onClick={() => {
          openAttachments[0]
            ? setOpenAttachments([false, 'rotate-0'])
            : setOpenAttachments([true, 'rotate-180']);
        }}
      >
        <h2 className="text-xl font-semibold">Attachments</h2>
        <svg
          className={` w-6 ${textTheme} ${openAttachments[1]}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
        >
          <g transform="translate(0 1024) scale(1 -1)">
            <path
              fill="currentColor"
              d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
            />
          </g>
        </svg>
      </div>
      {openAttachments[0] && (
        <section className="relative pl-8 py-5 min-h-[150px]">
          <div className="mb- overflow-x-auto whitespace-nowrap scrollbar-hide">
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
                            className=" inline-block mr-4 rounded-2xl shadow-lg border border-gray-200 p-4 transform transition-transform hover:scale-105"
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
                                onClick={() =>
                                  openNewWindow(attachment.attachment)
                                }
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
                              className={`flex items-center justify-center ${theme} text-white px-4 py-2 rounded hover:bg-blue-700`}
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
            <div className="absolute inset-y-1/4 end-0 drop-shadow-lg">
              <Link href={`/addTopicAttachment/${id}`}>
                <AddData onAdd={() => {}} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Notes Section */}
      <div
        className=" flex mb-2 px-8 py-5 bg-zinc-200 justify-between md:px-16"
        onClick={() => {
          openNotes[0]
            ? setOpenNotes([false, 'rotate-0'])
            : setOpenNotes([true, 'rotate-180']);
        }}
      >
        <h2 className="text-xl font-semibold">Notes</h2>
        <svg
          className={`w-6 ${textTheme} ${openNotes[1]}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
        >
          <g transform="translate(0 1024) scale(1 -1)">
            <path
              fill="currentColor"
              d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
            />
          </g>
        </svg>
      </div>
      {openNotes[0] && (
        <section className="relative pl-8 py-5 min-h-[150px]">
          <div className="mb- overflow-x-auto whitespace-nowrap scrollbar-hide">
            {Array.isArray(notes) && notes.length > 0
              ? notes.map((note) => {
                  if (note.topic === topicId) {
                    return (
                      <div
                        key={note._id}
                        className="inline-block mr-4 rounded-2xl shadow-lg border border-gray-200 p-2 transform transition-transform hover:scale-105"
                      >
                        <Link
                          href={{
                            pathname: '/viewNote',
                            query: {
                              title: note.title || '',
                              description: note.description || '',
                            },
                          }}
                        >
                          <Image
                            src="/notes.png"
                            alt={`Attachment ${note._id}`}
                            width={200}
                            height={200}
                            className="rounded-lg"
                            loading="lazy"
                          />
                        </Link>
                        <div className="mt-2 text-center font-semibold text-gray-700">
                          {note.title || 'No Title'}{' '}
                          {/* Handle undefined title with a default */}
                        </div>
                      </div>
                    );
                  }
                })
              : null}
            <div className="absolute inset-y-1/4 end-0 drop-shadow-lg">
              <Link href={`/addTopicNotes/${id}`}>
                <AddData onAdd={() => {}} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* URLs Section */}
      <div
        className=" flex mb-2 px-8 py-5 bg-zinc-200 justify-between md:px-16"
        onClick={() => {
          openUrls[0]
            ? setOpenUrls([false, 'rotate-0'])
            : setOpenUrls([true, 'rotate-180']);
        }}
      >
        <h2 className="text-xl font-semibold">URLs</h2>
        <svg
          className={`w-6 ${textTheme} ${openUrls[1]}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
        >
          <g transform="translate(0 1024) scale(1 -1)">
            <path
              fill="currentColor"
              d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
            />
          </g>
        </svg>
      </div>
      {openUrls[0] && (
        <section className="relative overflow-hidden pl-8 py-5 scrollbar-hide min-h-[150px]">
          <ul className=" overflow-x-auto whitespace-nowrap scrollbar-hide">
            {urls.map((url) => {
              if (url.topic == topicId) {
                return (
                  <li
                    key={url._id}
                    className="relative overflow-hidden inline-block mr-4 rounded-2xl shadow-lg border border-gray-200 p-2 transform transition-transform hover:scale-105"
                  >
                    <a
                      href={url.url?.toString() ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      <Image
                        src="/notes.png"
                        alt={`Attachment ${''}`}
                        width={200}
                        height={200}
                        className="rounded-lg"
                        loading="lazy"
                      />
                    </a>
                    <div className=" flex p-4 justify-between items-center">
                      {url.title}
                      <OptionsBtn link={`/editTopicUrls/${url._id}`} />
                    </div>
                  </li>
                );
              }
            })}
          </ul>

          <div className="absolute inset-y-1/4 end-0 drop-shadow-lg">
            <Link href={`/addTopicUrls/${id}`}>
              <AddData onAdd={() => {}} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
