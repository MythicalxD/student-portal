"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Company = {
  company_industry: string;
  company_logo: string;
  linked_jobs: string[];
  name: string;
  website: string;
};

export type CompanyFull = {
  address: string;
  company_industry: string;
  company_logo: string;
  linked_in: string;
  linked_jobs: string[];
  name: string;
  website: string;
};

export const columns: ColumnDef<Company>[] = [
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
];
