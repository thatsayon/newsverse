import Image from "next/image";
import NV from "@/app/favicon.ico";
import { FaShareSquare } from "react-icons/fa";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { CiRead, CiUnread } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";

export default function Card(post_data: any) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, []);

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <>
      {isFlipped ? (
        <div
          style={{ height: `${cardHeight}px` }}
          className="border-slate-800 border shadow-lg px-3 py-2 rounded-md overflow-y-scroll scrollable-content"
          onClick={flipCard}
        >
          <h1 className="text-center text-xl">{post_data.post_data.title}</h1>
          <hr className="mt-1 mb-2" />
          <p className="text-justify">{post_data.post_data.content}</p>
          <p className="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            iure similique repellat, iusto placeat laborum ad modi cupiditate
            corporis laboriosam totam hic ab cumque temporibus perspiciatis
            molestias ex odio velit. Veniam eos modi odit, amet quisquam
            necessitatibus, earum quo non sint nisi exercitationem hic
            consequatur ullam et sapiente, nesciunt esse temporibus. Quibusdam
            quisquam molestiae magni atque provident explicabo eos itaque
            deleniti asperiores aspernatur minus vero perferendis mollitia ea
            distinctio totam aliquid nisi, natus saepe sint eligendi. Harum
            illum, animi repellendus quaerat sunt culpa odio molestiae nesciunt
            suscipit voluptas deserunt, molestias numquam, voluptates deleniti.
            Cumque excepturi itaque corporis iste amet quisquam?
          </p>

          <div className="flex mt-2">
            <div className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center hover:text-green-400">
              <LuArrowBigUp className="mr-1 text-2xl" />
              <p className="font-bold">6</p>
            </div>
            <div className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center hover:text-red-400">
              <LuArrowBigDown className="mr-1 text-2xl" />
              <p className="font-bold">2</p>
            </div>
            <div
              className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one"
              onClick={flipCard}
            >
              <CiUnread className="text-xl" />
            </div>
            <div className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one">
              <FaRegBookmark />
            </div>
            <div className="flex cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one">
              <IoIosLink className="text-xl" />
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={cardRef}
          className="w-full border-slate-800 border shadow-lg px-3 py-2 rounded-md overflow-hidden"
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center" onClick={flipCard}>
              <div className="mr-2">
                <Image src={NV} alt="author icon" width={40} height={40} />
              </div>

              <div>
                <p className="text-xl">Real Python</p>
                <p className="text-sm">May 1, 2024</p>
              </div>
            </div>
            <FaShareSquare className="text-xl cursor-pointer" />
          </div>

          <div className="mb-1 flex h-1/6" onClick={flipCard}>
            <p className="text-xl">{post_data.post_data.title}</p>
          </div>

          <div className="flex mb-2 text-xs" onClick={flipCard}>
            {post_data.post_data.topics.slice(0, 4).map((data: string) => {
              return (
                <p className="px-2 py-1 mr-2 bg-nav-dark rounded-md">{data}</p>
              );
            })}
          </div>

          <div className="flex">
            <a href="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221113234125/Best-Python-IDE-For-Linux-in-2023.jpg">
              <img
                src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221113234125/Best-Python-IDE-For-Linux-in-2023.jpg"
                alt="hi"
                className="rounded"
              />
            </a>
          </div>

          <div className="flex mt-2">
            <div className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center hover:text-green-400">
              <LuArrowBigUp className="mr-1 text-2xl" />
              <p className="font-bold">6</p>
            </div>
            <div className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center hover:text-red-400">
              <LuArrowBigDown className="mr-1 text-2xl" />
              <p className="font-bold">2</p>
            </div>
            <div
              className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one"
              onClick={flipCard}
            >
              <CiRead className="text-xl" />
            </div>
            <div className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one">
              <FaRegBookmark />
            </div>
            <div className="flex cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one">
              <IoIosLink className="text-xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
