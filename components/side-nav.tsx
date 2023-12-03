"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const pathname = usePathname();

  return (
    <div className="flex">
      {/* Sidebar (Visible on medium screens and up) */}
      <div
        className={`bg-gray-800 dark:bg-gray-900 md:w-[250px] w-[90vw] h-screen text-white p-4 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <Link href={"/dashboard"}>
          <h2 className="text-2xl font-semibold ml-2">Dashboard</h2>
        </Link>

        <ul className="mt-4">
          <Link href={"/dashboard/student"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/student"
                  ? " bg-[#73a9ff]"
                  : "bg-gray-800"
              }`}
            >
              Student data
            </li>
          </Link>

          <Link href={"/dashboard/industry"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/industry"
                  ? " bg-[#73a9ff]"
                  : "bg-gray-800"
              }`}
            >
              Manage Industries
            </li>
          </Link>

          <Link href={"/dashboard/company"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/company"
                  ? " bg-[#73a9ff]"
                  : "bg-gray-800"
              }`}
            >
              Manage Companies
            </li>
          </Link>

          <Link href={"/dashboard/jobs"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/jobs" ? " bg-[#73a9ff]" : "bg-gray-800"
              }`}
            >
              Job Categories
            </li>
          </Link>

          <Link href={"/dashboard/skills"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/skills"
                  ? " bg-[#73a9ff]"
                  : "bg-gray-800"
              }`}
            >
              Manage Skills
            </li>
          </Link>

          <Link href={"/dashboard/category"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/category"
                  ? " bg-[#73a9ff]"
                  : "bg-gray-800"
              }`}
            >
              Manage Category
            </li>
          </Link>

          <Link href={"/dashboard/users"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/users" ? " bg-[#73a9ff]" : "bg-gray-800"
              }`}
            >
              Add Users
            </li>
          </Link>

          <Link href={"/dashboard/analytics"}>
            <li
              className={`hover:bg-gray-700 px-2 py-2 rounded-md ${
                pathname == "/dashboard/analytics"
                  ? " bg-[#73a9ff]"
                  : "bg-gray-800"
              }`}
            >
              Analytics
            </li>
          </Link>
        </ul>
      </div>

      {/* Hamburger Menu (Visible on small screens) */}
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-white p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
            <path d="M3 4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
