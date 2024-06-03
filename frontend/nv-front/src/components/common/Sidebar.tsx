"use client";
import { FaRegBookmark } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { BiUpvote } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { PiContactlessPaymentBold } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Sidebar({ children }: { children: any }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const expand = () => setExpanded(!expanded);
  const pathname = usePathname();
  const isActive = (path: string) => path == pathname;

  const hideNavBarOnPages = ["/login", "/signup"];
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    setUserToken(Cookies.get("token"));
  }, []);

  if (hideNavBarOnPages.includes(pathname)) {
    return <div>{children}</div>;
  }

  

  if (!userToken) {
    return <div>{children}</div>;
  }
  return (
    <div className="flex pt-16">
      <div className="fixed h-screen">
        {expanded ? (
          <div className="pt-4 h-screen flex flex-col w-16 items-center border-r-2 border-slate-800">
            <div className="text-2xl ">
              <FaArrowRight className="cursor-pointer" onClick={expand} />
            </div>
            <IoHomeOutline className="text-2xl mt-6" />

            <AiOutlineFire className="text-2xl mt-14" />
            <BiUpvote className="text-2xl mt-3" />

            <FaRegBookmark className="mt-14 text-xl" />
            <RiHistoryFill className="mt-3 text-xl" />
            <GoGear className="mt-3 text-xl" />
          </div>
        ) : (
          <div className="w-56 text-gray-300 pt-4 h-screen flex flex-col font-semibold shadow-lg border-r-2 border-slate-800">
            <div className="text-2xl ml-auto mr-6">
              <FaArrowLeft className="cursor-pointer" onClick={expand} />
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/"
                className={isActive("/") ? "bg-zinc-700 text-white" : ""}
              >
                <div className="flex items-center cursor-pointer pl-4 py-1 hover:bg-zinc-700 hover:text-white">
                  <IoHomeOutline className="text-lg mr-2" />
                  <h1 className="text-lg">My feed</h1>
                </div>
              </Link>
              <div className="mt-6">
                <h1 className="text-lg pl-4">Discover</h1>
                <ul className="pl-2 flex flex-col gap-1">
                  <Link
                    href="/popular"
                    className="pl-4 py-0.5 hover:bg-zinc-700 hover:text-white"
                  >
                    <li className="flex items-center">
                      <AiOutlineFire className="mr-1" />
                      Popular
                    </li>
                  </Link>
                  <Link
                    href="/most-upvoted"
                    className="pl-4 py-0.5 hover:bg-zinc-700 hover:text-white"
                  >
                    <li className="flex items-center">
                      <BiUpvote className="mr-1" />
                      Most upvoted
                    </li>
                  </Link>
                </ul>
              </div>

              <div className="mt-6">
                <h1 className="text-lg pl-4">Manage</h1>
                <ul className="flex flex-col gap-1 pt-1">
                  <Link
                    href="/bookmark"
                    className={
                      isActive("/bookmark")
                        ? "pl-6 py-0.5 bg-zinc-700 text-white"
                        : "pl-6 py-0.5 hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center">
                      <FaRegBookmark className="mr-1" />
                      Bookamrks
                    </li>
                  </Link>
                  <Link
                    href="/history"
                    className={
                      isActive("/history")
                        ? "pl-6 py-0.5 bg-zinc-700 text-white"
                        : "pl-6 py-0.5 hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center">
                      <RiHistoryFill className="mr-1" />
                      History
                    </li>
                  </Link>
                  <Link
                    href="/customize"
                    className={
                      isActive("/customize")
                        ? "pl-6 py-0.5 bg-zinc-700 text-white"
                        : "pl-6 py-0.5 hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center">
                      <GoGear className="mr-1" />
                      Customize
                    </li>
                  </Link>
                </ul>
              </div>

              <div className="mt-6">
                <h1 className="text-lg">Others</h1>
                <ul className="pl-2 flex flex-col gap-1 pt-1">
                  <li className="flex items-center">
                    <PiContactlessPaymentBold className="mr-1" />
                    Contact Us
                  </li>
                  <li className="flex items-center">
                    <FaRegQuestionCircle className="mr-1" />
                    About Us
                  </li>
                  <li className="flex items-center">
                    <MdOutlineFeedback className="mr-1" />
                    Feedback
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`${expanded ? "ml-16" : "ml-56"} mt-6`}>{children}</div>
    </div>
  );
}
