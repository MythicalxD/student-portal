"use client";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { UserNav } from "./user-nav";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [accountType, setAccountType] = useState<string | null>("");
  const [userEmail, setUserEmail] = useState<string | null>("");

  useEffect(() => {
    // This block will only run on the client side
    if (typeof window !== "undefined") {
      setAccountType(localStorage.getItem("accountType"));
      setUserEmail(localStorage.getItem("email"));
    }
  }, []); // Empty dependency array ensures the effect runs once after mount

  return (
    <div className="fixed flex items-center justify-between bg-white dark:bg-gray-900 h-[60px] w-screen md:px-4 px-2 z-10">
      <div className="flex items-center">
        <a href="/">
          <Image src={Logo} alt="Company logo" className="m-2" width={150} />
        </a>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex flex-col space-x-4 justify-center items-end">
          <span className="text-xl text-orange-500 font-bold">
            {accountType?.toString().toUpperCase()} PANEL
          </span>
          <span className="text-sm text-gray-900 dark:text-white">
            {userEmail}
          </span>
        </div>
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
