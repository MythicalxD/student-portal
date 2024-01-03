"use client";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { UserNav } from "./user-nav";
import { useEffect, useState } from "react";

const NavbarDash = () => {

  useEffect(() => {
    // This block will only run on the client side
  }, []); // Empty dependency array ensures the effect runs once after mount

  return (
    <div className="fixed flex items-center justify-between bg-white dark:bg-gray-900 h-[60px] w-screen md:px-4 px-2 z-10">
      <div className="flex items-center">
        <a href="/">
          <Image src={Logo} alt="Company logo" className="m-2" width={150} />
        </a>
      </div>
      <div className="flex items-center gap-x-4">
        <UserNav />
      </div>
    </div>
  );
};

export default NavbarDash;
