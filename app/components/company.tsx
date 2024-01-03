"use client";
import { ExternalLink, Home } from "lucide-react";
import { CompanyPublic } from "../(routes)/dashboard/(student)/student-company/components/columns";
import { Badge } from "@/components/ui/badge";

interface CompanyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    company: CompanyPublic;
}

export function CompanyCard({
    company
}: CompanyCardProps) {
    return (
        <div className="w-[300px] h-[300px] space-y-3 cursor-pointer bg-white hover:bg-gray-50 rounded-[22px] shadow-md transition-all duration-100">
            <div className="relative flex">
                <div className="flex m-4">
                    <img className="w-[100px] h-[100px] rounded-[15px] shadow-md" src={company.company_logo} />
                    <div className="flex flex-col w-full h-[100px] justify-center items-start ml-4">
                        <div className="text-zinc-800 text-[26px] font-bold">{company.name}</div>
                        <div className="text-neutral-500 text-[15px] font-medium">{company.company_industry}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap m-4 gap-x-2 gap-y-2">
                {Array.isArray(company.linked_jobs) ? (
                    company.linked_jobs.map((item, index) => (
                        <Badge variant={"secondary"} key={index}>{item}</Badge>
                    ))
                ) : (
                    <p>There are no linked jobs...</p>
                )}

            </div>
            <div className="flex flex-col ml-6">
                <div className="flex items-center">
                    <Home className="w-4 h-4 mr-2" /> {company.address}
                </div>
            </div>
            <div className="flex flex-col ml-6">
                <div className="flex text-blue-600 items-center">
                    <ExternalLink className="w-4 h-4 mr-2" /> {company.linked_in}
                </div>
            </div>

        </div>
    );
}