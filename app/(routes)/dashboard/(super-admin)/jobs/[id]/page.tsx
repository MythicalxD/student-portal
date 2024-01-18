"use client";
import axios from "axios";
import { JobFull } from "../components/columns";
import { useEffect, useState } from "react";
import React from "react";
import { GalleryHorizontal, GraduationCap, Settings2, Timer, TimerOff, TimerReset, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IndustryProps {
    params: {
        id: string;
    };
}

async function getData(
    token: string,
    session: string,
    id: string
): Promise<JobFull> {
    const dataToSend = {
        token: token,
        session: session,
        id: id,
    };

    const apiUrl = "/api/job/get";

    try {
        const response = await axios.post(apiUrl, dataToSend);
        return response.data;
    } catch (error: any) {
        if (error.response.status === 401) {
            return error;
        } else {
            console.error("Error:", error);
            return error;
        }
    }
}


const Industry: React.FC<IndustryProps> = ({ params }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [data, setData] = useState<JobFull>();

    useEffect(() => {
        const fetchData = async () => {
            const authToken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            const session = document.cookie
                .split("; ")
                .find((row) => row.startsWith("session="))
                ?.split("=")[1];

            const fetchedData = await getData(authToken!, session!, params.id);
            setData(fetchedData);
        };

        fetchData();

    }, []);

    return (
        <main className="flex min-h-screen flex-col p-4">
            <div>
                <div className="flex flex-col">
                    <Link
                        href="./"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "absolute right-[2rem] top-[5rem]"
                        )}
                    >
                        Go Back
                    </Link>
                    <p className="text-xl font-bold">Job Category Details</p>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <GraduationCap className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Job Category</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Timer className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Created On</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.created_at}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Created By</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.created_by}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <TimerReset className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Updated On</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.updated_at}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Updated By</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.updated_by}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Industry;
