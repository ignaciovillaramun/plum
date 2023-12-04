'use client';

import Image from 'next/image';

export default function SingleViewImg(props: {
  imgPath: string;
  altText: string;
  description: any;
}) {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center ">
        <div className="h-auto sm:w-6/12">
          <Image
            className="w-full mt-20"
            src={props.imgPath}
            alt={props.altText}
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="overflow-y-auto mt-5 my-auto flex justify-center h-[160px] sm:h-20">
        <p className="text-white text-center w-full sm:w-3/4">
          {props.description}
        </p>
      </div>
    </div>
  );
}
