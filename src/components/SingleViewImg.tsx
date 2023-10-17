"use client"
import { useEffect } from "react";

export default function SingleViewImg(props:{imgPath: string, altText: string}) {

    //   useEffect(() => {
    //     const body : any = document.querySelector('body')
    //     body.style.overflow ='hidden';
    //   }, []);

    return (
        <div>
            <div className="w-full flex justify-center ">
                <div className=" bg-blue-500 h-auto sm:w-4/12">
                    <img className="w-full" src={props.imgPath} alt={props.altText} />
                </div> 
            </div>
            <div className="overflow-y-auto mt-5 my-auto flex justify-center h-[130px] sm:h-20" >
                <p className="text-white text-center w-full sm:w-3/4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis debitis modi dolorum consequuntur vero voluptas adipisci, libero tempore maxime, fuga quod, perspiciatis odio deleniti accusantium quibusdam! Maxime officia molestiae obcaecati? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero expedita inventore, adipisci deserunt amet dolores esse quis sunt officiis, tempora dicta deleniti officia! Veritatis, natus. A amet quis dignissimos facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti beatae dolor quia totam neque voluptates minima dolores sit praesentium aliquam vel corporis nostrum at, earum maxime? Minus porro nostrum amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel est exercitationem ipsa debitis, illo, et odit, repellendus ea non magnam. Doloremque blanditiis incidunt doloribus maiores inventore deleniti dolore suscipit!</p>
            </div>
        </div>
    );
  }
  