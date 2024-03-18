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
        <div className="relative w-[310px] min-h-[336px] space-y-3 cursor-pointer bg-white hover:bg-gray-50 rounded-[16px] shadow-md transition-all duration-100">
            <div className="flex">
                <div className="flex flex-col m-4">
                    <img className="w-[70px] h-[70px] rounded-[15px] shadow-md" src={course.company_logo} />
                    <div className="flex flex-col items-start mt-[10px]">
                        <div className="text-zinc-800 text-xl font-bold w-full flex">{course.title} by <div className="text-neutral-500 text-xl ml-2 font-medium">{course.company}</div></div>
                        <div className="flex justify-center text-sm items-center font-medium text-yellow-800 mt-1 rounded-full"> <MapPin className="w-4 h-4 mr-1" /> {course.location}</div>
                        <Badge className="mt-2" >{course.job_category}</Badge>
                        <div className="flex mt-2">
                            {Array.isArray(course.skills) ? (
                                course.skills.map((item) => (
                                    <Badge variant={"secondary"} key={item.id}>{item.name}</Badge>
                                ))
                            ) : (
                                <p>Linked jobs data is not an array</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="text-neutral-500 text-[15px] font-medium mt-2 ml-5">{course.job_description}</div> */}
            <div className="flex w-full justify-center items-center gap-x-2 gap-y-2 absolute bottom-4">
                <div className="flex justify-center w-[270px] text-md justify-center items-center ml-4 font-medium text-green-800 rounded-full"> <CircleDollarSign className="w-4 h-4 mr-1" /> ₹{course.salary} / month</div>
                <div className="flex flex-grow"></div>
                <div className="flex text-blue-800 text-sm font-bold justify-center items-center w-full"><p className="" >APPLY NOW</p></div>

            </div>
        </div>
    );
}