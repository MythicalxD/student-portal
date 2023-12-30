"use client";
import Sidebar from "@/components/side-nav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [accountType, setAccountType] = useState<string | null>("");
  const router = useRouter();

  if (accountType == "Student") {
    router.push("/dashboard/student-company")
  }

  useEffect(() => {
    // This block will only run on the client side
    if (typeof window !== "undefined") {
      setAccountType(localStorage.getItem("accountType"));
      console.log(accountType);
    }
  }, []); // Empty dependency array ensures the effect runs once after mount
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div>
        <p className="text-3xl font-bold">Welcome Back,</p>
        <p className="text-xl">You are logged in as {accountType}</p>
      </div>
    </main>
  );
}
