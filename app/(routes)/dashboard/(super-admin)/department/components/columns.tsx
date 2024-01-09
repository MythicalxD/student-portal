"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export type Department = {
  associated_courses: null | any; // You can replace `any` with a more specific type if needed
  created_at: string; // Assuming it's a string representation of a date
  created_by: number;
  id: number;
  name: string;
  students: null | any; // You can replace `any` with a more specific type if needed
  teachers: null | any; // You can replace `any` with a more specific type if needed
  updated_at: string; // Assuming it's a string representation of a date
  updated_by: number;
};


export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <div className="text-start ml-2">ID</div>;
    },
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.id}</Badge>;
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
    cell: ({ row }) => {
      return (
        <div className="text-start font-medium ml-4">{row.original.name}</div>
      );
    },
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
