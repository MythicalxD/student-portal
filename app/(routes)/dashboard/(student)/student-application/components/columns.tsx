"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle } from "lucide-react";
import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export type Job = {
  company: string;
  id: number;
  job_category: string;
  job_description: string;
  status: string;
  title: string;
};

export const columns: ColumnDef<Job>[] = [
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
        <div className="text-start font-medium ml-4">{row.original.title}</div>
      );
    },
  },
  {
    accessorKey: "job_description",
    header: "Description",
  },
  {
    accessorKey: "job_category",
    header: "Category",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    header: ({ column }) => {
      return <div className="text-center ml-2">Actions</div>;
    },
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Button variant={"ghost"} className="text-green-500">
          <CheckCircle className="w-4 h-4 mr-2" />
          Apply
        </Button>
      </div>
    ),
  },
];
