import TopicList from '@/components/TopicList';
import Link from 'next/link';

export default function DashBoard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href={'/addTopic'}>
          <button className="p-2 bg-white shadow-md rounded-full hover:bg-gray-100 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="flex ">
        <div className=" flex flex-wrap gap-4 w-8/10 mx-auto">
          <TopicList />
        </div>
      </div>
    </div>
  );
}
