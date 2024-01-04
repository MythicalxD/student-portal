"use client";
import { ComponentProps } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation";
import { JobStudent } from "@/utils/types";
import { Bookmark, CircleDollarSign, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyListProps {
  item: JobStudent,
  status: string | undefined,
}

export function CompanyCard({ item, status }: CompanyListProps) {

  const router = useRouter();

  return (

    <button
      className={cn(
        "flex flex-col relative items-start gap-2 mr-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        false && "bg-muted"
      )}
      onClick={() => { router.push(`/dashboard/student-company/company/${item.id}`) }
      }
    >
      <div className="flex w-full">
        <img src={"https://sambucketcoduty.s3.ap-south-1.amazonaws.com/Frame_7_1.png"} alt="Logo" className="w-[50px] h-[50px] mr-3 rounded-lg" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-1">
              <div className="font-semibold text-lg">{item.title}</div>
            </div>
            <div
              className={cn(
                "ml-auto text-xs flex justify-center items-center space-x-2",
                true
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Bookmark className="w-5 h-5 text-yellow-600" />
              <Heart className="w-5 h-5" />

            </div>
          </div>
          <div className="text-xs font-medium text-gray-500">By {item.company}</div>
        </div>
      </div>

      <div className="flex absolute right-2 bottom-2">{(status == undefined) ? (<Button variant={"outline"} className="ml-2" >APPLY</Button>) : (<p className="ml-2 text-sm font-bold" >{status}</p>)}</div>

      <div className="line-clamp-2 text-xs text-muted-foreground">
        This is some very long job description purposely written to demonstrate. {item.job_description}
      </div>
      <div className="flex mt-1 mb-1 space-x-2">
        <div className="flex justify-center items-center font-medium bg-purple-50 text-purple-800 p-1 px-3 rounded-full">{item.job_category}</div>
        <div className="flex justify-center items-center font-medium bg-green-50 text-green-800 p-1 px-3 rounded-full"> <MapPin className="w-4 h-4 mr-1" /> {item.location}</div>
        <div className="flex justify-center items-center font-medium bg-green-50 text-green-800 p-1 px-3 rounded-full"> <CircleDollarSign className="w-4 h-4 mr-1" /> ₹{item.salary} / month</div>
        <div className="flex justify-center items-center font-medium bg-orange-50 text-orange-800 p-1 px-3 rounded-full">{item.status}</div>
      </div>
      {item.skills.length ? (
        <div className="flex flex-wrap items-center gap-2">
          {item.skills.map((label) => (
            <Badge key={label.id} className="rounded-md bg-gray-700" >
              {label.name}
            </Badge>
          ))}
        </div>
      ) : null}
    </button>

  )
}