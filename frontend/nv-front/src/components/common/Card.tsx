import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { FaShareSquare, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { CiUnread, CiRead } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosLink } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoOpen } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiSolidHide } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";
import NV from "@/../public/news verse.png";
import { Toaster, toast } from "react-hot-toast";
import { Menu, MenuItem } from "@mui/material";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  XIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { format } from "util";
import "./CardStyle.css";
import {
  Oswald,
  Roboto,
  Roboto_Slab,
  Poppins,
  Merienda,
} from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const roboto_slab = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const merienda = Merienda({
  weight: "500",
  subsets: ["latin"],
});

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
});
export default function Card(post_data: any) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [blind, setBlind] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [upVoteVal, setupVoteVal] = useState<number>(0);
  const [userUpvoted, setuserUpvoted] = useState<boolean>(false);
  const [downVoteVal, setdownVoteVal] = useState<number>(0);
  const [userDownvoted, setuserDownvoted] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shareModelOpen, setShareModelOpen] = useState<boolean>(false);

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
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShareModelOpen = () => {
    setShareModelOpen(true);
    handleCloseMenu();
  };

  const handleShareMoelClose = () => {
    setShareModelOpen(false);
  };

  const formatCardDate = (dateString: string): string => {
    const inputDate = new Date(dateString);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDate.toDateString() === today.toDateString()) {
      return "today";
    }

    if (inputDate.toDateString() === yesterday.toDateString()) {
      return "yesterday";
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      inputDate
    );

    return formattedDate;
  };

  return (
    <>
      <div
        key={data.id}
        ref={cardRef}
        className="flex flex-col w-full border-slate-800 hover:border-slate-600 border shadow-lg px-3 py-2 rounded-md overflow-hidden"
      >
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center" onClick={flipCard}>
            <div className="mr-2">
              <Image src={NV} alt="author icon" width={35} height={35} />
            </div>
            <div>
              <p className="text-lg" style={roboto_slab.style}>
                {data.creator}
              </p>
              <p className="text-sm" style={poppins.style}>
                {formatCardDate(data.creator_created_at)}
              </p>
            </div>
          </div>

          {/* <p className="text-sm mr-2 text-black">Read Post</p> */}

          <div className="flex items-center">
            <div
              className="relative inline-block cursor-pointer group hover:text-main-one hover:bg-nav-dark p-2 hover:rounded-lg"
              onClick={() => {
                window.open(data.post_url, "_blank", "noopener, noreferrer");
              }}
            >
              {/* Icon */}
              <FaExternalLinkAlt className="text-lg" />

              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 font-semibold bg-nav-dark text-white text-center text-xs rounded-lg py-1 px-2 invisible opacity-0 transition-opacity duration-300 ease-in-out group-hover:visible group-hover:opacity-100">
                Read Post
              </div>
            </div>
            <div
              className=" cursor-pointer hover:bg-nav-dark p-1 hover:rounded-lg ml-1"
              onClick={handleClick}
            >
              <HiDotsVertical className="text-xl" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                ".MuiPaper-root": {
                  backgroundColor: "#333",
                  color: "white",
                  minWidth: "200px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  marginTop: ".3rem",
                },
              }}
            >
              <MenuItem
                onClick={handleCloseMenu}
                sx={{ ":hover": { backgroundColor: "#444" } }}
              >
                <div className="flex items-center">
                  <FaPlus className="text-xl mr-4" />
                  <p className="font-semibold">Show more</p>
                </div>
              </MenuItem>
              <MenuItem
                onClick={handleCloseMenu}
                sx={{ ":hover": { backgroundColor: "#444" } }}
              >
                <div className="flex items-center">
                  <FaMinus className="text-xl mr-4" />
                  <p className="font-semibold">Show less</p>
                </div>
              </MenuItem>
              <MenuItem
                onClick={handleShareModelOpen}
                sx={{ ":hover": { backgroundColor: "#444" } }}
              >
                <div className="flex items-center">
                  {" "}
                  <FaShare className="text-xl mr-4" />
                  <p className="font-semibold">Share Via</p>
                </div>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open(data.post_url, "_blank", "noopener, noreferrer");
                  handleCloseMenu();
                }}
                sx={{ ":hover": { backgroundColor: "#444" } }}
              >
                <div className="flex items-center">
                  <FaExternalLinkAlt className="text-lg mr-4" />
                  <p className="font-semibold">Read post</p>
                </div>
              </MenuItem>

              <MenuItem
                onClick={handleCloseMenu}
                sx={{ ":hover": { backgroundColor: "#444" } }}
              >
                <div className="flex items-center">
                  <BiSolidHide className="text-xl mr-4" />
                  <p className="font-semibold">Hide</p>
                </div>
              </MenuItem>
              <MenuItem
                onClick={handleCloseMenu}
                sx={{ ":hover": { backgroundColor: "#444" } }}
              >
                <div className="flex items-center">
                  <MdOutlineReport className="text-xl mr-4" />
                  <p className="font-semibold">Report</p>
                </div>
              </MenuItem>
            </Menu>
            {shareModelOpen && (
              <div
                className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.75)] overflow-auto font-[sans-serif]"
                onClick={handleShareMoelClose}
              >
                <div
                  className="w-full max-w-md bg-[#1e1e1e] shadow-lg rounded-lg p-8 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center pb-3 border-b border-gray-600">
                    <h3 className="text-xl font-bold flex-1 text-gray-100">
                      Share Post
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-main-one"
                      viewBox="0 0 320.591 320.591"
                      onClick={handleShareMoelClose}
                    >
                      <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                      <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                    </svg>
                  </div>

                  <div className="my-8">
                    <h6 className="text-base text-gray-300">
                      Share this post via
                    </h6>

                    <div className="flex flex-wrap gap-4 mt-4">
                      <EmailShareButton
                        url={"https://facebook.com/" + data.slug}
                      >
                        <EmailIcon size={40} round={true} />
                      </EmailShareButton>

                      <FacebookShareButton
                        url={"https://facebook.com/" + data.slug}
                      >
                        <FacebookIcon size={40} round={true} />
                      </FacebookShareButton>

                      <FacebookMessengerShareButton
                        appId=""
                        url={"https://youtube.com/" + data.slug}
                      >
                        <FacebookMessengerIcon size={40} round={true} />
                      </FacebookMessengerShareButton>

                      <LinkedinShareButton
                        url={"https://facebook.com/" + data.slug}
                        title={data.title}
                        summary={data.content}
                      >
                        <LinkedinIcon size={40} round={true} />
                      </LinkedinShareButton>

                      <TwitterShareButton
                        url={"https://facebook.com/" + data.slug}
                      >
                        <XIcon size={40} round={true} />
                      </TwitterShareButton>

                      <WhatsappShareButton
                        url={"https://facebook.com/" + data.slug}
                      >
                        <WhatsappIcon size={40} round={true} />
                      </WhatsappShareButton>

                      <RedditShareButton
                        url={"https://facebook.com/" + data.slug}
                      >
                        <RedditIcon size={40} round={true} />
                      </RedditShareButton>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-base text-gray-300">Or copy link</h6>
                    <div className="w-full rounded-lg overflow-hidden border border-gray-600 flex items-center mt-4">
                      <p
                        className="text-sm text-gray-500 flex-1 ml-4"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxHeight: "3em",
                          lineHeight: "1.5em", 
                          wordBreak: "break-word",
                        }}
                      >
                        {`${process.env.NEXT_PUBLIC_BASE_URL}/${data.slug}`}
                      </p>
                      <button
                        className="bg-main-one hover:bg-main-one-deep px-6 py-3 text-sm text-black font-semibold"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/${data.slug}`
                          );
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-1 flex h-1/6" onClick={flipCard}>
          <p className="text-xl" style={roboto.style}>
            {data.title}
          </p>
        </div>
        {blind === data.id ? (
          <div
            className="overflow-y-scroll h-[220px] mt-2 border-t-2 py-2 text-balance hide-scrollbar"
            style={roboto.style}
          >
            {data.content}

            <div className="flex mt-2 justify-center">
              <button
                className="bg-white text-black rounded-lg px-2 font-semibold py-1"
                onClick={() => {
                  window.open(data.post_url, "_blank", "noopener, noreferrer");
                }}
              >
                Read full article
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex mb-2 mt-2 text-xs space-x-2 overflow-hidden"
              onClick={flipCard}
            >
              {data.topics.slice(0, 4).map((topic: string, index: number) => (
                <p
                  key={index}
                  className="px-2 py-1 bg-nav-dark rounded-md overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ maxWidth: "80px", ...roboto.style }} 
                >
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
        <div className="flex items-center mt-auto mb-[2px]">
          <div
            className={`flex items-center justify-center mr-2 gap-1 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg ${
              userUpvoted ? "text-green-400" : ""
            } hover:text-green-400`}
            onClick={handleUpvote}
          >
            <LuArrowBigUp className="text-2xl" />
            <p className="font-bold" style={merienda.style}>
              {upVoteVal}
            </p>
          </div>
          <div
            className={`flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark rounded-lg justify-center items-center ${
              userDownvoted ? "text-red-400" : ""
            } hover:text-red-400`}
            onClick={handleDownvote}
          >
            <LuArrowBigDown className="mr-1 text-2xl" />
            <p className="font-bold" style={merienda.style}>
              {downVoteVal}
            </p>
          </div>
          <div
            className="flex mr-2 cursor-pointer px-2 py-1 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one"
            onClick={() => setBlind(data.id === blind ? null : data.id)}
          >
            {data.id === blind ? (
              <CiUnread className="text-2xl" />
            ) : (
              <CiRead className="text-2xl" />
            )}
          </div>
          <div
            className="flex mr-2 cursor-pointer px-2 py-1.5 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one"
            onClick={handleBookmark}
          >
            {bookmarked ? (
              <FaBookmark className="text-xl" />
            ) : (
              <FaRegBookmark className="text-xl" />
            )}
            <Toaster />
          </div>
          <div className="flex cursor-pointer px-2 py-1.5 bg-nav-dark items-center justify-center rounded-lg hover:text-main-one">
            <IoIosLink className="text-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
