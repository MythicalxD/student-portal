"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Course = {
  created_at: string;
  created_by: number;
  description: string;
  id: number;
  name: string;
  skills: string[];
  department: string;
  updated_at: string;
  updated_by: number;
};

export const columns: ColumnDef<Course>[] = [
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
    header: "Skills",
    cell: ({ row }) => <div className="flex flex-wrap" >
      {row.original.skills.map((item, index) => (
        <Badge variant="secondary" className="mr-2 mb-2" key={index}>{item}</Badge>
      ))}
    </div>,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
