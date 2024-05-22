"use client";
import Image from "next/image";
import HomePage from "@/components/Home";
import NavBar from "@/components/common/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  

  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
}
