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

type JobType = {
  job_description: string;
  created_at: string; // Assuming you might want to use a specific date type here
  created_by: number;
  detiled_description: string;
  exprience: number;
  id: number;
  location: string;
  salary: string; // Assuming salary is represented as a string for formatting purposes
  skills: string[]; // Assuming skills is an array of strings
  updated_at: string; // Again, assuming a specific date type may be used here
  updated_by: number;
  web_url: string;
};

export type Job = {
  company: string;
  id: number;
  created_at: string; // Assuming you might want to use a specific date type here
  created_by: number;
  job_description: JobType;
  status: string;
  title: string;
  courses: string[];
  updated_at: string; // Again, assuming a specific date type may be used here
  updated_by: number;
  job_category: string;
  applications: string[];
};

export type JobFull = {
  applicants: number[]; // Assuming application IDs or references are strings
  company_name: string;
  courses: number[];
  detiled_description: string; // Corrected the typo in property name
  exprience: number;
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
    header: "Location",
    cell: ({ row }) => {
      return (
        row.original.job_description.location
      );
    },
  },
  {
    header: "Salary",
    cell: ({ row }) => {
      return (
        row.original.job_description.salary
      );
    },
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
