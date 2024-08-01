"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";

// icons 
import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiNewspaper } from "react-icons/hi2";
import { FaUserLock } from "react-icons/fa";

export default function SettingSidebar() {
  const pathname = usePathname();

  return (
    <div className="py-6 ">
      <Link href="/setting/personal-detail">
        <div className={`
        flex items-center ml-4 mr-16 py-2 rounded-lg pl-4 text-lg 
        ${pathname === "/setting/personal-detail"
            ? "bg-zinc-700" : ""
          }
        `}>
          <IoPerson className="mr-4" />
          <p>Personal Detail</p>
        </div>
      </Link>

      <Link href="/setting/password-security">
        <div className={`
        flex items-center ml-4 mr-16 py-2 rounded-lg pl-4 text-lg 
          ${pathname === "/setting/password-security"
            ? "bg-zinc-700" : ""}
          `
        }>
          <RiLockPasswordFill className="mr-4" />
          <p>Password & Security</p>
        </div>
      </Link>

      <Link href="/setting/feed-settings">
        <div className={`
        flex items-center ml-4 mr-16 py-2 rounded-lg pl-4 text-lg  
          ${pathname === "/setting/feed-settings"
            ? "bg-zinc-700" : ""
          }
        `}>
          <HiNewspaper className="mr-4"/>
          <p>Feed Settings</p>
        </div>
      </Link>

      <Link href="/setting/blocking">
        <div className={`
        flex items-center ml-4 mr-16 py-2 rounded-lg pl-4 text-lg  
          ${pathname === "/setting/blocking"
            ? "bg-zinc-700" : ""
          }
        `}>
          <FaUserLock className="mr-4"/>
          <p>Blocking</p>
        </div>
      </Link>

      <Link href="/setting/account-deletion">
        <div className={`
        flex items-center ml-4 mr-16 py-2 rounded-lg pl-4 text-lg  
        ${pathname === "/setting/account-deletion"
            ? "bg-zinc-700" : ""}
        `}>
          <RiDeleteBin5Fill className="mr-4" />
          <p>Account Deletion</p>
        </div>
      </Link>
    </div>
  )
};