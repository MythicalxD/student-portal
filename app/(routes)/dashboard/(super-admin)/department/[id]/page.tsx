"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { GalleryHorizontal, GraduationCap, Settings2, Timer, TimerOff, TimerReset, User, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Department } from "../components/columns";

interface IndustryProps {
    params: {
        id: string;
    };
}

async function getData(
    token: string,
    session: string,
    id: string
): Promise<Department> {
    const dataToSend = {
        token: token,
        session: session,
        id: id,
    };

    const apiUrl = "/api/department/get";

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
    const [data, setData] = useState<Department>();

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
                    <p className="text-xl font-bold">Department Details</p>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <GalleryHorizontal className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Department Name</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User2 className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Students</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.students}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User2 className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Teachers</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.teachers}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <TimerReset className="mt-px h-5 w-5" />
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
