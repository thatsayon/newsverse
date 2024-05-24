"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import NewsVerse from "@/../public/news verse.png";
const NavLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Contact Us", path: "/contact-us" },
];

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (path: string) => path == pathname;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthorized(false);
      return;
    }
    setIsAuthorized(true);
  }, []);
  return (
    <>
      <nav className="flex justify-between py-3 rounded-b bg-main-two">
        <div>
          <Image src={NewsVerse} alt="news verse" width={200} height={200} className="ml-3"/>
        </div>
        <div>
          <ul className="flex">
            {NavLinks.map((link) => {
              return (
                <li key={link.id} className="mx-4 text-xl font-mono mt-1 font-bold">
                  <Link
                    href={link.path}
                    className={
                      isActive(link.path) ? "text-main-one" : "text-white"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {isAuthorized ? (
            <>
              <Link
                href="/"
                className="text-main-two font-bold bg-main-one px-4 py-1 rounded mx-2 text-xl"
              >
                Logout
              </Link>
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
