'use client';

import Image from 'next/image';

export default function SingleViewImg(props: {
  imgPath: string;
  altText: string;
  description: any;
}) {
  return (
    <div className="">
      <div className=" ">
        <div className="">
          <Image
            className=""
            src={props.imgPath}
            alt={props.altText}
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="">
        <p className="text-white break-words">
          {props.description}
        </p>
      </div>
    </div>
  );
}
