import TopicList from '@/components/TopicList';
import Link from 'next/link';

export default function DashBoard() {
  return (
    <div>
      <div className="flex items-center justify-between mt-8 px-6">
        <h1 className="text-4xl ">Dashboard</h1>
        <Link href={'/addTopic'}>
          <button className=" bg-white shadow-md rounded-full hover:bg-gray-100 focus:outline-none">
            <svg className='w-10 text-red-plum' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-95.801 261.841h191.602v242.358h242.358v191.602H695.801v242.358H504.199V695.801H261.841V504.199h242.358V261.841z"/></svg>
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
