'use client';

import Image from 'next/image';

export default function SingleViewImg(props: {
  imgPath: string;
  altText: string;
  description: any;
}) {
  return (
    <div className="md:flex items-center justify-center">
      <div className=" md:w-[500px] md:mr-10 ">
        <div className="">
          <Image
            className="mb-10"
            src={props.imgPath}
            alt={props.altText}
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="md:w-1/2 h-[600px] overflow-x-scroll">
        <p className="text-white break-words md:text-2xl md:leading-10">
          {props.description}
        </p>
      </div>
    </div>
  );
}
