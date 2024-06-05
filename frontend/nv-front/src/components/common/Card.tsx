import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { FaShareSquare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { LuArrowBigUp, LuArrowBigDown } from 'react-icons/lu';
import { CiUnread, CiRead } from 'react-icons/ci';
import { IoIosLink } from 'react-icons/io';
import NV from '@/../public/news verse.png';
import { Toaster, toast } from 'react-hot-toast';

export default function Card(post_data: any) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [blind, setBlind] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [upVoteVal, setupVoteVal] = useState<number>(0);
  const [userUpvoted, setuserUpvoted] = useState<boolean>(false);
  const [downVoteVal, setdownVoteVal] = useState<number>(0);
  const [userDownvoted, setuserDownvoted] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    setupVoteVal(post_data.post_data.upvote_count);
    setuserUpvoted(post_data.post_data.user_upvoted);
    setdownVoteVal(post_data.post_data.downvote_count);
    setuserDownvoted(post_data.post_data.user_downvoted);
    setBookmarked(post_data.post_data.user_bookmarked);
  }, [post_data]);

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleUpvote = async () => {
    const userToken = Cookies.get("token");
    if (!userToken) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/post/upvote/${post_data.post_data.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setupVoteVal(data.upvote_count);
      setuserUpvoted(data.user_upvoted);

      if (data.remove_downvote) {
        setuserDownvoted(false);
        setdownVoteVal((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Error upvoting the post:", error);
    }
  };

  const handleDownvote = async () => {
    const userToken = Cookies.get("token");
    if (!userToken) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/post/downvote/${post_data.post_data.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setdownVoteVal(data.downvote_count);
      setuserDownvoted(data.user_downvoted);

      if (data.remove_upvote) {
        setuserUpvoted(false);
        setupVoteVal((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Error downvoting the post:", error);
    }
  };

  const handleBookmark = async () => {
    const userToken = Cookies.get("token");
    if (!userToken) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/profile/bookmark/${post_data.post_data.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.bookmarked) {
        toast("Post was added to your bookmark");
        setBookmarked(true);
      } else {
        toast("Post was removed from your bookmark");
        setBookmarked(false);
      }
    } catch (error) {
      console.error("Error bookmarking the post: ", error);
    }
  };

  const data = post_data.post_data;

  return (
    <>
      <div
        key={data.id}
        ref={cardRef}
        className="flex flex-col w-full border-slate-800 border shadow-lg px-3 py-2 rounded-md overflow-hidden"
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
          <p className="text-xl">{data.title}</p>
        </div>
        {blind === data.id ? (
          <div className="overflow-y-scroll h-[220px]">{data.content}</div>
        ) : (
          <>
            <div className="flex mb-2 mt-2 text-xs" onClick={flipCard}>
              {data.topics.slice(0, 4).map((topic: string, index: number) => (
                <p key={index} className="px-2 py-1 mr-2 bg-nav-dark rounded-md">
                  {topic}
                </p>
              ))}
            </div>
            <div className="flex min-h-56 justify-center max-h-60">
              <a href="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221113234125/Best-Python-IDE-For-Linux-in-2023.jpg">
                <img
                  src={
                    data.thumbnail ||
                    data.thumbnail_url ||
                    "https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png"
                  }
                  alt="hi"
                  className="rounded h-[215px] w-full"
                />
              </a>
            </div>
          </>
        )}
        <div className="flex mt-auto mb-[2px]">
          <div
            className={`flex mr-2 gap-1 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center ${
              userUpvoted ? "text-green-400" : ""
            } hover:text-green-400`}
            onClick={handleUpvote}
          >
            <LuArrowBigUp className="text-2xl" />
            <p className="font-bold">{upVoteVal}</p>
          </div>
          <div
            className={`flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center ${
              userDownvoted ? "text-red-400" : ""
            } hover:text-red-400`}
            onClick={handleDownvote}
          >
            <LuArrowBigDown className="mr-1 text-2xl" />
            <p className="font-bold">{downVoteVal}</p>
          </div>
          <div
            className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one"
            onClick={() => setBlind(data.id === blind ? null : data.id)}
          >
            {data.id === blind ? (
              <CiUnread className="text-xl" />
            ) : (
              <CiRead className="text-xl" />
            )}
          </div>
          <div
            className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one"
            onClick={handleBookmark}
          >
            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
            <Toaster />
          </div>
          <div className="flex cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one">
            <IoIosLink className="text-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
