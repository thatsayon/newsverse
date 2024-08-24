"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";

import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiNewspaper } from "react-icons/hi2";
import { FaUserLock } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function SH() {
    const pathname = usePathname();
    return (
        <>
            <div className="lg:w-3/5 m-auto lg:border-x-2 border-slate-800">
                <div className="border-b-2 border-slate-800">
                    <h1 className="text-center text-3xl font-semibold py-2">Settings</h1>
                </div>

                <div className="py-6 ">
                    <Link href="/setting/personal-detail">
                        <div className={`
                            flex items-center ml-4 mr-8 py-3 rounded-lg pl-4 text-2xl justify-between 
                            ${pathname === "/setting/personal-detail" ? "bg-zinc-700" : ""}
                            `}>
                            <div className="flex items-center">
                                <IoPerson className="mr-4" />
                                <p>Personal Detail</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className="text-3xl" />
                        </div>
                    </Link>

                    <Link href="/setting/password-security">
                        <div className={`
        flex items-center ml-4 mr-8 py-3 rounded-lg pl-4 text-2xl justify-between
          ${pathname === "/setting/password-security"
                                ? "bg-zinc-700" : ""}
          `
                        }>
                            <div className="flex items-center">
                                <RiLockPasswordFill className="mr-4" />
                                <p>Password & Security</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className="text-3xl" />
                        </div>
                    </Link>

                    <Link href="/setting/feed-settings">
                        <div className={`
        flex items-center ml-4 mr-8 py-3 rounded-lg pl-4 text-2xl justify-between
          ${pathname === "/setting/feed-settings"
                                ? "bg-zinc-700" : ""
                            }
        `}>
                            <div className="flex items-center">
                                <HiNewspaper className="mr-4" />
                                <p>Feed Settings</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className="text-3xl" />
                        </div>
                    </Link>

                    <Link href="/setting/blocking">
                        <div className={`
        flex items-center ml-4 mr-8 py-3 rounded-lg pl-4 text-2xl justify-between
          ${pathname === "/setting/blocking"
                                ? "bg-zinc-700" : ""
                            }
        `}>
                            <div className="flex items-center">
                                <FaUserLock className="mr-4" />
                                <p>Blocking</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className="text-3xl" />
                        </div>
                    </Link>

                    <Link href="/setting/account-deletion">
                        <div className={`
        flex items-center ml-4 mr-8 py-3 rounded-lg pl-4 text-2xl justify-between
        ${pathname === "/setting/account-deletion"
                                ? "bg-zinc-700" : ""}
        `}>
                            <div className="flex items-center">
                                <RiDeleteBin5Fill className="mr-4" />
                                <p>Account Deletion</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className="text-3xl" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}