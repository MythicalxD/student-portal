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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Training } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionProps {
  data: Training;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

    const apiUrl = "/api/training/delete";
    const response = await axios.post(apiUrl, dataToSend);

    if (response.status === 200) {
      toast.success("Training Deleted");
      window.location.href = "/dashboard/training";
    }

    console.log(response.data);
  };

  return (
    <>
      <AlertModal
        title={data.title}
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={(text: string) => {
          handleUpload(text);
          console.log(text);
        }}
        loading={loading}
      />
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
            onClick={() => router.push(`/dashboard/training/${data.id}`)}
          >
            <Eye className="w-[15px] h-[15px] mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/training/update/${data.id}`)}
          >
            <Edit className="w-[15px] h-[15px] mr-2" /> Update Training
          </DropdownMenuItem>
          {localStorage.getItem("accountType") === "SuperAdmin" && (<DropdownMenuItem
            className=" text-red-700"
            onClick={() => {
              setId(data.id.toString());
              setOpen(true);
            }}
          >
            <Trash className="w-[15px] h-[15px] mr-2" /> Delete Training
          </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
