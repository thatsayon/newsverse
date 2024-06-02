import Image from "next/image";
import HomePage from "@/components/Home";
import NavBar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

export default function Home() {
  return (
    <>
      <div>
        {/* <Sidebar /> */}
        <HomePage />
      </div>
    </>
  );
}
