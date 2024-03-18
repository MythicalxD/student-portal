"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/utils/types";

export const columns: ColumnDef<BlogPost>[] = [
  {
    accessorKey: "logo",
    header: () => <div className="">Logo</div>,
    cell: ({ row }) => {
      return (
        <img
          className=" bg-black rounded-full w-[30px] h-[30px] object-cover"
          src={row.original.image_url.replace(
            "https://s3.amazonaws.com/sambucketcoduty/",
            "https://sambucketcoduty.s3.ap-south-1.amazonaws.com/"
          )}
        />
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "publication_date",
    header: "Publication Date",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
