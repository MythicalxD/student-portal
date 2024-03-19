"use client";
import { Inter } from "next/font/google";
import Sidebar from "@/components/side-nav";
import Navbar from "@/components/navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import NavbarDash from "@/components/navbar-dash";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <NavbarDash />
            <div className="flex mt-[60px]">
                <main className="">
                    {children}
                </main>
            </div>
        </div>
    );
}
