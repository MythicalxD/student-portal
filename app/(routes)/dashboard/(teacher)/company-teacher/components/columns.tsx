"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export type Company = {
  company_email: string;
  company_industry: string;
  company_logo: string;
  id: number;
  name: string;
  status: string;
  updated_at: string;
};

export type CompanyFull = {
  company_address: string;
  company_contact: string;
  company_email: string;
  company_industry: string;
  company_logo: string;
  company_website: string;
  created_at: string;
  createdby: string;
  id: number;
  linked_in: string;
  name: string;
  status: string;
  updated_at: string;
  updatedby: string;
};

export type CompanyTeacher = {
  address: string;
  company_industry: string;
  company_logo: string;
  id: number;
  linked_in: string;
  linked_jobs: string[];
  name: string;
  status: string;
  website: string;
};

export const columns: ColumnDef<CompanyFull>[] = [
  {
    accessorKey: "logo",
    header: () => <div className="">Logo</div>,
    cell: ({ row }) => {
      return (
        <img
          className=" bg-black rounded-full w-[30px] h-[30px] object-cover"
          src={row.original.company_logo.replace(
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
    cell: ({ row }) => {
      return (
        <div className="text-start font-medium ml-4">{row.original.name}</div>
      );
    },
  },
  {
    accessorKey: "company_industry",
    header: "Industry",
  },
  {
    accessorKey: "website",
    header: "Website",
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
