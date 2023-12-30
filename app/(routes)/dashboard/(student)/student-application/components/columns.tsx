"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplicationStatus } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle } from "lucide-react";
import { CellAction } from "./cell-actions";


export const columns: ColumnDef<ApplicationStatus>[] = [
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
        <div className="text-start font-medium ml-4">{row.original.job_name}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-start ml-2">Status</div>;
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={`${row.original.status == "REJECTED" ? "destructive" : row.original.status == "WITHDRAWN" ? "medium" : row.original.status == "APPROVED" ? "done" : "secondary"
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
