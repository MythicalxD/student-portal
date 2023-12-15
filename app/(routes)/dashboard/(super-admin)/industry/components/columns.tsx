"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Industry = {
  id: string;
  name: string;
  description: string;
  logo: string;
  updated_at: string;
};

export type IndustryFull = {
  id: string;
  name: string;
  description: string;
  logo: string;
  updated_at: string;
  created_at: string;
  created_by: string;
  updated_by: string;
};

export const columns: ColumnDef<Industry>[] = [
  {
    accessorKey: "logo",
    header: () => <div className="">Logo</div>,
    cell: ({ row }) => {
      return (
        <img
          className=" bg-black rounded-full w-[30px] h-[30px] object-cover"
          src={row.original.logo.replace(
            "https://s3.amazonaws.com/sambucketcoduty/",
            "https://sambucketcoduty.s3.ap-south-1.amazonaws.com/"
          )}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
