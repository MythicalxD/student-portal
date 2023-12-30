"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.replace("/login"); // If token is found, redirect to Home page
      return;
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        className=" bg-blue-300 rounded-md p-4 w-[200px] flex justify-center items-center"
        href={"/dashboard"}
      >
        DASHBOARD
      </Link>
    </main>
  );
}
