"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  FaRegBookmark,
  FaArrowLeft,
  FaArrowRight,
  FaRegQuestionCircle,
  FaRegUser,
  FaHome,
} from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { BiUpvote } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { MdOutlineFeedback } from "react-icons/md";
import { PiContactlessPaymentBold } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

const getNavLinkClassNames = (
  pathname: string,
  href: string,
  mat: Number = 0
) => {
  return pathname === href
    ? `bg-zinc-700 text-white mt-${mat} py-2 w-full`
    : `hover:bg-zinc-700 hover:text-white mt-${mat} py-2 w-full`;
};

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const pathname = usePathname();
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setUserToken(Cookies.get("token"));
  }, []);

  const hideNavBarOnPages = ["/login", "/signup"];
  const isActive = (path: string) => path === pathname;

  if (hideNavBarOnPages.includes(pathname)) {
    return <div>{children}</div>;
  }

  if (!userToken) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex">
      <div className="fixed h-screen">
        {expanded ? (
          <div className="pt-4 h-screen flex flex-col w-16 items-center border-r-2 border-slate-800">
            <div className="text-2xl">
              <FaArrowRight
                className="cursor-pointer"
                onClick={() => setExpanded(false)}
              />
            </div>

            <Link href="/" className={getNavLinkClassNames(pathname, "/", 6)}>
              <IoHomeOutline className="text-2xl m-auto" />
            </Link>

            <Link
              href="/popular"
              className={getNavLinkClassNames(pathname, "/popular", 6)}
            >
              <AiOutlineFire className="text-2xl m-auto" />
            </Link>
            <Link
              href="/most-upvoted"
              className={getNavLinkClassNames(pathname, "/most-upvoted")}
            >
              <BiUpvote className="text-2xl m-auto" />
            </Link>
            <Link
              href="/bookmark"
              className={getNavLinkClassNames(pathname, "/bookmark", 6)}
            >
              <FaRegBookmark className="text-xl m-auto" />
            </Link>
            <Link
              href="/history"
              className={getNavLinkClassNames(pathname, "/history")}
            >
              <RiHistoryFill className="text-xl m-auto" />
            </Link>

            <Link
              href="/customize"
              className={getNavLinkClassNames(pathname, "/customize")}
            >
              <GoGear className="text-xl m-auto" />
            </Link>
          </div>
        ) : (
          <div className="w-56 text-gray-300 pt-4 h-screen flex flex-col font-semibold shadow-lg border-r-2 border-slate-800">
            <div className="text-2xl ml-auto mr-6">
              <FaArrowLeft
                className="cursor-pointer"
                onClick={() => setExpanded(true)}
              />
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
                <ul className="flex flex-col">
                  <Link
                    href="/popular"
                    className={
                      pathname === "/popular"
                        ? "bg-zinc-700 text-white"
                        : " hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center py-1 pl-6">
                      <AiOutlineFire className="mr-1" />
                      Popular
                    </li>
                  </Link>
                  <Link
                    href="/most-upvoted"
                    className={
                      pathname === "/most-upvoted"
                        ? "bg-zinc-700 text-white"
                        : " hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center py-1 pl-6">
                      <BiUpvote className="mr-1" />
                      Most upvoted
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="mt-6">
                <h1 className="text-lg pl-4">Manage</h1>
                <ul className="flex flex-col pt-1">
                  <Link
                    href="/bookmark"
                    className={
                      isActive("/bookmark")
                        ? " bg-zinc-700 text-white"
                        : " hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center pl-6 py-1">
                      <FaRegBookmark className="mr-1" />
                      Bookmarks
                    </li>
                  </Link>
                  <Link
                    href="/history"
                    className={
                      isActive("/history")
                        ? " bg-zinc-700 text-white"
                        : " hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center pl-6 py-1">
                      <RiHistoryFill className="mr-1" />
                      History
                    </li>
                  </Link>
                  <Link
                    href="/customize"
                    className={
                      isActive("/customize")
                        ? " bg-zinc-700 text-white"
                        : " hover:bg-zinc-700 hover:text-white"
                    }
                  >
                    <li className="flex items-center pl-6 py-1">
                      <GoGear className="mr-1" />
                      Customize
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="mt-6">
                <h1 className="text-lg pl-4">Others</h1>
                <ul className="flex flex-col gap-1 pt-1">
                  <li className="flex items-center pl-6 py-1">
                    <PiContactlessPaymentBold className="mr-1" />
                    Contact Us
                  </li>
                  <li className="flex items-center pl-6 py-1">
                    <FaRegQuestionCircle className="mr-1" />
                    About Us
                  </li>
                  <li className="flex items-center pl-6 py-1">
                    <MdOutlineFeedback className="mr-1" />
                    Feedback
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${expanded ? "ml-16" : "ml-56"} mt-4`}>{children}</div>
    </div>
  );
}
