"use client";
import React, { useEffect, useState } from "react";
import SuperAdmin from "./sideNav/super-admin";
import Teacher from "./sideNav/teacher";
import Student from "./sideNav/student";

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    <div className="flex">
      {accountType == "SuperAdmin" ? (
        <SuperAdmin />
      ) : accountType == "Teacher" ? (
        <Teacher />
      ) : accountType == "Student" ? (
        <Student />
      ) : null}

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
