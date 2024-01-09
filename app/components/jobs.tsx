"use client";
import { Badge } from "@/components/ui/badge";
import { JobListing } from "@/utils/types";
import { CircleDollarSign, MapPin } from "lucide-react";

interface CompanyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    course: JobListing;
}

export function JobCard({
    course
}: CompanyCardProps) {
    return (
        <div className="relative w-[350px] min-h-[280px] space-y-3 cursor-pointer bg-white hover:bg-gray-50 rounded-[16px] shadow-md transition-all duration-100">
            <div className="flex">
                <div className="flex m-4">
                    <img className="w-[70px] h-[70px] rounded-[15px] shadow-md" src={course.company_logo} />
                    <div className="flex flex-col items-start ml-4 mt-[05px]">
                        <div className="text-zinc-800 text-xl font-bold w-full flex">{course.title} by <div className="text-neutral-500 text-xl ml-2 font-medium">{course.company}</div></div>
                        <Badge className="mt-2" >{course.job_category}</Badge>
                    </div>
                </div>
            </div>
            <div className="text-neutral-500 text-[15px] font-medium mt-2 ml-5">{course.job_description}</div>
            <div className="flex flex-wrap m-4 ml-6 gap-x-2 gap-y-2">
                <div className="flex justify-center text-sm items-center font-medium bg-yellow-50 text-yellow-800 p-1 px-3 rounded-full"> <MapPin className="w-4 h-4 mr-1" /> {course.location}</div>
                <div className="flex justify-center text-sm items-center font-medium bg-green-50 text-green-800 p-1 px-3 rounded-full"> <CircleDollarSign className="w-4 h-4 mr-1" /> ₹{course.salary} / month</div>

                {Array.isArray(course.skills) ? (
                    course.skills.map((item) => (
                        <Badge variant={"secondary"} key={item.id}>{item.name}</Badge>
                    ))
                ) : (
                    <p>Linked jobs data is not an array</p>
                )}

            </div>
            <div className="flex absolute bottom-4 text-blue-800 text-sm font-bold justify-center items-center w-full"><p className="" >APPLY NOW</p></div>
        </div>
    );
}