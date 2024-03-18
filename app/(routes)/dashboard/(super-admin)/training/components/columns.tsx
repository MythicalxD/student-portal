"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export type Training = {
  cover_image: string;
  created_at: string;
  created_by: string;
  description: string;
  id: number;
  skills: string[]; // Assuming skills are strings
  status: "ACTIVE" | "INACTIVE"; // Define possible status values
  title: string;
  type: "LIVE" | "RECORDED"; // Define possible type values
  updated_at: string;
  updated_by: string;
  video_link?: string | null; // Optional video link
  zoom_link: string;
}


export const columns: ColumnDef<Training>[] = [
  {
    accessorKey: "logo",
    header: () => <div className="">Logo</div>,
    cell: ({ row }) => {
      return (
        <img
          className=" bg-black rounded-full w-[30px] h-[30px] object-cover"
          src={row.original.cover_image.replace(
            "https://s3.amazonaws.com/sambucketcoduty/",
            "https://sambucketcoduty.s3.ap-south-1.amazonaws.com/"
          )}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start font-medium ml-4">{row.original.title}</div>
      );
    },
  },
  {
    header: "Skills",
    cell: ({ row }) => <div className="flex flex-wrap" >
      {row.original.skills.map((item, index) => (
        <Badge variant="secondary" className="mr-2 mb-2" key={index}>{item}</Badge>
      ))}
    </div>,
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-start ml-2">Status</div>;
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={`${row.original.status == "INACTIVE" ? "destructive" : "secondary"
            }`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <div className="text-start ml-2">Type</div>;
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={`${row.original.type == "LIVE" ? "destructive" : "done"
            }`}
        >
          {row.original.type}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
