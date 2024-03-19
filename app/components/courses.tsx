"use client";
import { ExternalLink, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/utils/types";
import { useRouter } from "next/navigation";

interface CompanyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    course: Course;
}

export function CourseCard({
    course
}: CompanyCardProps) {
    const router = useRouter();

    const handelOnClick = () => {
        router.push("/login");
    }

    return (
        <div className="w-96 h-[350px] relative cursor-pointer" onClick={handelOnClick}>
            <div className="flex flex-col w-[330px] h-[350px] left-0 top-0 bg-slate-50 rounded-3xl p-4 relative" >
                <img src="/monitor.png" className="w-[30px] h-[30px] m-2" />
                <div className="text-zinc-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-loose ml-2">{course.name}</div>
                <div className="text-zinc-600 text-md font-normal ml-2 overflow-hidden" style={{ textOverflow: 'ellipsis' }}>{course.description}</div>
                <div className="flex flex-grow"></div>
                <div className="flex w-[160px] h-[50px] bg-zinc-900 rounded-lg justify-center items-center mt-4">
                    <div className="text-white text-lg font-bold">Learn more</div>
                </div>
            </div>

        </div>
    );
}