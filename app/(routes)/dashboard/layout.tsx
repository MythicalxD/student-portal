import { Inter } from "next/font/google";
import Sidebar from "@/components/side-nav";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex mt-[60px]">
        <Sidebar />
        <main className="flex-1 p-4 ml-64">{children}</main>
      </div>
    </div>
  );
}
