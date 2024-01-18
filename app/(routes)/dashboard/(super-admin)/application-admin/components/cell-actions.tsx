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
import { CheckCircle, Download, Eye, Inspect, MoreHorizontal, Trash, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Application } from "./columns";

interface CellActionProps {
  data: Application;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading] = useState(false);
  const [id, setId] = useState("");

  const handleUploadApprove = async (
    comment: string,
    status: string,
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
      formData.append("comment", comment);
      formData.append("status", status);
      formData.append("id", id);
      formData.append("session", session!);
      formData.append("token", authToken!);

      const apiUrl = "/api/applications/update";
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Application Updated");
        window.location.href = "./application-admin";
      }
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
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/application-admin/${data.id}`)}
          >
            <Eye className="w-[15px] h-[15px] mr-2" />
            View Application
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/application-admin/${data.id}`)}
          >
            <Download className="w-[15px] h-[15px] mr-2" />
            Download Resume
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" text-green-700" onClick={() => { handleUploadApprove("none", "Approved", data.id.toString()) }}>
            <CheckCircle className="w-[15px] h-[15px] mr-2" /> Approve
          </DropdownMenuItem>
          <DropdownMenuItem className=" text-red-700" onClick={() => { handleUploadApprove("none", "Rejected", data.id.toString()) }}>
            <X className="w-[15px] h-[15px] mr-2" /> Reject
          </DropdownMenuItem>
          <DropdownMenuItem className=" text-yellow-700" onClick={() => { handleUploadApprove("none", "Under Review", data.id.toString()) }}>
            <Inspect className="w-[15px] h-[15px] mr-2" /> Under Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
