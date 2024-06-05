import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News Verse",
  description: "Your all desire news in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userToken = cookies().get("token")
  
  return (
    <html lang="en">
      <body className={inter.className}>

            <div className="fixed top-0 left-0 w-full z-20">
              <NavBar token={userToken?.value}/>
            </div>

            {/* <div className="flex pt-16 flex-grow"> */}

              <div >
                {/* <Sidebar children={children} /> */}
                <Sidebar>{children}</Sidebar>
              </div>

              {/* Main Content */}
              {/* <div className="">{children}</div> */}

            {/* </div> */}
        
      </body>
    </html>
  );
}
