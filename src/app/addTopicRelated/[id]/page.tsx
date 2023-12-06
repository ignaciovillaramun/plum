'use client';
import RelatedTopics from '@/components/RelatedTopics';
import { ThemeContext } from '@/components/ThemeProvider';
import Image from 'next/image';
import { useContext, useEffect, useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';

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

export default function DashBoard() {
  const { theme, setTheme }: any = useContext(ThemeContext);
  const [textTheme, setTextTheme] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = usePathname();
  const id = searchParams?.split('/').pop();

  useEffect(() => {
    const fetchData = async () => {
      await getHeaderImages(id, setHeaderImage);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div>
      <Image
        src={headerImage}
        className="w-full max-h-56 object-cover md:max-h-[320px]"
        width={100}
        height={100}
        alt="course Picture"
      />
      <div className="flex items-center justify-between mt-8 mb-5 px-6 md:px-20">
        <h1 className={`text-4xl ${textTheme}`}>Add Topic Related</h1>
      </div>
      <div className="w-full">
        <div className="flex-col pb-24 md:flex-row md:px-20">
          <Suspense fallback={<p>Loading feed...</p>}>
            <RelatedTopics />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
