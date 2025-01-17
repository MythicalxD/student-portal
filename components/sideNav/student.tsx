
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookmarkPlus,
  Compass,
  GraduationCap,
  Workflow,
} from "lucide-react";

export default function Student() {
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
          <Link href={"/dashboard/student-company"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${pathname == "/dashboard/student-company"
                ? " bg-[#73a9ff] transition-all duration-300"
                : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
                }`}
            >
              <Compass className="w-[15px] h-[15px] mr-2" />
              Explore Jobs
            </li>
          </Link>
          <Link href={"/dashboard/student-intern"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${pathname == "/dashboard/student-intern"
                ? " bg-[#73a9ff] transition-all duration-300"
                : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
                }`}
            >
              <Workflow className="w-[15px] h-[15px] mr-2" />
              View Internships
            </li>
          </Link>
          <Link href={"/dashboard/student-training"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${pathname == "/dashboard/student-training"
                ? " bg-[#73a9ff] transition-all duration-300"
                : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
                }`}
            >
              <BookmarkPlus className="w-[15px] h-[15px] mr-2" />
              Training Modules
            </li>
          </Link>
          <Link href={"/dashboard/student-application"}>
            <li
              className={`px-2 py-2 rounded-md text-black text-sm flex items-center mb-2 ${pathname == "/dashboard/student-application"
                ? " bg-[#73a9ff] transition-all duration-300"
                : "bg-gray-100 transition-all duration-300 hover:bg-gray-300"
                }`}
            >
              <GraduationCap className="w-[15px] h-[15px] mr-2" />
              Manage Applications
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}