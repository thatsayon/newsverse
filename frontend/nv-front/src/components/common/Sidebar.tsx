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
  FaSearch,
  FaHome,
  FaFire
} from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { BiUpvote } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { IoHomeOutline, IoNotifications } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { PiContactlessPaymentBold } from "react-icons/pi";

import Customize from "../modules/customize/CustomMain";

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
  const [customizeModelOpen, setCustomizeModelOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setUserToken(Cookies.get("token"));
  }, []);

  const hideNavBarOnPages = ["/login", "/signup"];
  const isActive = (path: string) => path === pathname;
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCustomizeModelClose = () => {
    setCustomizeModelOpen(false);
  };

  const handleCustomizeModelOpen = () => {
    setCustomizeModelOpen(true);
    handleCloseMenu();
  };

  if (hideNavBarOnPages.includes(pathname)) {
    return <div>{children}</div>;
  }

  if (!userToken) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`absolute lg:fixed h-screen z-50 ${expanded ? "w-56" : "w-16"} hidden lg:block`}>
        {/* Desktop View */}
        <div className="">
          {expanded ? (
            <div className="pt-4 h-screen flex flex-col w-56 text-gray-300 font-semibold shadow-lg border-r-2 border-slate-800">
              <div className="text-2xl ml-auto mr-6">
                <FaArrowLeft
                  className="cursor-pointer"
                  onClick={() => setExpanded(false)}
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
                    <div
                      onClick={handleCustomizeModelOpen}
                      className={
                        customizeModelOpen
                          ? "bg-zinc-700 text-white cursor-pointer"
                          : "hover:bg-zinc-700 hover:text-white cursor-pointer"
                      }
                    >
                      <li className="flex items-center pl-6 py-1">
                        <GoGear className="mr-1" />
                        Customize
                      </li>
                    </div>
                  </ul>
                </div>
                <div className="mt-6">
                  <h1 className="text-lg pl-4">Others</h1>
                  <ul className="flex flex-col pt-1">
                    <Link
                      href="/contact-us"
                      className={
                        isActive("/contact-us")
                          ? " bg-zinc-700 text-white"
                          : " hover:bg-zinc-700 hover:text-white"
                      }
                    >
                      <li className="flex items-center pl-6 py-1">
                        <PiContactlessPaymentBold className="mr-1" />
                        Contact Us
                      </li>
                    </Link>
                    <Link
                      href="/about"
                      className={
                        isActive("/about")
                          ? " bg-zinc-700 text-white"
                          : " hover:bg-zinc-700 hover:text-white"
                      }
                    >
                      <li className="flex items-center pl-6 py-1">
                        <FaRegQuestionCircle className="mr-1" />
                        About Us
                      </li>
                    </Link>
                    <Link
                      href="/feedback"
                      className={
                        isActive("/feedback")
                          ? " bg-zinc-700 text-white"
                          : " hover:bg-zinc-700 hover:text-white"
                      }
                    >
                      <li className="flex items-center pl-6 py-1">
                        <MdOutlineFeedback className="mr-1" />
                        Feedback
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-4 h-screen flex flex-col w-16 items-center border-r-2 border-slate-800">
              <div className="text-2xl">
                <FaArrowRight
                  className="cursor-pointer"
                  onClick={() => setExpanded(true)}
                />
              </div>

              <Link
                href="/"
                className={getNavLinkClassNames(pathname, "/", 6)}
              >
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

              <div
                onClick={handleCustomizeModelOpen}
                className={
                  customizeModelOpen
                    ? "bg-zinc-700 text-white mt-0 py-2 w-full cursor-pointer"
                    : "hover:bg-zinc-700 hover:text-white mt-0 py-2 w-full cursor-pointer"
                }
              >
                <GoGear className="text-xl m-auto" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile/Tablet View */}
        <div className="md:hidden w-16 h-screen flex flex-col items-center border-r-2 border-slate-800">
          <Link href="/" className={getNavLinkClassNames(pathname, "/", 6)}>
            <div className="flex flex-col items-center">
              <IoHomeOutline className="text-2xl" />
              <span className="text-xs">Home</span>
            </div>
          </Link>

          <Link
            href="/popular"
            className={getNavLinkClassNames(pathname, "/popular", 6)}
          >
            <div className="flex flex-col items-center">
              <AiOutlineFire className="text-2xl" />
              <span className="text-xs">Popular</span>
            </div>
          </Link>

          <Link
            href="/most-upvoted"
            className={getNavLinkClassNames(pathname, "/most-upvoted", 6)}
          >
            <div className="flex flex-col items-center">
              <BiUpvote className="text-2xl" />
              <span className="text-xs">Upvoted</span>
            </div>
          </Link>

          <Link
            href="/bookmark"
            className={getNavLinkClassNames(pathname, "/bookmark", 6)}
          >
            <div className="flex flex-col items-center">
              <FaRegBookmark className="text-xl" />
              <span className="text-xs">Bookmarks</span>
            </div>
          </Link>

          <Link
            href="/history"
            className={getNavLinkClassNames(pathname, "/history", 6)}
          >
            <div className="flex flex-col items-center">
              <RiHistoryFill className="text-xl" />
              <span className="text-xs">History</span>
            </div>
          </Link>

          <div
            onClick={handleCustomizeModelOpen}
            className={
              customizeModelOpen
                ? "bg-zinc-700 text-white mt-0 py-2 w-full cursor-pointer"
                : "hover:bg-zinc-700 hover:text-white mt-0 py-2 w-full cursor-pointer"
            }
          >
            <div className="flex flex-col items-center">
              <GoGear className="text-xl" />
              <span className="text-xs">Customize</span>
            </div>
          </div>
        </div>

        {customizeModelOpen && <Customize onClose={handleCustomizeModelClose} />}
      </div>

      <div className="block lg:hidden fixed bottom-0 bg-nav-dark w-full px-2 py-4 border-t-2 border-slate-800">
        <div>
          <ul className="flex justify-around text-2xl">
            <Link href="/"><li><FaHome className={pathname === "/" ? "text-main-one" : ""} /></li></Link>
            <Link href="/popular"><li><FaFire className={pathname === "/popular" ? "text-main-one" : ""} /></li></Link>
            <li><FaSearch /></li>
            <li><IoNotifications /></li>
          </ul>
        </div>
      </div>
      {/* Main Content Area */}
      <div className={`w-full ml-0 ${expanded ? "lg:ml-56" : "lg:ml-16"}`}>
        {children}
      </div>
    </div>
  );
}
