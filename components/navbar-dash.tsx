"use client";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { UserNav } from "./user-nav";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      <div className="flex items-center gap-x-12">
        <div className="text-center text-black text-base font-semibold">About Us</div>
        <div className="text-center text-black text-base font-semibold">Find a Job</div>
        <div className="text-center text-black text-base font-semibold">Blogs</div>
        <Link href={"/login"}>
          <div className="w-[129px] h-10 bg-indigo-950 hover:bg-[#151730] rounded-lg justify-center items-center inline-flex cursor-pointer">
            <div className="text-white text-md font-bold">Login Now</div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default NavbarDash;
