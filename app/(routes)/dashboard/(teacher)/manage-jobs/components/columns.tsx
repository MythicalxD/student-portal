"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export type JobCategory = {
  id: number;
  name: string;
};

export type Job = {
  company: string;
  id: number;
  job_category: string;
  job_description: string;
  status: string;
  title: string;
};

export type JobFull = {
  applications: string[]; // Assuming application IDs or references are strings
  company_name: string;
  courses: number[];
  detiled_description: string; // Corrected the typo in property name
  experience: number;
  job_category_name: string;
  location: string;
  salary: string;
  skills: number[];
  status: string;
  title: string;
  web_url: string;
};

export const columns: ColumnDef<Job>[] = [
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
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-start ml-2">Status</div>;
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={`${
            row.original.status == "Inactive" ? "destructive" : "secondary"
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
