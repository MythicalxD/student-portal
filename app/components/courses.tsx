"use client";
import { ExternalLink, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/utils/types";

interface CompanyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    course: Course;
}

export function CourseCard({
    course
}: CompanyCardProps) {
    return (
        <div className="relative w-[300px] min-h-[230px] space-y-3 cursor-pointer bg-white hover:bg-gray-50 rounded-[7px] shadow-md transition-all duration-100">
            <div className="flex">
                <div className="flex m-4">
                    <div className="flex flex-col w-full items-start ml-4 mt-[20px]">
                        <div className="text-zinc-800 text-xl font-bold">{course.name}</div>
                        <div className="text-neutral-500 text-[15px] font-medium mt-2">{course.description}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap m-4 ml-6 gap-x-2 gap-y-2">
                {Array.isArray(course.skills) ? (
                    course.skills.map((item, index) => (
                        <Badge variant={"secondary"} key={item.id}>{item.name}</Badge>
                    ))
                ) : (
                    <p>Linked jobs data is not an array</p>
                )}

            </div>
            <div className="flex absolute bottom-4 text-blue-800 text-sm font-bold justify-center items-center w-[300px]"><p className="" >APPLY NOW</p></div>
        </div>
    );
}