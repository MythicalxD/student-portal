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
import { CheckCircle, Eye, MoreHorizontal, Trash } from "lucide-react";
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

  const handleUpload = async (name: string) => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const session = document.cookie
      .split("; ")
      .find((row) => row.startsWith("session="))
      ?.split("=")[1];

    const dataToSend = {
      token: authToken,
      session: session,
      id: id,
    };

    const apiUrl = "/api/job/delete";
    const response = await axios.post(apiUrl, dataToSend);

    if (response.status === 200) {
      toast.success("Job Deleted");
      window.location.href = "/dashboard/jobs";
    }

    console.log(response.data);
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
            onClick={() => router.push(`/dashboard/application/${data.id}`)}
          >
            <Eye className="w-[15px] h-[15px] mr-2" />
            View Application
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" text-green-700" onClick={() => {}}>
            <CheckCircle className="w-[15px] h-[15px] mr-2" /> Approve
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
