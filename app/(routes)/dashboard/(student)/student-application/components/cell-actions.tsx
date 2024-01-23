"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { CheckCircle, Download, ExternalLinkIcon, Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const handleUpload = async (
    id: string
  ) => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const session = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="))
        ?.split("=")[1];

      const formData = new FormData();
      formData.append("id", id);
      formData.append("session", session!);
      formData.append("token", authToken!);

      const apiUrl = "/api/my-application/upload";
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
    } catch (error) {
      toast.error("Error Updating Application");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuItem
            onClick={() => router.push(`/dashboard/student-application/${data.id}`)}
          >
            <Eye className="w-[15px] h-[15px] mr-2" />
            View Application
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/student-application/${data.id}`)}
          >
            <Download className="w-[15px] h-[15px] mr-2" />
            Download Resume
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" text-yellow-700" onClick={() => { handleUpload(data.id.toString()) }}>
            <ExternalLinkIcon className="w-[15px] h-[15px] mr-2" /> Withdraw
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
