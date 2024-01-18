"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { GalleryHorizontal, GraduationCap, Settings2, Timer, TimerOff, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skill } from "../components/columns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface IndustryProps {
    params: {
        id: string;
    };
}

async function getData(
    token: string,
    session: string,
    id: string
): Promise<Skill> {
    const dataToSend = {
        token: token,
        session: session,
        id: id,
    };

    const apiUrl = "/api/skill/get";

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
    const [data, setData] = useState<Skill>();

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
                    <p className="text-xl font-bold">Skills Details</p>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Skill ID</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.id}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <TimerOff className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Skill Name</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Skill Description</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.description}
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
