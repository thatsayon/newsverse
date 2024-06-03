"use client";
import Link from "next/link";
import { permanentRedirect, redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import NewsVerse from "@/../public/news verse.png";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

export default function NavBar() {
  const pathname = usePathname();
  const hideNavBarOnPages = ["/login", "/signup"];
  if (hideNavBarOnPages.includes(pathname)) {
    return null; // Don't render the navbar on specified pages
  }
  const isActive = (path: string) => path == pathname;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("Search");
  const [searchtext, setSearchtext] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userToken = Cookies.get("token");

    if (!userToken) {
      setIsAuthorized(false);
      return;
    }
    setIsAuthorized(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };


  const handleFocus = () => {
    setPlaceholder("Search a post");
  };

  const handleBlur = () => {
    setPlaceholder("Search");
  };

  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchtext(e.target.value);
  }

  const handleSearch = () => {
    // Function to be called when Enter is pressed
    console.log("Search term submitted:", searchtext);
    // Add your search logic here
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <nav className="flex justify-between py-2 bg-[#121213] rounded-b border-b-2 border-slate-800 overflow-hidden">
        <div>
          <Image
            src={NewsVerse}
            alt="news verse"
            width={200}
            height={200}
            className="ml-3"
          />
        </div>
        <div>
          <div className="flex items-center border-2 px-2 border-slate-800 rounded-lg">
            <FaSearch className="mr-2 cursor-pointer" onClick={handleSearch}/>
            <input
              type="text"
              value={searchtext}
              onChange={handleInputchange}
              placeholder={placeholder}
              className="focus:outline-none w-80 h-10"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div>
          {isAuthorized ? (
            <>
              <div
                onClick={handleLogout}
                className="text-main-two font-bold bg-main-one px-4 py-1 rounded mx-2 text-xl cursor-pointer"
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-main-two font-bold bg-main-one px-4 py-1 rounded mx-2 text-xl"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
