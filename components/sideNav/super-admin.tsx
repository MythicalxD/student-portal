
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AreaChart,
  BookMarked,
  Compass,
  Factory,
  GanttChart,
  GraduationCap,
  ScrollText,
  SlidersHorizontal,
  User,
} from "lucide-react";

export default function SuperAdmin() {
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
          <Link href={"/dashboard/industry"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/industry"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <Factory className="w-[15px] h-[15px] mr-2" />
              Manage Industries
            </li>
          </Link>
          <Link href={"/dashboard/company"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/company"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <Compass className="w-[15px] h-[15px] mr-2" />
              Manage Companies
            </li>
          </Link>
          <Link href={"/dashboard/jobs"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/jobs"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <ScrollText className="w-[15px] h-[15px] mr-2" />
              Job Categories
            </li>
          </Link>
          <Link href={"/dashboard/skills"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/skills"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <GraduationCap className="w-[15px] h-[15px] mr-2" />
              Manage Skills
            </li>
          </Link>
          <Link href={"/dashboard/course"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/category"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <SlidersHorizontal className="w-[15px] h-[15px] mr-2" />
              Manage Courses
            </li>
          </Link>
          <Link href={"/dashboard/users"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${
                pathname == "/dashboard/users"
                  ? " bg-[#73a9ff] transition-all duration-300"
                  : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
              }`}
            >
              <User className="w-[15px] h-[15px] mr-2" />
              Add Users
            </li>
          </Link>{" "}
        </ul>
      </div>
    </div>
  );
}
