'use client';

import React, { useEffect, useState, Key, ReactNode, useContext } from 'react';
import Image from 'next/image';
import AddData from '@/components/AddData';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SingleViewImg from '@/components/SingleViewImg';
import { pdfjs } from 'react-pdf';
import { ThemeContext } from '@/components/ThemeProvider';
import OptionsBtn from '@/components/OptionsBtn';
import 'aos/dist/aos.css';
import AOS from 'aos';

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

type RelatedTopics = {
  title: ReactNode;
  parentTopic: ReactNode;
  topicId: ReactNode;
  image: any;
  user: ReactNode;
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

    return urlsData;
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getTopicRelated = async () => {
  try {
    const res = await fetch('/api/related', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch related topics');
    }
    const relatedTopicsData = await res.json();

    return relatedTopicsData;
  } catch (error) {
    console.log('Error: ', error);
  }
};

const fetchRelatedTopicsData = async (setDataFunction: any) => {
  try {
    const relatedTopicsData = await getTopicRelated();
    const relatedTopicsWithIndex = relatedTopicsData.map(
      (relatedTopics: any, index: string) => ({
        ...relatedTopics,
        index,
      })
    );

    setDataFunction(relatedTopicsWithIndex);
  } catch (error) {
    console.error(error);
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
  const [relatedTopics, setRelatedTopics] = useState<RelatedTopics[]>([]);
  const { theme, setTheme }: any = useContext(ThemeContext);
  const [textTheme, setTextTheme] = useState('');
  const [topicId, setTopicId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [lightBoxKey, setLightBoxKey] = useState(0);
  const [headerImage, setHeaderImage] = useState('');

  //UI HOOKS
  const [openImage, setOpenImage] = useState([false, 'rotate-0']);
  const [openAttachments, setOpenAttachments] = useState([false, 'rotate-0']);
  const [openNotes, setOpenNotes] = useState([false, 'rotate-0']);
  const [openUrls, setOpenUrls] = useState([false, 'rotate-0']);
  const [openRelated, setOpenRelated] = useState([true, 'rotate-180']);

  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();

  // CHange text color based in color theme
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

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchImagesData(setImages),
        fetchRelatedTopicsData(setRelatedTopics),
        fetchAttachmentsData(setAttachments),
        fetchNotesData(setNotes),
        getHeaderImages(id, setHeaderImage),
        fetchUrlsData(setUrls),
      ]);

      if (typeof window !== 'undefined') {
        setTopicId(id || null);
      }

      setIsLoading(false);
    };

    fetchData();
    AOS.init({
      once: true,
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  const closeLightBox = () => {
    setIsOpen(false);
  };

  const openLightBox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
    setLightBoxKey((prevKey) => prevKey + 1);
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

  const handleDataRefresh = () => {
    fetchImagesData(setImages);
    fetchRelatedTopicsData(setRelatedTopics);
    fetchAttachmentsData(setAttachments);
    fetchNotesData(setNotes);
    getHeaderImages(id, setHeaderImage);
    fetchUrlsData(setUrls);
  };

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Add smooth scrolling behavior
    });
  };

  return (
    <div className="pb-40">
      {/* Attachments Section */}
      <Image
        src={headerImage}
        className="w-full max-h-56 object-cover md:max-h-[320px]"
        width={100}
        height={100}
        alt="course Picture"
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
          <div className="mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide py-[20px] pr-10">
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
                          data-aos="fade-left"
                          key={image._id}
                          className="inline-block mr-4 rounded-2xl shadow-lg border border-gray-200 p-2 transform transition-transform hover:scale-105"
                        >
                          <div className="relative h-36 w-72 overflow-hidden rounded-t-lg">
                            <div onClick={() => openLightBox(image.index)}>
                              <Image
                                src={image.image}
                                alt={`Image ${image._id}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div className=" flex p-4 justify-between items-center ">
                            {image.title}
                            <OptionsBtn
                              link={`/editTopicImage/${image._id}`}
                              api={`/api/image?id=${image._id}`}
                              onDataRefresh={handleDataRefresh}
                            />
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
      {isOpen &&
        images.length > 0 &&
        (scrollToTop(),
        (
          <div
            onClick={closeLightBox}
            className={`absolute top-0 w-full h-[1300px] bg-black bg-opacity-90 p-10 z-50 md:fixed`}
          >
            <SingleViewImg
              imgPath={images[photoIndex]?.image}
              altText={`picture ${photoIndex}`}
              description={images[photoIndex]?.description}
            />
          </div>
        ))}

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
          <div className="mb- overflow-x-auto whitespace-nowrap scrollbar-hide py-[20px]">
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
                            data-aos="fade-left"
                            key={attachment._id}
                            className=" inline-block mr-4 rounded-2xl shadow-lg border border-gray-200 p-4 transform transition-transform hover:scale-105"
                          >
                            {isPDF(attachment.attachment) ? (
                              <Image
                                src="/pdf.png"
                                alt={`Attachment ${attachment._id}`}
                                width={100}
                                height={200}
                                className="block mx-auto"
                                loading="lazy"
                                onClick={() =>
                                  openNewWindow(attachment.attachment)
                                }
                              />
                            ) : (
                              <Image
                                src="/word.png"
                                alt={`Attachment ${attachment._id}`}
                                width={130}
                                height={200}
                                className="block mx-auto"
                                loading="lazy"
                                onClick={wordAlert}
                              />
                            )}

                            <div className="mt-2 text-center font-semibold text-gray-700">
                              {attachment.title}
                            </div>
                            <div className=" flex p-4 justify-between items-center ">
                              <a
                                className={`flex items-center justify-center ${theme} text-white px-4 py-2 rounded hover:bg-blue-700`}
                                href={attachment.attachment}
                                download
                              >
                                Download File
                              </a>
                              <OptionsBtn
                                link={`/editTopicAttachment/${attachment._id}`}
                                api={`/api/attachment?id=${attachment._id}`}
                                onDataRefresh={handleDataRefresh}
                              />
                            </div>
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
          <div className="mb- overflow-x-auto whitespace-nowrap scrollbar-hide py-[20px]">
            {Array.isArray(notes) && notes.length > 0
              ? notes.map((note) => {
                  if (note.topic === topicId) {
                    return (
                      <div
                        data-aos="fade-left"
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
                          <div className=" flex p-4 justify-between items-center ">
                            {note.title || 'No Title'}{' '}
                            <OptionsBtn
                              link={`/editTopicNotes/${note._id}`}
                              api={`/api/note?id=${note._id}`}
                              onDataRefresh={handleDataRefresh}
                            />
                          </div>
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
          <ul className=" overflow-x-auto whitespace-nowrap scrollbar-hide py-[20px]">
            {urls.map((url) => {
              if (url.topic == topicId) {
                return (
                  <li
                    key={url._id}
                    data-aos="fade-left"
                    className="inline-block bg-white shadow-md rounded-lg my-8 mx-5 w-52 md:mr-5"
                  >
                    <a
                      href={url.url?.toString() ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      <Image
                        src="/url.png"
                        alt={`Attachment ${''}`}
                        width={150}
                        height={200}
                        className="rounded-lg py-10 mx-auto"
                        loading="lazy"
                      />
                    </a>
                    <div className=" flex p-4 justify-between items-center ">
                      {url.title}
                      <OptionsBtn
                        link={`/editTopicUrls/${url._id}`}
                        api={`/api/url?id=${url._id}`}
                        onDataRefresh={handleDataRefresh}
                      />
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

      {/* // Related Topics Section */}
      <div
        className="flex mb-2 px-8 py-5 bg-zinc-200 justify-between md:px-16"
        onClick={() => {
          openRelated[0]
            ? setOpenRelated([false, 'rotate-0'])
            : setOpenRelated([true, 'rotate-180']);
        }}
      >
        <h2 className="text-xl font-semibold">Related Topics</h2>
        <svg
          className={`${textTheme} w-6 text-theme-color ${openRelated[1]}`}
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
      {openRelated[0] && (
        <section className="relative pl-8 py-5 min-h-[150px]">
          <div className=" overflow-x-auto scrollbar-hide">
            <div className=" px-8 py-5 justify-between md:px-16">
              <p className="text-2xl text-center mb-5">Add topic related:</p>
              <Link href={`/addTopicRelated/${id}`}>
                <button className=" bg-white shadow-md rounded-full hover:bg-gray-100 focus:outline-none m-auto block">
                  <svg
                    className={`w-10 ${textTheme}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 1200"
                  >
                    <path
                      fill="currentColor"
                      d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-95.801 261.841h191.602v242.358h242.358v191.602H695.801v242.358H504.199V695.801H261.841V504.199h242.358V261.841z"
                    />
                  </svg>
                </button>
              </Link>

              <div className="mb- overflow-x-auto whitespace-nowrap scrollbar-hide py-[20px]">
                {Array.isArray(relatedTopics) && relatedTopics.length > 0
                  ? relatedTopics.map((relatedTopic) => {
                      if (relatedTopic.parentTopic === topicId) {
                        return (
                          <div
                            key={relatedTopic._id}
                            className="block bg-white shadow-md rounded-lg my-8 mx-auto w-72 md:inline-block md:mr-5"
                          >
                            <div className="relative h-36 overflow-hidden rounded-t-lg">
                              <Link href={`/topics/${relatedTopic.topicId}`}>
                                <Image
                                  src={relatedTopic.image}
                                  alt={`Related Topic ${relatedTopic._id}`}
                                  layout="fill"
                                  objectFit="cover"
                                  objectPosition="center top"
                                  loading="lazy"
                                />
                              </Link>
                            </div>
                            <div className="mt-2 text-center font-semibold text-gray-700">
                              <div className=" flex p-4 justify-between items-center ">
                                {relatedTopic.title || 'No Title'}{' '}
                                <OptionsBtn
                                  onlyDelete={true}
                                  api={`/api/related?id=${relatedTopic._id}`}
                                  onDataRefresh={handleDataRefresh}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
