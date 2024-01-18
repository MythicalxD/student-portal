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
import { Company } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionProps {
  data: Company;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  return (
    <>
      <AlertModal
        title={data.name}
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={(text: string) => {
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
            onClick={() => router.push(`/dashboard/company/${data.id}`)}
          >
            <Eye className="w-[15px] h-[15px] mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/company/update/${data.id}`)}
          >
            <Edit className="w-[15px] h-[15px] mr-2" /> Update Company
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
