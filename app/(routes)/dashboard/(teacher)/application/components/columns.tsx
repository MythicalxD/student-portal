"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export type Application = {
  id: number;
  job_name: string;
  status: string;
  student_name: string;
  created_date: string;
  company_name: string;
  comments: string[];
};

export type ApplicationList = {
  id: number;
  job_name: string;
  status: string;
  student_name: string;
  selected: number;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="text-start ml-2">ID</div>;
    },
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.id}</Badge>;
    },
  },
  {
    accessorKey: "job_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start font-medium ml-4">
          {row.original.job_name}
        </div>
      );
    },
  },
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "status",
    header: () => {
      return <div className="text-start ml-2">Status</div>;
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={`${row.original.status == "Inactive" ? "destructive" : "secondary"
            }`}
        >
          {row.original.status}
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
