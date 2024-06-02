"use client";
import { FaRegBookmark } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { BiUpvote } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar({ children }: { children: any }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const expand = () => setExpanded(!expanded);
  return (
    <div className="flex pt-16">
      <div className="fixed h-screen">
        {expanded ? (
          <div className="pt-4 h-screen flex flex-col w-16 items-center border-r-2 border-slate-800">
            <div className="text-2xl ">
              <FaArrowRight className="cursor-pointer" onClick={expand} />
            </div>
          </div>
        ) : (
          <div className="w-56 pt-4 h-screen flex flex-col font-semibold shadow-lg border-r-2 ml-8 border-slate-800">
            <div className="text-2xl ml-auto mr-6">
              <FaArrowLeft className="cursor-pointer" onClick={expand} />
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <div>
                <h1 className="text-lg">My feed</h1>
              </div>
              <div>
                <h1 className="text-lg">Discover</h1>
                <ul className="pl-2 flex flex-col gap-1 pt-1">
                  <li className="text-base ml-1">Discussions</li>
                  <li className="flex items-center">
                    <AiOutlineFire />
                    Popular
                  </li>
                  <li className="flex items-center">
                    <BiUpvote className="mr-1" />
                    Most upvoted
                  </li>
                </ul>
              </div>

              <div className="text-lg flex flex-col gap-1">
                <h1 className="">Manage</h1>
                <ul className="flex flex-col gap-1">
                  <Link href="/bookmark">
                    <li className="flex items-center">
                      <FaRegBookmark className="mr-1" />
                      Bookamrks
                    </li>
                  </Link>
                  <li className="flex items-center">
                    <RiHistoryFill className="mr-1" />
                    History
                  </li>
                  <li className="flex items-center">
                    <GoGear className="mr-1" />
                    Customize
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`${expanded ? "ml-16" : "ml-64"} mt-6`}>{children}</div>
    </div>
  );
}
