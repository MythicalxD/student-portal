import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ScrollText } from "lucide-react";

export default function Teacher() {
  const pathname = usePathname();

  return (
    <div className="flex">
      <div
        className={`fixed bg-gray-100 md:w-[250px] w-[90vw] h-screen text-white p-4 z-10 block md:block`}
      >
        <Link href={"/dashboard"}>
          <h2 className="text-2xl text-black font-semibold ml-2">Dashboard</h2>
        </Link>

        <ul className="mt-4">
          <Link href={"/dashboard/manage-jobs"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/manage-jobs"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <GraduationCap className="w-[15px] h-[15px] mr-2" />
              Manage Jobs
            </li>
          </Link>
          <Link href={"/dashboard/application"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/application"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <ScrollText className="w-[15px] h-[15px] mr-2" />
              All Applications
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
