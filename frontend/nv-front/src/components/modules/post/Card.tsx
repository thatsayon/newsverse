import Image from "next/image";
import NV from "@/app/favicon.ico";
import { FaShareSquare } from "react-icons/fa";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { CiRead, CiUnread } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";

export default function Card(post_data: any) {
  // console.log(post_data.post_data)
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);

  const [upVoteVal, setupVoteVal] = useState<string>("");
  const [userUpvoted, setuserUpvoted] = useState<boolean>(false);

  const [downVoteVal, setdownVoteVal] = useState<string>("");
  const [userDownvoted, setuserDownvoted] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }

    setupVoteVal(post_data.post_data.upvote_count);
    setuserUpvoted(post_data.post_data.user_upvoted);

    setdownVoteVal(post_data.post_data.downvote_count);
    setuserDownvoted(post_data.post_data.user_downvoted);

    setBookmarked(post_data.post_data.user_bookmarked);
  }, []);

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleUpvote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
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
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setupVoteVal(data.upvote_count);
      setuserUpvoted(data.user_upvoted);

      if(data.remove_downvote){
        setuserDownvoted(false);
        setdownVoteVal(Number(downVoteVal)>0?String(Number(downVoteVal)-1):downVoteVal)
      }
    } catch (error) {
      console.error("Error upvoting the post:", error);
    }
  };

  const handleDownvote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
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
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setdownVoteVal(data.downvote_count);
      setuserDownvoted(data.user_downvoted);

      if(data.remove_upvote){
        setuserUpvoted(false);
        setupVoteVal(Number(upVoteVal)>0?String(Number(upVoteVal)-1):upVoteVal);
      }
    } catch (error) {
      console.error("Error upvoting the post:", error);
    }
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
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
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if(data.bookmarked){
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    } catch (error) {
      console.error("Error bookmark the post: ", error);
    }
  };

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
            <div className={`flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center ${userUpvoted?"text-green-400":""} hover:text-green-400`} onClick={handleUpvote}>
              <LuArrowBigUp className="mr-1 text-2xl" />
              <p className="font-bold">{upVoteVal}</p>
            </div>
            <div className={`flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center ${userDownvoted?"text-red-400":""} hover:text-red-400`} onClick={handleDownvote}>
              <LuArrowBigDown className="mr-1 text-2xl" />
              <p className="font-bold">{downVoteVal}</p>
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
            <div
              className={`flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center ${
                userUpvoted ? "text-green-400" : ""
              } hover:text-green-400`}
              onClick={handleUpvote}
            >
              <LuArrowBigUp className="mr-1 text-2xl" />
              <p className="font-bold">{upVoteVal}</p>
            </div>
            <div
              className={`flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center ${userDownvoted ? "text-red-400" : ""} hover:text-red-400`}
              onClick={handleDownvote}
            >
              <LuArrowBigDown className="mr-1 text-2xl" />
              <p className="font-bold">{downVoteVal}</p>
            </div>
            <div
              className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one"
              onClick={flipCard}
            >
              <CiRead className="text-xl" />
            </div>
            <div className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one" onClick={handleBookmark}>
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
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
