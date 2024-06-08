"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import NewsVerse from "@/../public/news verse.png";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";

export default function NavBar(token: any) {
  const pathname = usePathname();
  const hideNavBarOnPages = ["/login", "/signup"];

  const [searchtext, setSearchtext] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Search");

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
  };

  const handleSearch = () => {
    console.log("Search term submitted:", searchtext);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (hideNavBarOnPages.includes(pathname)) {
    return null;
  }
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
          {!!token.token ? (
            <>
              <div>
                <div className="flex items-center border-2 px-2 border-slate-800 rounded-lg">
                  <FaSearch
                    className="mr-2 cursor-pointer"
                    onClick={handleSearch}
                  />
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
              <div
                onClick={handleLogout}
                className="text-main-two font-bold bg-main-one px-4 py-1 rounded mx-2 text-xl cursor-pointer"
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="">
                <div className="text-main-two font-bold bg-main-one px-4 py-1 rounded mx-2 text-xl">
                  Login
                </div>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
