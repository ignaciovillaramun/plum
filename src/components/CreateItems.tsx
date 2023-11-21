import React, { useState, useContext, useEffect } from 'react';
import Alert from './Alert'; // Assuming you have an Alert component
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/components/ThemeProvider';

interface CreateItemsProps {
  name: string;
  showAlert: boolean;
  title: string;
  description?: string;
  setTitle: (title: string) => void;
  setDescription?: (description: string) => void;
  image?: File | null;
  handleSubmit: (e: React.FormEvent) => void;
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseAlert: () => void;
}

function CreateItems({
  name,
  showAlert,
  title,
  description,
  setTitle,
  setDescription,
  image,
  handleSubmit,
  handleImageUpload,
  handleCloseAlert,
}: CreateItemsProps) {
  const [borderTheme, setBordeTtheme] = useState('');
  const [textTheme, setTextTheme] = useState('');
  const { theme, setTheme }: any = useContext(ThemeContext);

  const searchParams = usePathname();
  const params = searchParams.split('/');
  const home = params[1];
  const page = params[params.length - 2];
  const isTopicImage =
    page === 'addTopicImage' || home === 'addTopic' ? true : false;
  const showDescription =
    page === 'addTopicImage' || 'addTopicNotes' ? true : false;
  const pdfFormat = isTopicImage ? 'image/*' : 'application/*';
  const isTopicNotes = page === 'addTopicNotes' ? true : false;

  useEffect(() => {
    if (theme === 'bg-red-plum') {
      setTextTheme('text-red-plum');
      setBordeTtheme('border-red-plum');
    } else if (theme === 'bg-theme-color1') {
      setTextTheme('text-theme-color1');
      setBordeTtheme('border-theme-color1');
    } else if (theme === 'bg-theme-color2') {
      setTextTheme('text-theme-color2');
      setBordeTtheme('border-theme-color2');
    } else if (theme === 'bg-theme-color3') {
      setTextTheme('text-theme-color3');
      setBordeTtheme('border-theme-color3');
    }
  }, [theme]);

  return (
    <div className="mt-10 p-8 pb-40 md:w-2/4 md:block md:mx-auto">
      {showAlert &&
        (isTopicImage ? (
          <Alert
            title="Error"
            topic="Title, description and Image cannot be empty"
            onClose={handleCloseAlert}
          />
        ) : (
          <Alert
            title="Error"
            topic="Title and Image cannot be empty"
            onClose={handleCloseAlert}
          />
        ))}
      <Image
        src="/createTopic/letter.png"
        alt="Selected"
        width={100}
        height={100}
        className="block mx-auto"
      />
      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            <h3 className="text-xl font-medium">{name} Title</h3>
          </label>
          <input
            className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {showDescription && ( // Conditionally render the "Description" input based on isTopicImage
          <div className="mb-4">
            <label
              className="text-xl block text-gray-700 font-bold mb-2 mt-5"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:h-40"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription && setDescription(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            {/* <input
            className="rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          /> */}
          </label>
          {!isTopicNotes && (
            <div className="flex items-center justify-center bg-grey-lighter mt-10">
              <label
                htmlFor="image"
                className="w-full flex flex-col items-center px-4 py-3 bg-theme-color text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-white hover:text-theme-color"
              >
                <svg
                  className={`w-8 h-8 ${textTheme}`}
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className={`mt-2 text-base leading-normal ${textTheme} `}>
                  Select a file
                </span>
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  accept={pdfFormat}
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}
        </div>
        <div className="mb-4">
          {image && isTopicImage && (
            <div>
              <p className="text-xl mt-8">Selected {name}:</p>
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                width={100}
                height={120}
                className="mt-2"
              />
            </div>
          )}
          {image && !isTopicImage && (
            <div>
              <p className="text-xl mt-8">Selected {name}:</p>
              <Image
                src="/file.png"
                alt="Selected"
                width={100}
                height={120}
                className="mt-2"
              />
            </div>
          )}
        </div>
        <div className="mt-12">
          <button
            className={`${borderTheme} ${textTheme} block mx-auto border-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
          >
            Create {name}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateItems;
